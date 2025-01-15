package com.demo.service;

import com.demo.dto.FriendDto;
import com.demo.model.FriendList;
import com.demo.model.FriendshipStatus;
import com.demo.model.UserModel;
import com.demo.repository.FriendListRepository;
import com.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FriendListService {

    private static final Logger logger = LoggerFactory.getLogger(FriendListService.class);

    private final FriendListRepository friendListRepository;
    private final UserRepository userRepository;


    public FriendList createFriendRequest(String friendUsername) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        logger.info("Attempting to create a friend request from user {} to user {}", username, friendUsername);

        UserModel user = userRepository.findByUserName(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
        UserModel friend = userRepository.findByUserName(friendUsername)
                .orElseThrow(() -> new IllegalArgumentException("Friend not found: " + friendUsername));

        Optional<FriendList> existingRequest = friendListRepository.findExistingFriendship(user, friend);
        if (existingRequest.isPresent()) {
            throw new IllegalArgumentException("Friendship already exists or request already sent.");
        }

        FriendList request = new FriendList();
        request.setUser(user);
        request.setFriend(friend);
        request.setStatus(FriendshipStatus.PENDING);

        FriendList savedRequest = friendListRepository.save(request);
        logger.info("Friend request created successfully between user {} and user {}", username, friendUsername);

        return savedRequest;
    }

    public FriendList acceptFriendRequest(String friendUsername) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        logger.info("User {} attempting to accept friend request from user {}", username, friendUsername);

        UserModel user = userRepository.findByUserName(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
        UserModel friend = userRepository.findByUserName(friendUsername)
                .orElseThrow(() -> new IllegalArgumentException("Friend not found: " + friendUsername));

        Optional<FriendList> existingRequest = friendListRepository.findExistingFriendship(friend, user);
        if (existingRequest.isEmpty() || existingRequest.get().getStatus() != FriendshipStatus.PENDING) {
            logger.warn("No pending friend request found between user {} and user {}", friendUsername, username);
            throw new IllegalArgumentException("No pending request found to accept.");
        }

        FriendList request = existingRequest.get();
        request.setStatus(FriendshipStatus.ACCEPTED);

        FriendList updatedRequest = friendListRepository.save(request);
        logger.info("Friend request between user {} and user {} accepted successfully", username, friendUsername);

        return updatedRequest;
    }

    public void deleteFriendship(String friendUsername) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        logger.info("User {} attempting to delete friendship with user {}", username, friendUsername);

        UserModel user = userRepository.findByUserName(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
        UserModel friend = userRepository.findByUserName(friendUsername)
                .orElseThrow(() -> new IllegalArgumentException("Friend not found: " + friendUsername));

        Optional<FriendList> existingFriendship = friendListRepository.findExistingFriendship(user, friend);
        if (existingFriendship.isEmpty()) {
            logger.warn("No friendship found between user {} and user {}", username, friendUsername);
            throw new IllegalArgumentException("Friendship does not exist.");
        }

        friendListRepository.delete(existingFriendship.get());
        logger.info("Friendship between user {} and user {} deleted successfully", username, friendUsername);
    }

    public List<FriendDto> getFriends() {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        logger.info("Fetching friend list for user {}", username);

        UserModel user = userRepository.findByUserName(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));

        List<FriendList> friends = friendListRepository.getFriendListByUser(user);
        List<FriendDto> friendDtos = friends.stream()
                .map(friendList -> {
                    UserModel friend = friendList.getFriend().equals(user) ? friendList.getUser() : friendList.getFriend();
                    return new FriendDto(friend.getId(),friend.getUserName()); // Only return username
                })
                .toList();

        logger.info("Friend list for user {} retrieved successfully. Total friends: {}", username, friendDtos.size());
        return friendDtos;
    }

    public List<FriendDto> getUsers() {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        logger.info("Fetching user list for user {}", username);

        UserModel user = userRepository.findByUserName(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));

        List<UserModel> userList = userRepository.findAll();
        userList.removeIf(u -> u.getUserName().equals(username));
        List<FriendDto> friendDtos = userList.stream()
                .map(userModel -> new FriendDto(userModel.getId(), userModel.getUserName()))
                .collect(Collectors.toList());

        logger.info("User list for user {} retrieved successfully.", username);
        return friendDtos;
    }

    public List<FriendDto> getPendingRequests() {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        logger.info("Fetching incoming friend requests for user {}", username);

        UserModel user = userRepository.findByUserName(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));

        List<FriendList> pendingRequests = friendListRepository.findPendingRequests(user);
        List<FriendDto> pendingDtos = pendingRequests.stream()
                .map(request -> new FriendDto(request.getId(),request.getUser().getUserName())) // Only return username
                .toList();

        logger.info("Incoming requests for user {} retrieved successfully. Total pending: {}", username, pendingDtos.size());
        return pendingDtos;
    }

    public List<FriendDto> getPendingRequestsFrom() {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        logger.info("Fetching outgoing friend requests for user {}", username);

        UserModel user = userRepository.findByUserName(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));

        List<FriendList> pendingRequests = friendListRepository.findPendingRequestsFrom(user);
        List<FriendDto> pendingDtos = pendingRequests.stream()
                .map(request -> new FriendDto(request.getId(),request.getFriend().getUserName())) // Only return username
                .toList();

        logger.info("Outgoing requests for user {} retrieved successfully. Total pending: {}", username, pendingDtos.size());
        return pendingDtos;
    }
}
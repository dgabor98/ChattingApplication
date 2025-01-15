package com.demo.controller;

import com.demo.dto.FriendDto;
import com.demo.service.FriendListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/friendList")
public class FriendListController {

    private final FriendListService friendListService;

    public FriendListController(FriendListService friendListService) {
        this.friendListService = friendListService;
    }

    @PostMapping("/request")
    public ResponseEntity<String> sendFriendRequest(@RequestParam String friendUsername) {
        try {
            friendListService.createFriendRequest(friendUsername);
            return ResponseEntity.ok("Friend request sent successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An unexpected error occurred.");
        }
    }

    @PostMapping("/accept")
    public ResponseEntity<String> acceptFriendRequest(@RequestParam String friendUsername) {
        try {
            friendListService.acceptFriendRequest(friendUsername);
            return ResponseEntity.ok("Friend request accepted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An unexpected error occurred.");
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<FriendDto>> getFriends() {
        try {
            List<FriendDto> friends = friendListService.getFriends();
            return ResponseEntity.ok(friends);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<List<FriendDto>> getPendingRequests() {
        try {
            List<FriendDto> pendingRequests = friendListService.getPendingRequests();
            return ResponseEntity.ok(pendingRequests);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping("/pendingFrom")
    public ResponseEntity<List<FriendDto>> getPendingRequestsFrom() {
        try {
            List<FriendDto> pendingRequests = friendListService.getPendingRequestsFrom();
            return ResponseEntity.ok(pendingRequests);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<FriendDto>> getOtherUsers(){
        try {
            List<FriendDto> pendingRequests = friendListService.getUsers();
            return ResponseEntity.ok(pendingRequests);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> deleteFriendship(@RequestParam String friendUsername) {
        try {
            friendListService.deleteFriendship(friendUsername);
            return ResponseEntity.ok("Friendship removed successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An unexpected error occurred.");
        }
    }
}
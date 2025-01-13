package com.demo.repository;

import com.demo.model.FriendList;
import com.demo.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface FriendListRepository extends JpaRepository<FriendList, Integer> {

    // Fetch friend list by user
    @Query("SELECT f FROM FriendList f WHERE (f.user = :user OR f.friend = :user) AND f.status = 'ACCEPTED'")
    List<FriendList> getFriendListByUser(@Param("user") UserModel user);

    // Fetch pending friend requests
    @Query("SELECT f FROM FriendList f WHERE f.friend = :user AND f.status = 'PENDING'")
    List<FriendList> findPendingRequests(@Param("user") UserModel user);

    @Query("SELECT f FROM FriendList f WHERE f.user = :user AND f.status = 'PENDING'")
    List<FriendList> findPendingRequestsFrom(@Param("user") UserModel user);

    // Check if a friendship exists
    @Query("SELECT f FROM FriendList f WHERE (f.user = :user AND f.friend = :friend) " +
            "OR (f.user = :friend AND f.friend = :user)")
    Optional<FriendList> findExistingFriendship(@Param("user") UserModel user, @Param("friend") UserModel friend);
}
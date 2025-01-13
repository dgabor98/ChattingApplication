package com.demo.service;

import com.demo.model.UserModel;
import com.demo.model.UserPrincipal;
import com.demo.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@Primary
public class MyUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public MyUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserModel> userOptional = userRepository.findByUserName(username);

        return userOptional
                .map(user -> new UserPrincipal(user))
                .orElseThrow(() -> {
                    log.info("User not found: {}", username);
                    return new UsernameNotFoundException("User not found: " + username);
                });
    }
}

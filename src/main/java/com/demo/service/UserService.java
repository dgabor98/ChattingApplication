package com.demo.service;

import com.demo.controller.response.ApiResponse;
import com.demo.model.UserModel;
import com.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    private final AuthenticationManager authenticationManager;


    public ApiResponse register(UserModel userModel) {
        log.info("Checking if username is taken: {}", userModel.getUserName());

        Optional<UserModel> userInDBOptional = userRepository.findByUserName(userModel.getUserName());

        if (userInDBOptional.isPresent()) {
            log.warn("Username is taken: {}", userModel.getUserName());
            return new ApiResponse(false, "Username is already taken");
        }

        userModel.setPassword(encoder.encode(userModel.getPassword()));
        userModel.setActive(true);
        userRepository.save(userModel);

        log.info("New User registered: {}", userModel.getUserName());
        return new ApiResponse(true, "Registration successful");
    }

    public ResponseEntity<?> verify(UserModel userModel) {
        try {
            log.info(String.format("Verifying user: %s", userModel.getUserName()));

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userModel.getUserName(),
                            userModel.getPassword()
                    )
            );

            if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(authentication.getName());

                ResponseCookie refreshCookie = ResponseCookie.from("JSESSIONID", token)
                        .httpOnly(true)
                        .secure(true)
                        .path("/")
                        .maxAge(30 * 60)  //currently 30 mins 7 days:  7 * 24 * 60 * 60
                        .sameSite("None")
                        .build();

                log.info(String.format("User verified: %s", userModel.getUserName()));
                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                        .body(Map.of(
                                "successful login", true
                        ));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (Exception e) {
            log.error(String.format("Authentication error for user: %s. Reason: %s",
                    userModel.getUserName(), e.getMessage()));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Authentication failed: " + e.getMessage());
        }
    }

    public List<UserModel> getUsers() {
        return userRepository.findAll();
    }
}

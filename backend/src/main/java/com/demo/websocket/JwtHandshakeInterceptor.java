package com.demo.websocket;

import com.demo.service.JWTService;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.List;
import java.util.Map;

@Component
public class JwtHandshakeInterceptor implements HandshakeInterceptor {

    private final JWTService JWTService;
    private final UserDetailsService userDetailsService;

    public JwtHandshakeInterceptor(JWTService JWTService, UserDetailsService userDetailsService) {
        this.JWTService = JWTService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public boolean beforeHandshake(
            ServerHttpRequest request,
            ServerHttpResponse response,
            WebSocketHandler wsHandler,
            Map<String, Object> attributes) {

        List<String> authHeaders = request.getHeaders().get("Authorization");
        if (authHeaders == null || authHeaders.isEmpty()) {
            return false;
        }

        String token = authHeaders.get(0);
        if (!token.startsWith("Bearer ")) {
            return false;
        }

        token = token.substring(7);

        if (!JWTService.validateToken(token)) {
            return false;
        }

        String username = JWTService.extractUserName(token);

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        attributes.put("user", userDetails);

        return true;
    }

    @Override
    public void afterHandshake(
            ServerHttpRequest request,
            ServerHttpResponse response,
            WebSocketHandler wsHandler,
            Exception exception) {
    }
}
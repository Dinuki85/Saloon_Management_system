package com.saloon.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class LoginAttemptService {
    private final int MAX_ATTEMPT = 5;
    private Map<String, Integer> attempts = new HashMap<>();

    public void loginSucceeded(String key) {
        attempts.remove(key);
    }

    public void loginFailed(String key) {
        int count = attempts.getOrDefault(key, 0);
        attempts.put(key, count + 1);
    }

    public boolean isBlocked(String key) {
        return attempts.getOrDefault(key, 0) >= MAX_ATTEMPT;
    }
}

package com.globetrotter.controller;

import com.globetrotter.entity.User;
import com.globetrotter.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/me")
    public User me(Authentication auth) {
        return userRepository.findByEmail(auth.getName()).orElseThrow();
    }

    @PutMapping("/me")
    public User updateMe(Authentication auth, @RequestBody User payload) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();

        if (payload.getFname() != null) user.setFname(payload.getFname());
        if (payload.getLname() != null) user.setLname(payload.getLname());
        if (payload.getPhone() != null) user.setPhone(payload.getPhone());
        if (payload.getCity() != null) user.setCity(payload.getCity());
        if (payload.getCountry() != null) user.setCountry(payload.getCountry());
        if (payload.getAdditionalInfo() != null) user.setAdditionalInfo(payload.getAdditionalInfo());
        if (payload.getLanguagePreference() != null) user.setLanguagePreference(payload.getLanguagePreference());
        if (payload.getProfileImageUrl() != null) user.setProfileImageUrl(payload.getProfileImageUrl());

        return userRepository.save(user);
    }

    @DeleteMapping("/me")
    public void deleteMe(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        userRepository.delete(user);
    }
 // Get user by id
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        return userOpt.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    // Update user by id
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable Long id, @RequestBody User payload) {
        return userRepository.findById(id)
            .map(user -> {
                if (payload.getFname() != null) user.setFname(payload.getFname());
                if (payload.getLname() != null) user.setLname(payload.getLname());
                if (payload.getPhone() != null) user.setPhone(payload.getPhone());
                if (payload.getCity() != null) user.setCity(payload.getCity());
                if (payload.getCountry() != null) user.setCountry(payload.getCountry());
                if (payload.getAdditionalInfo() != null) user.setAdditionalInfo(payload.getAdditionalInfo());
                if (payload.getLanguagePreference() != null) user.setLanguagePreference(payload.getLanguagePreference());
                if (payload.getProfileImageUrl() != null) user.setProfileImageUrl(payload.getProfileImageUrl());

                User updatedUser = userRepository.save(user);
                return ResponseEntity.ok(updatedUser);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // Delete user by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id) {
        return userRepository.findById(id)
            .map(user -> {
                userRepository.delete(user);
                return ResponseEntity.noContent().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
    }
}

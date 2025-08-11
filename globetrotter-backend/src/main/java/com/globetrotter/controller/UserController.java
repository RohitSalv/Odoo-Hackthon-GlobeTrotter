package com.globetrotter.controller;

import com.globetrotter.entity.User;
import com.globetrotter.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
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
}

package com.globetrotter.controller;

import com.globetrotter.dto.*;
import com.globetrotter.entity.User;
import com.globetrotter.repository.UserRepository;
import com.globetrotter.security.JwtUtil;
import com.globetrotter.service.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final OtpService otpService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@Validated @RequestBody SendOtpRequest req) {
        otpService.generateAndSendOtp(req.getEmail());
        return ResponseEntity.ok("OTP sent to email.");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@Validated @RequestBody VerifyOtpRequest req) {
        boolean ok = otpService.verifyOtp(req.getEmail(), req.getOtp());
        if (!ok) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid or expired OTP");
        }
        return ResponseEntity.ok("OTP verified successfully. You may now set your password.");
    }

    @PostMapping("/set-password")
    public ResponseEntity<?> setPassword(@Validated @RequestBody SetPasswordRequest req) {
        if (!otpService.isLatestOtpVerified(req.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("OTP not verified or expired. Cannot set password.");
        }

        Optional<User> userOpt = userRepository.findByEmail(req.getEmail());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }

        User user = userOpt.get();
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setVerified(true);
        userRepository.save(user);

        return ResponseEntity.ok("Password set successfully. You can now log in.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Validated @RequestBody LoginRequest req) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
            );
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }

        String token = jwtUtil.generateToken(req.getEmail());
        return ResponseEntity.ok(new LoginResponse(token, "Bearer"));
    }
}

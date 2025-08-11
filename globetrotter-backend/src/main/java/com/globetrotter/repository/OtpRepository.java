package com.globetrotter.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.globetrotter.entity.OtpVerification;

public interface OtpRepository extends JpaRepository<OtpVerification, Long> {
    Optional<OtpVerification> findTopByEmailOrderByIdDesc(String email);
}
package com.globetrotter.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.globetrotter.entity.User;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
}
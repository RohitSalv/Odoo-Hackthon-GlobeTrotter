package com.globetrotter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.globetrotter.entity.Trip;

import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findAllByUserId(Long userId);
}

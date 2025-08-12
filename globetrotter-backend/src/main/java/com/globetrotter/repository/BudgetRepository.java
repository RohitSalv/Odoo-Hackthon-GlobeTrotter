package com.globetrotter.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.globetrotter.entity.Budget;
import com.globetrotter.entity.Trip;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    Optional<Budget> findByTrip(Trip trip);
}
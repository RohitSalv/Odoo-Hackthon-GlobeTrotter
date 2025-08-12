package com.globetrotter.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.globetrotter.entity.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    // You can add custom queries if needed later
}
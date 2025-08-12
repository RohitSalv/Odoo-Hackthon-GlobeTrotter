package com.globetrotter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.globetrotter.entity.TripStop;

import java.util.List;

public interface TripStopRepository extends JpaRepository<TripStop, Long>, JpaSpecificationExecutor<TripStop> {
    List<TripStop> findAllByTripIdOrderByOrderIndexAsc(Long tripId);
}

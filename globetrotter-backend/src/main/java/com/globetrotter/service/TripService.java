package com.globetrotter.service;
import org.springframework.stereotype.Service;

import com.globetrotter.entity.Trip;
import com.globetrotter.repository.TripRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {

    private final TripRepository tripRepository;

    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public Trip createTrip(Trip trip) {
        return tripRepository.save(trip);
    }

    public List<Trip> getTripsByUserId(Long userId) {
        return tripRepository.findAllByUserId(userId);
    }

    public Optional<Trip> getTripById(Long id) {
        return tripRepository.findById(id);
    }

    public Trip updateTrip(Long id, Trip updatedTrip) {
        return tripRepository.findById(id)
            .map(trip -> {
                trip.setName(updatedTrip.getName());
                trip.setDescription(updatedTrip.getDescription());
                trip.setCoverImageUrl(updatedTrip.getCoverImageUrl());
                trip.setStartDate(updatedTrip.getStartDate());
                trip.setEndDate(updatedTrip.getEndDate());
                trip.setUserId(updatedTrip.getUserId());
                return tripRepository.save(trip);
            }).orElseThrow(() -> new RuntimeException("Trip not found with id " + id));
    }

    public void deleteTrip(Long id) {
        tripRepository.deleteById(id);
    }
}

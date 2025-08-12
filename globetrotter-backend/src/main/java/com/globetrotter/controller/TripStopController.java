package com.globetrotter.controller;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.globetrotter.entity.TripStop;
import com.globetrotter.service.TripStopService;

@RestController
@RequestMapping("/auth/trips")
public class TripStopController {

    private final TripStopService tripStopService;

    public TripStopController(TripStopService tripStopService) {
        this.tripStopService = tripStopService;
    }

    // POST /trips/{tripId}/stops → add stop
    @PostMapping("/{tripId}/stops")
    public ResponseEntity<TripStop> addStop(@PathVariable Long tripId, @RequestBody TripStop tripStop) {
        TripStop createdStop = tripStopService.addStop(tripId, tripStop);
        return ResponseEntity.ok(createdStop);
    }

    // PUT /trips/stops/{id} → update stop
    @PutMapping("/stops/{id}")
    public ResponseEntity<TripStop> updateStop(@PathVariable Long id, @RequestBody TripStop tripStop) {
        return tripStopService.updateStop(id, tripStop)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /trips/stops/{id} → remove stop
    @DeleteMapping("/stops/{id}")
    public ResponseEntity<Void> deleteStop(@PathVariable Long id) {
        tripStopService.removeStop(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{tripId}/stops")
    public ResponseEntity<List<TripStop>> getStopsByTripId(@PathVariable Long tripId) {
        List<TripStop> stops = tripStopService.getStopsByTripId(tripId);
        return ResponseEntity.ok(stops);
    }
    @GetMapping("/stops/search")
    public ResponseEntity<List<TripStop>> searchTripStops(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String sortBy) {
        List<TripStop> stops = tripStopService.searchTripStops(query, country, city, sortBy);
        return ResponseEntity.ok(stops);
    }

}
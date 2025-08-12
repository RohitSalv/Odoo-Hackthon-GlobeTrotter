package com.globetrotter.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "trip_stops")
@Data
@NoArgsConstructor
public class TripStop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tripId; // Foreign key to Trip

    private String city;

    private String country;

    private LocalDate startDate;

    private LocalDate endDate;

    private int orderIndex;

    private String description;  // Added description field
}
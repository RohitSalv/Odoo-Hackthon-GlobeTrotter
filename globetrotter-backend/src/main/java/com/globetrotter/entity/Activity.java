package com.globetrotter.entity;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "activities")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "trip_stop_id", nullable = false)
    private Long tripStopId;  // FK to TripStop

    private String name;

    private String description;

    private String type;

    private BigDecimal cost;

    private Integer duration; // in minutes

    private String imageUrl;
}
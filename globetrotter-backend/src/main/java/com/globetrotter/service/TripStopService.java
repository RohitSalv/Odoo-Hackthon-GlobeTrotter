package com.globetrotter.service;
import org.springframework.stereotype.Service;
import com.globetrotter.entity.TripStop;
import com.globetrotter.repository.TripStopRepository;
import com.globetrotter.repository.specification.TripStopSpecifications;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;


import java.util.List;
import java.util.Optional;

@Service
public class TripStopService {

    private final TripStopRepository tripStopRepository;

    public TripStopService(TripStopRepository tripStopRepository) {
        this.tripStopRepository = tripStopRepository;
    }

    public TripStop addStop(Long tripId, TripStop tripStop) {
        tripStop.setTripId(tripId);
        return tripStopRepository.save(tripStop);
    }

    public Optional<TripStop> updateStop(Long id, TripStop updatedStop) {
        return tripStopRepository.findById(id)
                .map(stop -> {
                    stop.setCity(updatedStop.getCity());
                    stop.setCountry(updatedStop.getCountry());
                    stop.setStartDate(updatedStop.getStartDate());
                    stop.setEndDate(updatedStop.getEndDate());
                    stop.setOrderIndex(updatedStop.getOrderIndex());
                    stop.setDescription(updatedStop.getDescription());  // updated here
                    return tripStopRepository.save(stop);
                });
    }

    public void removeStop(Long id) {
        tripStopRepository.deleteById(id);
    }

    public List<TripStop> getStopsForTrip(Long tripId) {
        return tripStopRepository.findAllByTripIdOrderByOrderIndexAsc(tripId);
    }
    public List<TripStop> getStopsByTripId(Long tripId) {
        return tripStopRepository.findAllByTripIdOrderByOrderIndexAsc(tripId);
    }
    public List<TripStop> searchTripStops(String query, String country, String city, String sortBy) {
        Specification<TripStop> spec = Specification.where(null);

        if (city != null && !city.isEmpty()) {
            spec = spec.and(TripStopSpecifications.hasCity(city));
        }

        if (country != null && !country.isEmpty()) {
            spec = spec.and(TripStopSpecifications.hasCountry(country));
        }

        if (query != null && !query.isEmpty()) {
            spec = spec.and(TripStopSpecifications.containsQueryInCityOrCountryOrDescription(query));
        }

        Sort sort = Sort.unsorted();
        if (sortBy != null && !sortBy.isEmpty()) {
            if (List.of("city", "country", "startDate", "endDate", "orderIndex").contains(sortBy)) {
                sort = Sort.by(sortBy).ascending();
            }
        }

        return tripStopRepository.findAll(spec, sort);
    }
}
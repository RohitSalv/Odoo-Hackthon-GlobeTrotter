package com.globetrotter.repository.specification;

import com.globetrotter.entity.TripStop;
import org.springframework.data.jpa.domain.Specification;

public class TripStopSpecifications {

    public static Specification<TripStop> hasCity(String city) {
        return (root, query, builder) ->
                city == null || city.isEmpty() ? null : builder.equal(builder.lower(root.get("city")), city.toLowerCase());
    }

    public static Specification<TripStop> hasCountry(String country) {
        return (root, query, builder) ->
                country == null || country.isEmpty() ? null : builder.equal(builder.lower(root.get("country")), country.toLowerCase());
    }

    public static Specification<TripStop> containsQueryInCityOrCountryOrDescription(String q) {
        return (root, query, builder) -> {
            if (q == null || q.isEmpty()) return null;
            String pattern = "%" + q.toLowerCase() + "%";
            return builder.or(
                    builder.like(builder.lower(root.get("city")), pattern),
                    builder.like(builder.lower(root.get("country")), pattern),
                    builder.like(builder.lower(root.get("description")), pattern)
            );
        };
    }
}

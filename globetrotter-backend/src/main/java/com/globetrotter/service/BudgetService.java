package com.globetrotter.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.globetrotter.entity.Budget;
import com.globetrotter.entity.Trip;
import com.globetrotter.repository.BudgetRepository;
import com.globetrotter.repository.TripRepository;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final TripRepository tripRepository;

    public Budget getBudget(Long tripId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new EntityNotFoundException("Trip not found with id: " + tripId));
        return budgetRepository.findByTrip(trip)
                .orElseThrow(() -> new EntityNotFoundException("Budget not found for trip id: " + tripId));
    }

    public Budget updateBudget(Long tripId, Budget updatedBudget) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new EntityNotFoundException("Trip not found with id: " + tripId));

        Budget budget = budgetRepository.findByTrip(trip).orElse(new Budget());
        budget.setTrip(trip);
        budget.setTransportCost(updatedBudget.getTransportCost());
        budget.setStayCost(updatedBudget.getStayCost());
        budget.setActivitiesCost(updatedBudget.getActivitiesCost());
        budget.setMealsCost(updatedBudget.getMealsCost());

        BigDecimal total = BigDecimal.ZERO;
        if (updatedBudget.getTransportCost() != null) total = total.add(updatedBudget.getTransportCost());
        if (updatedBudget.getStayCost() != null) total = total.add(updatedBudget.getStayCost());
        if (updatedBudget.getActivitiesCost() != null) total = total.add(updatedBudget.getActivitiesCost());
        if (updatedBudget.getMealsCost() != null) total = total.add(updatedBudget.getMealsCost());
        budget.setTotalCost(total);

        return budgetRepository.save(budget);
    }
}
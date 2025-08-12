package com.globetrotter.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.globetrotter.entity.Budget;
import com.globetrotter.service.BudgetService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetService budgetService;

    @GetMapping("/trips/{tripId}/budget")
    public ResponseEntity<Budget> getBudget(@PathVariable Long tripId) {
        return ResponseEntity.ok(budgetService.getBudget(tripId));
    }

    @PutMapping("/trips/{tripId}/budget")
    public ResponseEntity<Budget> updateBudget(@PathVariable Long tripId, @RequestBody Budget budget) {
        return ResponseEntity.ok(budgetService.updateBudget(tripId, budget));
    }
}

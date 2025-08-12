package com.globetrotter.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.globetrotter.entity.Activity;
import com.globetrotter.service.ActivityService;

@RestController
@RequestMapping("/auth")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    // POST /stops/{stopId}/activities → add activity
    @PostMapping("/stops/{stopId}/activities")
    public ResponseEntity<Activity> addActivity(@PathVariable Long stopId, @RequestBody Activity activity) {
        Activity createdActivity = activityService.addActivity(stopId, activity);
        return ResponseEntity.ok(createdActivity);
    }

    // PUT /activities/{id} → update activity
    @PutMapping("/activities/{id}")
    public ResponseEntity<Activity> updateActivity(@PathVariable Long id, @RequestBody Activity activity) {
        return activityService.updateActivity(id, activity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /activities/{id} → remove activity
    @DeleteMapping("/activities/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Long id) {
        activityService.removeActivity(id);
        return ResponseEntity.noContent().build();
    }
}
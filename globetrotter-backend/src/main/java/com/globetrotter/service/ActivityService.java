package com.globetrotter.service;
import org.springframework.stereotype.Service;

import com.globetrotter.entity.Activity;
import com.globetrotter.repository.ActivityRepository;

import java.util.Optional;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public Activity addActivity(Long stopId, Activity activity) {
        activity.setTripStopId(stopId);
        return activityRepository.save(activity);
    }

    public Optional<Activity> updateActivity(Long id, Activity updatedActivity) {
        return activityRepository.findById(id)
                .map(activity -> {
                    activity.setName(updatedActivity.getName());
                    activity.setDescription(updatedActivity.getDescription());
                    activity.setType(updatedActivity.getType());
                    activity.setCost(updatedActivity.getCost());
                    activity.setDuration(updatedActivity.getDuration());
                    activity.setImageUrl(updatedActivity.getImageUrl());
                    return activityRepository.save(activity);
                });
    }

    public void removeActivity(Long id) {
        activityRepository.deleteById(id);
    }
}
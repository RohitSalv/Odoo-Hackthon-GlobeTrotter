import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripManagementService, TripStop, Activity, Budget } from '../../core/trips/trip-management.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../reuse/header/header';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Header],
  templateUrl: './itinerary.html',
  styleUrls: ['./itinerary.css'],
})
export class ItineraryComponent implements OnInit {
  tripId!: number;

  stopForm!: FormGroup;
  activityForm!: FormGroup;
  budgetForm!: FormGroup;

  stops: TripStop[] = [];
  selectedStopId: number | null = null;

  activities: Activity[] = [];

  loading = false;
  error = '';
  success = '';

  editStopId: number | null = null;
  editActivityId: number | null = null;

  budget: Budget = {
    transportCost: 0,
    stayCost: 0,
    activitiesCost: 0,
    mealsCost: 0,
    totalCost: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private tripService: TripManagementService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.tripId = Number(this.route.snapshot.paramMap.get('tripId'));

    // Stop form
    this.stopForm = this.fb.group({
      city: ['', Validators.required],
      country: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      orderIndex: [1, Validators.required],
      description: [''],
    });

    // Activity form
    this.activityForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      type: [''],
      cost: [0],
      duration: [0],
      imageUrl: [''],
    });

    // Budget form
    this.budgetForm = this.fb.group({
      transportCost: [0, Validators.required],
      stayCost: [0, Validators.required],
      activitiesCost: [0, Validators.required],
      mealsCost: [0, Validators.required],
      totalCost: [{ value: 0, disabled: true }],
    });

    this.loadStops();
    this.loadBudget();
  }

  // --- Stops ---

  loadStops() {
    this.loading = true;
    this.tripService.getStops(this.tripId).subscribe({
      next: (stops) => {
        this.stops = stops;
        this.loading = false;

        if (stops.length && !this.selectedStopId) {
          this.selectStop(stops[0].id!);
        }

        if (!this.editStopId) {
          this.stopForm.get('orderIndex')?.setValue(this.stops.length + 1);
        }

        this.cd.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load stops';
        this.loading = false;
        this.cd.detectChanges();
      },
    });
  }

  addOrUpdateStop() {
    if (this.stopForm.invalid) return;

    if (this.editStopId !== null) {
      this.tripService.updateStop(this.editStopId, this.stopForm.value).subscribe({
        next: () => {
          this.success = 'Stop updated successfully';
          this.error = '';
          this.editStopId = null;
          this.stopForm.reset({ orderIndex: this.stops.length + 1 });
          this.loadStops();
          this.cd.detectChanges();
        },
        error: () => {
          this.error = 'Failed to update stop';
          this.success = '';
          this.cd.detectChanges();
        },
      });
    } else {
      this.tripService.addStop(this.tripId, this.stopForm.value).subscribe({
        next: (stop) => {
          this.success = 'Stop added!';
          this.error = '';
          this.stops.push(stop);
          this.stopForm.reset({ orderIndex: this.stops.length + 1 });
          this.cd.detectChanges();
        },
        error: () => {
          this.error = 'Failed to add stop';
          this.success = '';
          this.cd.detectChanges();
        },
      });
    }
  }

  startEditStop(stop: TripStop) {
    this.editStopId = stop.id ?? null;
    this.stopForm.patchValue(stop);
    this.success = '';
    this.error = '';
    setTimeout(() => this.cd.detectChanges(), 0);
  }

  cancelEditStop() {
    this.editStopId = null;
    this.stopForm.reset({ orderIndex: this.stops.length + 1 });
    this.error = '';
    this.success = '';
    this.cd.detectChanges();
  }

  deleteStop(id: number | undefined) {
    if (!id || !confirm('Are you sure you want to delete this stop?')) return;

    this.tripService.deleteStop(id).subscribe({
      next: () => {
        this.success = 'Stop deleted';
        this.error = '';
        if (this.editStopId === id) {
          this.cancelEditStop();
        }
        if (this.selectedStopId === id) {
          this.selectedStopId = null;
          this.activities = [];
        }
        this.loadStops();
        this.cd.detectChanges();
      },
      error: () => {
        this.error = 'Failed to delete stop';
        this.success = '';
        this.cd.detectChanges();
      },
    });
  }

  selectStop(stopId: number) {
    this.selectedStopId = stopId;
    this.activityForm.reset();
    this.success = '';
    this.error = '';
    this.loadActivities(stopId);
  }

  // --- Activities ---

  loadActivities(stopId: number) {
    this.tripService.getActivities(stopId).subscribe({
      next: (activities) => {
        this.activities = activities;
        this.cd.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load activities';
        this.activities = [];
        this.cd.detectChanges();
      },
    });
  }

  addOrUpdateActivity() {
    if (this.activityForm.invalid || this.selectedStopId === null) return;

    if (this.editActivityId !== null) {
      this.tripService.updateActivity(this.editActivityId, this.activityForm.value).subscribe({
        next: (updatedActivity) => {
          this.success = 'Activity updated!';
          this.error = '';
          // Replace the updated activity in the array
          const idx = this.activities.findIndex(a => a.id === this.editActivityId);
          if (idx > -1) this.activities[idx] = updatedActivity;
          this.editActivityId = null;
          this.activityForm.reset();
          this.cd.detectChanges();
        },
        error: () => {
          this.error = 'Failed to update activity';
          this.success = '';
          this.cd.detectChanges();
        },
      });
    } else {
      this.tripService.addActivity(this.selectedStopId, this.activityForm.value).subscribe({
        next: (newActivity) => {
          this.success = 'Activity added!';
          this.error = '';
          this.activities.push(newActivity);
          this.activityForm.reset();
          this.cd.detectChanges();
        },
        error: () => {
          this.error = 'Failed to add activity';
          this.success = '';
          this.cd.detectChanges();
        },
      });
    }
  }

  startEditActivity(activity: Activity) {
    this.editActivityId = activity.id ?? null;
    this.activityForm.patchValue(activity);
    this.success = '';
    this.error = '';
    setTimeout(() => this.cd.detectChanges(), 0);
  }

  cancelEditActivity() {
    this.editActivityId = null;
    this.activityForm.reset();
    this.error = '';
    this.success = '';
    this.cd.detectChanges();
  }

  deleteActivity(activityId: number | undefined) {
    if (!activityId || !confirm('Are you sure you want to delete this activity?')) return;

    this.tripService.deleteActivity(activityId).subscribe({
      next: () => {
        this.success = 'Activity deleted';
        this.error = '';
        this.activities = this.activities.filter(a => a.id !== activityId);
        if (this.editActivityId === activityId) {
          this.cancelEditActivity();
        }
        this.cd.detectChanges();
      },
      error: () => {
        this.error = 'Failed to delete activity';
        this.success = '';
        this.cd.detectChanges();
      },
    });
  }

  // --- Budget ---

  loadBudget() {
    this.tripService.getBudget(this.tripId).subscribe({
      next: (budget) => {
        this.budget = budget;
        this.budgetForm.patchValue(budget);
        this.updateTotalCost();
        this.cd.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load budget';
        this.cd.detectChanges();
      },
    });
  }

  updateTotalCost() {
    const val = this.budgetForm.value;
    const total =
      Number(val.transportCost) +
      Number(val.stayCost) +
      Number(val.activitiesCost) +
      Number(val.mealsCost);

    this.budgetForm.get('totalCost')?.setValue(total);
  }

  saveBudget() {
    if (this.budgetForm.invalid) return;

    const budgetToSave = this.budgetForm.getRawValue();
    this.tripService.updateBudget(this.tripId, budgetToSave).subscribe({
      next: (updatedBudget) => {
        this.success = 'Budget updated successfully!';
        this.error = '';
        this.budget = updatedBudget;
        this.budgetForm.patchValue(updatedBudget);
        this.cd.detectChanges();
      },
      error: () => {
        this.error = 'Failed to update budget';
        this.success = '';
        this.cd.detectChanges();
      },
    });
  }
}

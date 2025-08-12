import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripStopsService, TripStop } from '../../core/trips/trip-stops.service';
import { ActivitiesService } from '../../core/trips/activities.service';
import { BudgetService } from '../../core/trips/budget.service'; // Make sure this service exists
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../reuse/header/header';

interface Budget {
  transportCost: number;
  stayCost: number;
  activitiesCost: number;
  mealsCost: number;
  totalCost: number;
}

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,Header],
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

  loading = false;
  error = '';
  success = '';

  editStopId: number | null = null;

  budget: Budget = {
    transportCost: 0,
    stayCost: 0,
    activitiesCost: 0,
    mealsCost: 0,
    totalCost: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private tripStopsService: TripStopsService,
    private activitiesService: ActivitiesService,
    private budgetService: BudgetService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.tripId = Number(this.route.snapshot.paramMap.get('tripId'));

    this.stopForm = this.fb.group({
      city: ['', Validators.required],
      country: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      orderIndex: [1, Validators.required],
      description: [''],
    });

    this.activityForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      type: [''],
      cost: [0],
      duration: [0],
      imageUrl: [''],
    });

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

  loadStops() {
    this.loading = true;
    this.tripStopsService.getStops(this.tripId).subscribe({
      next: (stops) => {
        this.stops = stops;
        this.loading = false;

        // Use setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          if (!this.editStopId) {
            this.stopForm.get('orderIndex')?.setValue(this.stops.length + 1);
          }
          this.cd.detectChanges();
        }, 0);
      },
      error: () => {
        this.error = 'Failed to load stops';
        this.loading = false;
        this.cd.detectChanges();
      },
    });
  }

  loadBudget() {
    this.budgetService.getBudget(this.tripId).subscribe({
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
    this.budgetService.updateBudget(this.tripId, budgetToSave).subscribe({
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

  addOrUpdateStop() {
    if (this.stopForm.invalid) return;

    if (this.editStopId !== null) {
      // Update existing stop
      this.tripStopsService.updateStop(this.editStopId, this.stopForm.value).subscribe({
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
      // Add new stop
      this.tripStopsService.addStop(this.tripId, this.stopForm.value).subscribe({
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

  startEdit(stop: TripStop) {
    this.editStopId = stop.id ?? null; // safe assignment
    this.stopForm.patchValue({
      city: stop.city,
      country: stop.country,
      startDate: stop.startDate,
      endDate: stop.endDate,
      orderIndex: stop.orderIndex,
      description: stop.description,
    });
    this.success = '';
    this.error = '';

    // Delay detectChanges to avoid errors
    setTimeout(() => this.cd.detectChanges(), 0);
  }

  cancelEdit() {
    this.editStopId = null;
    this.stopForm.reset({ orderIndex: this.stops.length + 1 });
    this.error = '';
    this.success = '';
    this.cd.detectChanges();
  }

  deleteStop(id: number | undefined) {
    if (!id || !confirm('Are you sure you want to delete this stop?')) return;

    this.tripStopsService.deleteStop(id).subscribe({
      next: () => {
        this.success = 'Stop deleted';
        this.error = '';
        if (this.editStopId === id) {
          this.cancelEdit();
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
    this.cd.detectChanges();
  }

  addActivity() {
    if (this.activityForm.invalid || this.selectedStopId === null) return;

    this.activitiesService.addActivity(this.selectedStopId, this.activityForm.value).subscribe({
      next: () => {
        this.success = 'Activity added!';
        this.activityForm.reset();
        this.error = '';
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

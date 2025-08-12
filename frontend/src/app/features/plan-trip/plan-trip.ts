import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TripService } from '../../core/trips/trip.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { Header } from '../reuse/header/header';

@Component({
  selector: 'app-plan-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,Header,FormsModule],
  templateUrl: './plan-trip.html',
  styleUrls: ['./plan-trip.css'],
})
export class PlanTrip {
  tripForm: FormGroup;
  loading = false;
  error = '';
  success = '';

  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private router: Router,
    private authService: AuthService
  ) {
    this.tripForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      coverImageUrl: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.userId = this.authService.getUserId();
  }

  onSubmit() {
    if (!this.userId) {
      this.error = 'User not logged in.';
      return;
    }

    if (this.tripForm.invalid) {
      this.error = 'Please fill all required fields.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const formValue = this.tripForm.value;
    const newTrip = {
      ...formValue,
      userId: this.userId,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
    };

    this.tripService.createTrip(newTrip).subscribe({
      next: (res) => {
        this.success = 'Trip created successfully!';
        this.loading = false;
        this.tripForm.reset();
        // Optionally redirect to my-trips or dashboard
        this.router.navigate(['/my-trips']);
      },
      error: (err) => {
        this.error = 'Failed to create trip.';
        this.loading = false;
      },
    });
  }
}

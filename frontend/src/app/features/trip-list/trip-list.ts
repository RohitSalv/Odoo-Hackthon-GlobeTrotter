import { Component, OnInit } from '@angular/core';
import { TripService } from '../../core/trips/trip.service';
import { Trip } from '../../shared/trip.model';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, DatePipe,FormsModule],
  templateUrl: './trip-list.html',
  styleUrls: ['./trip-list.css'],
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  loading = false;
  error = '';

  userId: number | null = null;

  constructor(
    private tripService: TripService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.userId$.subscribe((id) => {
      if (id) {
        this.userId = id;
        this.fetchTrips();
      } else {
        this.error = 'User not logged in';
        this.loading = false;
      }
    });
  }

  fetchTrips() {
    if (!this.userId) {
      this.error = 'No user ID to fetch trips';
      return;
    }
    this.loading = true;
    this.error = '';

    this.tripService.getTripsByUser(this.userId).subscribe({
      next: (data) => {
        this.trips = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load trips.';
        this.loading = false;
      },
    });
  }

  onTripClick(tripId: number) {
    this.router.navigate(['/trips', tripId, 'itinerary']);
  }
}

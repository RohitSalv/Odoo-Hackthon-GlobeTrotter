import { Component, OnInit } from '@angular/core';
import { TripStop, TripStopsService } from '../../core/trips/trip-stops.service';
import { debounceTime, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../reuse/header/header';


@Component({
  selector: 'app-trip-search',
  templateUrl: './trip-search.html',
  styleUrls: ['./trip-search.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,Header]
  
})
export class TripSearchComponent implements OnInit {

  tripStops: TripStop[] = [];
  searchQuery = '';
  filterCountry = '';
  filterCity = '';
  sortBy = '';

  countries = ['France', 'USA', 'India'];  // Ideally fetch from backend or config
  cities = ['Paris', 'New York', 'Delhi'];

  private searchSubject = new Subject<void>();

  constructor(private tripStopService: TripStopsService) { }

  ngOnInit(): void {
    // Trigger search 300ms after last keystroke
    this.searchSubject.pipe(debounceTime(300)).subscribe(() => {
      this.fetchTripStops();
    });

    this.fetchTripStops();
  }

  fetchTripStops(): void {
    this.tripStopService.searchTripStops(this.searchQuery, this.filterCountry, this.filterCity, this.sortBy)
      .subscribe(stops => {
        this.tripStops = stops;
      });
  }

  onSearchChange(): void {
    this.searchSubject.next();
  }

  onFilterChange(): void {
    this.fetchTripStops();
  }

  onSortChange(): void {
    this.fetchTripStops();
  }
}

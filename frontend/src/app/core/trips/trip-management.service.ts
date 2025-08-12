import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TripStop {
  id?: number;
  tripId?: number;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  orderIndex: number;
  description?: string;
}

export interface Activity {
  id?: number;
  stopId?: number;
  name: string;
  description?: string;
  type?: string;
  cost?: number;
  duration?: number;
  imageUrl?: string;
}

export interface Budget {
  transportCost: number;
  stayCost: number;
  activitiesCost: number;
  mealsCost: number;
  totalCost: number;
}

@Injectable({
  providedIn: 'root',
})
export class TripManagementService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  // Stops
  getStops(tripId: number): Observable<TripStop[]> {
    return this.http.get<TripStop[]>(`${this.baseUrl}/trips/${tripId}/stops`);
  }

  addStop(tripId: number, stop: TripStop): Observable<TripStop> {
    return this.http.post<TripStop>(`${this.baseUrl}/trips/${tripId}/stops`, stop);
  }

  updateStop(stopId: number, stop: TripStop): Observable<TripStop> {
    return this.http.put<TripStop>(`${this.baseUrl}/stops/${stopId}`, stop);
  }

  deleteStop(stopId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/stops/${stopId}`);
  }

  // Activities
  getActivities(stopId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.baseUrl}/stops/${stopId}/activities`);
  }

  addActivity(stopId: number, activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(`${this.baseUrl}/stops/${stopId}/activities`, activity);
  }

  updateActivity(activityId: number, activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(`${this.baseUrl}/activities/${activityId}`, activity);
  }

  deleteActivity(activityId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/activities/${activityId}`);
  }

  // Budget
  getBudget(tripId: number): Observable<Budget> {
    return this.http.get<Budget>(`${this.baseUrl}/trips/${tripId}/budget`);
  }

  updateBudget(tripId: number, budget: Budget): Observable<Budget> {
    return this.http.put<Budget>(`${this.baseUrl}/trips/${tripId}/budget`, budget);
  }
}

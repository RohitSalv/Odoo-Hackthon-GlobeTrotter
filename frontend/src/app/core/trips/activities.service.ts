import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Activity {
  id?: number;
  name: string;
  description?: string;
  type?: string;
  cost?: number;
  duration?: number;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private baseUrl = 'http://localhost:8080/auth'; // Adjust base URL

  constructor(private http: HttpClient) {}

  // Get all activities for a stop
  getActivities(stopId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.baseUrl}/stops/${stopId}/activities`);
  }

  // Add a new activity for a stop
  addActivity(stopId: number, activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(`${this.baseUrl}/stops/${stopId}/activities`, activity);
  }

  // Optional: Update an activity by id
  updateActivity(activityId: number, activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(`${this.baseUrl}/activities/${activityId}`, activity);
  }

  // Optional: Delete an activity by id
  deleteActivity(activityId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/activities/${activityId}`);
  }
}

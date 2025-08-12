import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

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
  providedIn: 'root',
})
export class ActivitiesService {
  private baseUrl = 'http://localhost:8080/auth/stops';

  constructor(private http: HttpClient, private authService: AuthService) {}

  addActivity(stopId: number, activity: Activity): Observable<Activity> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Activity>(`${this.baseUrl}/${stopId}/activities`, activity, { headers });
  }
}

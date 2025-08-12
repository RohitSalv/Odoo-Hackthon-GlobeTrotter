import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../../shared/trip.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private baseUrl = 'http://localhost:8080/auth/trips';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTripsByUser(userId: number): Observable<Trip[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Trip[]>(`${this.baseUrl}?userId=${userId}`, { headers });
  }
  createTrip(trip: Partial<Trip>): Observable<Trip> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Trip>(this.baseUrl, trip, { headers });
  }
}

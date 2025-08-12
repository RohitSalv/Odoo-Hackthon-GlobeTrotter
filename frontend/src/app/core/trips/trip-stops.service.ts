import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface TripStop {
  id?: number;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  orderIndex: number;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TripStopsService {
  private baseUrl = 'http://localhost:8080/auth/trips';

  constructor(private http: HttpClient, private authService: AuthService) {}

  addStop(tripId: number, stop: TripStop): Observable<TripStop> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<TripStop>(`${this.baseUrl}/${tripId}/stops`, stop, { headers });
  }

  getStops(tripId: number): Observable<TripStop[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<TripStop[]>(`${this.baseUrl}/${tripId}/stops`, { headers });
  }
  updateStop(id: number, stop: TripStop): Observable<TripStop> {
    return this.http.put<TripStop>(`${this.baseUrl}/stops/${id}`, stop);
  }

  deleteStop(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/stops/${id}`);
  }
 searchTripStops(
  query?: string,
  country?: string,
  city?: string,
  sortBy?: string
): Observable<TripStop[]> {
  let params = new HttpParams();
  if (query) params = params.set('query', query);
  if (country) params = params.set('country', country);
  if (city) params = params.set('city', city);
  if (sortBy) params = params.set('sortBy', sortBy);

  return this.http.get<TripStop[]>(`${this.baseUrl}/stops/search`, { params });
}
}

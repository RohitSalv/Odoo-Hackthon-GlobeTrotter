import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
export class BudgetService {
  private baseUrl = 'http://localhost:8080/auth/trips';

  constructor(private http: HttpClient) {}

  getBudget(tripId: number): Observable<Budget> {
    return this.http.get<Budget>(`${this.baseUrl}/${tripId}/budget`);
  }

  updateBudget(tripId: number, budget: Budget): Observable<Budget> {
    return this.http.put<Budget>(`${this.baseUrl}/${tripId}/budget`, budget);
  }
}

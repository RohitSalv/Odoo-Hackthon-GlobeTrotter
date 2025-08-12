import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { PlanTrip } from './features/plan-trip/plan-trip';
import { Explore } from './features/explore/explore';
import { TripListComponent } from './features/trip-list/trip-list';
import { ItineraryComponent } from './features/itinerary/itinerary';
import { TripSearchComponent } from './features/trip-search/trip-search';
import { SignupComponent } from './features/auth/signup/signup';
import { OtpVerifyComponent } from './features/auth/otpverify/otpverify';
import { Travelplanner } from './core/ai/travelplanner/travelplanner';
import { Budgetplanner } from './core/ai/budgetplanner/budgetplanner';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path:'signup' , component:SignupComponent},
  { path: 'dashboard', component: Dashboard },
  { path: 'plan-trip', component: PlanTrip },
  { path: 'explore', component: Explore },
  { path: 'my-trips', component: TripListComponent },
  { path: 'trips/:tripId/itinerary', component: ItineraryComponent},
  { path:'search', component:TripSearchComponent},
  { path: 'verify-otp', component: OtpVerifyComponent },
  { path:'ai', component:Travelplanner},
  { path:'ai2', component:Budgetplanner},
  { path: '**', redirectTo: 'login' },
  
];

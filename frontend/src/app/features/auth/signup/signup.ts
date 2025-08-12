import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  imports:[FormsModule,CommonModule,RouterModule]
})
export class SignupComponent {
  email = '';
  phone = '';
  fname = '';
  lname = '';
  password = '';
  confirmPassword = '';

  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  startRegister() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email) {
      this.errorMessage = 'Email is required';
      return;
    }
    if (!this.fname) {
      this.errorMessage = 'First name is required';
      return;
    }
    if (!this.lname) {
      this.errorMessage = 'Last name is required';
      return;
    }
    if (!this.password || this.password.length < 6) {
      this.errorMessage = 'Password (min 6 chars) is required';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.loading = true;

    const payload = {
      email: this.email,
      phone: this.phone || null,
      firstname: this.fname,
      lastname: this.lname,
      password: this.password
    };

    this.auth.register(payload).subscribe({
      next: () => {
        this.auth.sendOtp({ email: this.email }).subscribe({
          next: () => {
            this.loading = false;
            // Redirect to OTP verify page with email in query params
            this.router.navigate(['/verify-otp'], { queryParams: { email: this.email } });
          },
          error: (err) => {
            this.loading = false;
            this.errorMessage = err.error || 'Failed to send OTP';
          }
        });
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error || 'Registration failed';
      }
    });
  }
}

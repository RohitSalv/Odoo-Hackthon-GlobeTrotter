import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otpverify.html',
  imports:[FormsModule,CommonModule]
})
export class OtpVerifyComponent {
  email = '';
  otp = '';
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.email = params['email'];
      }
    });
  }

  verifyOtp() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.otp) {
      this.errorMessage = 'Please enter the OTP';
      return;
    }

    this.loading = true;

    this.auth.verifyOtp({ email: this.email, otp: this.otp }).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'OTP verified successfully! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error || 'OTP verification failed';
      }
    });
  }

  resendOtp() {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    this.auth.sendOtp({ email: this.email }).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'OTP resent successfully';
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error || 'Failed to resend OTP';
      }
    });
  }
}

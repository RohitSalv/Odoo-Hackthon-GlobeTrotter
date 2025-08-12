import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../../reuse/header/header';
import { Router } from '@angular/router';

interface User {
  id: number;
  fname: string;
  lname: string;
  type: string;
  email: string;
  phone?: string;
  city: string;
  country: string;
  languagePreference?: string;
  verified: boolean;
  profileImageUrl?: string;
  additionalInfo?: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.html',
  standalone: true,
  imports: [FormsModule, CommonModule, Header],
})
export class Profile implements OnInit {
  user!: User;
  baseUrl = 'http://localhost:8080'; // your backend URL
  loading = true;
  error = '';

  editMode = false;
  editableUser: Partial<User> = {}; // for binding editable form fields

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userid');
    if (!userId) {
      this.error = 'User not logged in';
      this.loading = false;
      return;
    }

    this.http.get<User>(`${this.baseUrl}/auth/user/${userId}`).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load user data.';
        this.loading = false;
      },
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      // Create a shallow copy for editing, so UI can update but user won't change until saved
      this.editableUser = { ...this.user };
    }
  }

  saveChanges(form: any) {
    if (!form.valid) {
      alert('Please fill required fields');
      return;
    }

    this.http.put<User>(`${this.baseUrl}/auth/user/${this.user.id}`, this.editableUser).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.editMode = false;
      },
      error: () => {
        alert('Failed to update profile. Try again.');
      },
    });
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

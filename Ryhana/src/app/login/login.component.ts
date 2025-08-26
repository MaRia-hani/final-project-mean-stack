import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}
  
  login() {
    this.authService.login(this.credentials).subscribe({
      next: (res: any) => {
        const tokenPayload = this.authService.decodeToken(res.token);

        this.authService.saveToken(res.token);

        localStorage.setItem('userId', tokenPayload.userId);
        localStorage.setItem('userName', res.name);

        if (tokenPayload.isAdmin) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error(err);
        alert('Login Failed');
      },
    });
  }
}
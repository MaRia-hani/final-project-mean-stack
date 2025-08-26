import { Component  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = { name: '', email: '', password: '' };

  constructor(private authService: AuthService , private router: Router) {}

  register() {
    if (this.user.name && this.user.email && this.user.password) {
      this.authService.register(this.user).subscribe({
        next: (res) => {
          console.log('Registration Successful', res);
          alert('Registration Successful');
          this.router.navigate(['/user/login']);
        },
        error: (err) => {
          console.error(err);
          alert('Registration Failed: ' + err.message);
        },
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}

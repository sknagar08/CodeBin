import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private authService: AuthService) { }

  signup(signupForm: NgForm) {
    console.log(signupForm.value);
    this.authService.registerUser(signupForm.value.email, signupForm.value.password);
  }
  reset(signupForm: NgForm) {
    signupForm.reset();
  }

}

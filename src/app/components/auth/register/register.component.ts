import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="register-container">
      <div class="register-card">
        <img src="assets/images/logo.png" alt="Qalifood Logo" class="logo">
        <h2>Registrate</h2>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">E-mail</label>
            <div class="input-container">
              <input type="email" id="email" formControlName="email" class="form-control" placeholder="prueba@gmail.com">
              <span class="mail-icon">✉</span>
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-container">
              <input type="password" id="password" formControlName="password" class="form-control" placeholder="********">
              <span class="eye-icon">👁</span>
            </div>
          </div>
          <button type="submit" [disabled]="registerForm.invalid" class="login-button">Log in</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: white;
      padding: 20px;
    }
    .register-card {
      width: 100%;
      max-width: 400px;
      text-align: center;
    }
    .logo {
      width: 200px;
      height: auto;
      margin-bottom: 20px;
    }
    h2 {
      color: #333;
      font-size: 24px;
      margin-bottom: 30px;
      font-weight: 500;
    }
    .form-group {
      margin-bottom: 20px;
      text-align: left;
    }
    label {
      display: block;
      margin-bottom: 8px;
      color: #333;
      font-weight: 500;
    }
    .input-container {
      position: relative;
    }
    .form-control {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box;
    }
    .mail-icon, .eye-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
      cursor: pointer;
    }
    .login-button {
      width: 100%;
      padding: 14px;
      background-color: #2E7D32;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 20px;
    }
    .login-button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.router.navigate(['/home']);
    }
  }
} 
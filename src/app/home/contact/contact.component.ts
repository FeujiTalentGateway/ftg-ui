import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}
  name: string = '';
  email: string = '';
  message: string = '';
  formSubmitted: boolean = false;

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required),
    });
  }

  userForm?: FormGroup;
  onLogin() {
    this.formSubmitted = true;
    if (this.userForm?.valid) {
      this.showSnackBar(
        "Thank you for reaching out to us. We've received your message and are looking into it."
      );
      this.userForm?.reset();
    }
  }
  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}

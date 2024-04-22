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

  // Properties to store form data
  name: string = '';
  email: string = '';
  message: string = '';
  formSubmitted: boolean = false;

  ngOnInit() {
    // Initializing the form with validation using Reactive Forms
    this.userForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required),
    });
  }

  // Property to hold the user form
  userForm?: FormGroup;

  // Function triggered on form submission
  onLogin() {
    // Set formSubmitted flag to true
    this.formSubmitted = true;

    // Check if the form is valid
    if (this.userForm?.valid) {
      // Show a snackbar with a thank you message
      this.showSnackBar(
        "Thank you for reaching out to us. We've received your message and are looking into it."
      );

      // Reset the form after successful submission
      this.userForm?.reset();
    }
  }

  // Private function to show a snackbar message
  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}

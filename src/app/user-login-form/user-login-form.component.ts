/**
 * Import
 * @module Input
 * @module MatDialogRef
 * @module FetchApiDataService
 * @module MatSnackBar
 * @module Router
 */

import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css'],
})

/**
 * LoginFormComponent
 * Contains the logic to display a modal with a
 * login fields. It places token, user, and movies in
 * the local storage.
 */
export class UserLoginFormComponent {
  @Input() userData = { Username: '', Password: '' };
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', result.user.userName);
        this.fetchApiData
          .getAllMovies()
          .subscribe((result) =>
            localStorage.setItem('movies', JSON.stringify(result))
          );
        this.dialogRef.close();
        this.snackBar.open('Login successful', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (result) => {
        this.snackBar.open('Login Failed', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}

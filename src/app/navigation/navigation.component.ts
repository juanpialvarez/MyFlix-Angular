/**
 * Imports
 * @module Router
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})

/**
 * Navigation Component
 * A navigation bar which routs to:
 * - Profile @module ProfileComponent
 * - Movies @module MovieCardComponent
 * - Logout @module WelcomePageComponent the local storage is cleared in this case
 */
export class NavigationComponent {
  constructor(public router: Router) {}

  gotToProfile(): void {
    this.router.navigate(['profile']);
  }
  gotToMovies(): void {
    this.router.navigate(['movies']);
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}

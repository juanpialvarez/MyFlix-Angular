import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  constructor(public router: Router) {}

  gotToProfile(): void {
    this.router.navigate(['profile']);
  }
  gotToMovies(): void {
    this.router.navigate(['movies']);
  }
}

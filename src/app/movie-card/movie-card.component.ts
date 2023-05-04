import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  movies: any[] = [];
  user: any = localStorage.getItem('userObject');

  constructor(
    public fetchMovies: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUser();
    this.fetchMovies.Refreshrequired.subscribe((response) => {
      this.getUser();
    });
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  getUser(): void {
    this.fetchMovies.getUser().subscribe((resp: any) => {
      this.user = resp;
      return this.user;
    });
  }

  openDetails(movie: {}, details: string): void {
    this.dialog.open(DetailsComponent, {
      data: {
        Movie: movie,
        Detail: details,
      },
      width: '400px',
    });
  }

  addRemoveFromFavorites(id: string, liked: boolean): void {
    if (liked) {
      this.fetchMovies.deleteFavoriteMovie(id).subscribe(
        (result) => {
          this.snackBar.open('Removed movie successfully', 'OK', {
            duration: 2000,
          });
        },
        (result) => {
          this.snackBar.open('Something went wrong', 'OK', {
            duration: 2000,
          });
        }
      );
    } else if (!liked) {
      this.fetchMovies.addFavoriteMovie(id).subscribe(
        (result) => {
          this.snackBar.open('Added movie successfully', 'OK', {
            duration: 2000,
          });
        },
        (result) => {
          this.snackBar.open('Something went wrong', 'OK', {
            duration: 2000,
          });
        }
      );
    }
  }
}

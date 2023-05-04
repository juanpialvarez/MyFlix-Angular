import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent {
  user: any = {};
  movies: any = [];

  constructor(
    public fetchUser: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.fetchUser.Refreshrequired.subscribe((response) => {
      this.getUser();
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
      this.fetchUser.deleteFavoriteMovie(id).subscribe(
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
      this.fetchUser.addFavoriteMovie(id).subscribe(
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

  getUser(): void {
    this.fetchUser.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.fetchUser.getAllMovies().subscribe((movies: any) => {
        this.movies = movies.filter((movie: any) =>
          this.user.favouriteMovies.includes(movie._id)
        );
        return this.user, this.movies;
      });
      return this.user;
    });
  }
}

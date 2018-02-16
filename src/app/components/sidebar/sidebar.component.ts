import { User } from './../../models/User';
import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUser: User.IMe;
  isLoggedIn: boolean;

  constructor(private usersService: UsersService, private router: Router) {
    // emit after login
    this.usersService.currentUserChanged.subscribe(user => {
      user.subscribe(u => {
        this.currentUser = u;
      });
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.usersService.isLoggedIn();

    if (this.isLoggedIn) {
      this.usersService.getMe()
        .subscribe((data: User.IMe) => {
          this.currentUser = data;
        });
    }
  }

  /**
   * Logout from API and go back to login page
   *
   * @memberof SidebarComponent
   */
  logout(): void {
    this.usersService.logout()
      .subscribe(data => {
        this.router.navigate(['/login']);
      });
  }
}

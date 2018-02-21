import { User } from './../../models/User';
import { Component } from '@angular/core';
import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  currentUser: User.IMe;

  constructor(private usersService: UsersService, private router: Router) {
    // emit after login
    this.usersService.currentUserChanged
      .subscribe((user: User.IMe) => {
        this.currentUser = user;
      });
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

  /**
   * Get if is user is login or not
   *
   * @returns Boolean
   * @memberof SidebarComponent
   */
  isLoggedIn(): boolean {
    return this.usersService.isLoggedIn();
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../sharedservices/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;
  token = null; // variable to receive the user token after successful connection.
  currentUser;
  usernameDisplay = '';
  userprofileimageDisplay = '';


  constructor(config: NgbDropdownConfig, private authenticationService: AuthenticationService, private router: Router) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
    this.token = localStorage.getItem('TOKEN_NUMBER');
    if (localStorage.getItem('carpcurrentUser')) {
      // console.log('login... i am logged');
      this.currentUser = this.authenticationService.carpcurrentUserValue;
      //  console.log('login... ' + this.currentUser._id);
    }
  }

  userNameDisplay(): any {
    if (this.currentUser) {
      if (this.currentUser['firstName'] && this.currentUser['lastName']) {
        this.usernameDisplay = this.currentUser['firstName'] + ' ' + this.currentUser['lastName'];
      } else {
        if (this.currentUser['firstName']) {
          this.usernameDisplay = this.currentUser['firstName'];
        }
        if (this.currentUser['lastName']) {
          this.usernameDisplay = this.currentUser['lastName'];
        }
      }
    }
    return this.usernameDisplay;
  }

  userProfileimageDisplay(): any {
    this.userprofileimageDisplay = 'assets/images/faces/default-face.jpg'; //default image
    if (this.currentUser) {
      if (this.currentUser['profileImage']) {
          this.userprofileimageDisplay = this.currentUser['profileImage'];
      }
    }
    return this.userprofileimageDisplay;
  }

  /** logout of the aplication
   */
  logoutUser($event) {
    // remove user from local storage to log user out
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

  // toggle sidebar in small devices, hide/display sidebare in small device
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if(this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if(this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }

  // toggle right sidebar
  toggleRightSidebar() {
    document.querySelector('#right-sidebar').classList.toggle('open');
  }

}

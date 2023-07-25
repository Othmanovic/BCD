import { Component, OnInit } from "@angular/core";
import {
  AuthService,
  GetStatusResponse
} from "../../services/auth/auth.service";
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ResponseData } from 'src/app/models/auth.model';
import { ValidateService } from 'src/app/services/validate/validate.service';

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.scss"]
})
export class SideNavComponent implements OnInit {
  /**
   * A flag set while the component is loading its data
   */
  loading = true;

  /**
   * The user, cached here
   */
  authStatus: GetStatusResponse = {} as GetStatusResponse;

  constructor(
    private as: AuthService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) {}


  async ngOnInit(): Promise<void> {
    await this.testLogin();
    document.addEventListener("auth", () => this.testLogin());
  }


  onLogout() {
    this.authService.logOut();
    this.flashMessage.show('you are logged out', {cssClass: 'alert-success', timout: 3000});
    this.router.navigate(['./welcome']);
    return false;
  }

  /**
   * Tests if the user is logged in
   */
  async testLogin(): Promise<void> {
    const res = await this.as.getCurrentUser();

    this.authStatus = res;

    this.loading = false;
  }
}

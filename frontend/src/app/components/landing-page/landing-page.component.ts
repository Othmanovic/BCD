import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ResponseData } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ValidateService } from 'src/app/services/validate/validate.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})




export class LandingPageComponent implements OnInit {

  username: String;
  firstname: String;
  lastname: String;
  email: String;
  password: String;

  isLoggedIn: boolean = false;

  isSignUpMode: boolean = false;

  onSignInClick() {
    this.isSignUpMode = false;
    console.log("on sigin in", this.isSignUpMode)
  }

  onSignUpClick() {
    this.isSignUpMode = true;
    console.log("on sigin up", this.isSignUpMode)
  }

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }



  ngOnInit(): void {
    console.log("started as ", this.isSignUpMode)
  }

  onRegister() {
    const user = {
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
    }

    if (!this.validateService.validateRegister(user)) {
      alert("please fill in all the fields");
      return true;
    } else {
      console.log("Voilla!");
    }

    if (!this.validateService.validateEmail(user.email)) {
      alert("please fill in a valid email");
      return true;
    } else {
      console.log("Voilla!");
    }

    this.authService.registerUser(user).subscribe(data => {
      if (data['success']) {
        alert("You are now registered, and can login");
        this.router.navigate(['./landing-page'])
        this.isSignUpMode = false;
      } else {
        console.log("Else");

      }
    }
    )

  }


  onLogin() {
    const user = {
      username: this.username,
      password: this.password,
    }

    this.authService.authenticateUser(user).subscribe(data => {
      console.log('Data', data);

      if (data['success']) {
        this.authService.storeUserData(data['token'], data['user']);
        this.router.navigate(['./clients'])
        // this.flashMessage.show('You are now logged in', { cssClass: 'alert-success', timeout: 5000 });
      } else {
        // this.flashMessage.show('Login Failed', { cssClass: 'alert-danger', timeout: 5000 });
        alert("Wrong Username Or Password")
      }

    })
  }
}


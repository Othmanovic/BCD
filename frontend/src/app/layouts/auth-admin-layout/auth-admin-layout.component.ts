import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-admin-layout',
  templateUrl: './auth-admin-layout.component.html',
  styleUrls: ['./auth-admin-layout.component.scss']
})
export class AuthAdminLayoutComponent implements OnInit {

   sign_up_btn = document.querySelector("#sign-up-btn");
   sign_in_btn = document.querySelector("#sign-in-btn");
   container = document.querySelector(".container");




  constructor() { }

  ngOnInit(): void {
    this.sign_in_btn.addEventListener("click", () => {
      this.container.classList.remove("sign-up-mode");
    });
    
    this.sign_up_btn.addEventListener("click", () => {
      this.container.classList.add("sign-up-mode");
    });
  }

}

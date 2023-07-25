import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { AuthAdminLayoutComponent } from './auth-admin-layout/auth-admin-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';



@NgModule({
  declarations: [
    UserLayoutComponent,
    AuthAdminLayoutComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutsModule { }

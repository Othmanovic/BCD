import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { BranchComponent } from "./components/transactions/transactions.component";
import { CardComponent } from "./components/card/card.component";
import { EditThingComponent } from "./components/edit-thing/edit-thing.component";
import { EditStockComponent } from "./components/edit-stock/edit-stock.component";
import { AddStockComponent } from "./components/add-stock/add-stock.component";
import { StocksComponent } from "./components/stocks/stocks.component";
import { AddThingComponent } from "./components/add-thing/add-thing.component";
import { ThingsComponent } from "./components/things/things.component";
import { InventoriesComponent } from "./components/inventories/inventories.component";
import { EditInventoryComponent } from "./components/edit-inventory/edit-inventory.component";
import { AddInventoryComponent } from "./components/add-inventory/add-inventory.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { AccountComponent } from "./components/account/account.component";
import { FileUplaodComponent } from "./components/file-upload/file-upload.component";
import { EventsComponent } from "./components/events/events.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { AddCategoryComponent } from "./components/add-category/add-category.component";
import { EditCategoryComponent } from "./components/edit-category/edit-category.component";
import { LoginGuard } from "./guards/login.guard";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { AuthAdminLayoutComponent } from "./layouts/auth-admin-layout/auth-admin-layout.component";
import { UserLayoutComponent } from "./layouts/user-layout/user-layout.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { CardDeliveryReportComponent } from "./components/card/card-delivery-report/card-delivery-report.component";
import { BankStatementComponent } from "./components/bank-statement/bank-statement.component";


const routes: Routes = [

  // {
  //   path: '', component: UserLayoutComponent, children: [
  //     { path: '', loadChildren: () => import('./views/front/home/home.module').then(m => m.HomeModule) },
  //     { path: 'loginuser', loadChildren: () => import('./views/front/loginuser/loginuser.module').then(m => m.LoginuserModule), canActivateChild: [NoguarduserGuard] },
  //     { path: 'register', loadChildren: () => import('./views/front/register/register.module').then(m => m.RegisterModule), canActivateChild: [NoguarduserGuard] },
  //     { path: 'students', loadChildren: () => import('./views/front/student/student.module').then(m => m.StudentModule), canActivateChild: [GuarduserGuard] },
  //     { path: 'student/:id', loadChildren: () => import('./views/front/studentdetails/studentdetails.module').then(m => m.StudentdetailsModule), canActivateChild: [GuarduserGuard] },
  //   ]
  // },
  // {
  //   path: 'admin', component: AdminLayoutComponent, canActivate: [GuardadminGuard], children: [
  //     { path: '', loadChildren: () => import('./views/admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
  //     { path: 'dashboard', loadChildren: () => import('./views/admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
  //     { path: 'allstudents', loadChildren: () => import('./views/admin/allstudents/allstudents.module').then(m => m.AllstudentsModule) },
  //     { path: 'addstudent', loadChildren: () => import('./views/admin/addstudent/addstudent.module').then(m => m.AddstudentModule) },
  //     { path: 'studentdetails/:id', loadChildren: () => import('./views/admin/studentdetails/studentdetails.module').then(m => m.StudentdetailsModule) },
  //   ]
  // },
  { path: 'admin/login', component: AuthAdminLayoutComponent },

  // Default route
  { path: "", redirectTo: "/landing-page", pathMatch: "full" },

  // Landing Page
  { path: "landing-page", component: LandingPageComponent },

  // Clients
  { path: "clients", component: ClientsComponent },

  // Auth
  {
    path: "cards",
    children: [
      { path: "", component: CardComponent },
      { path: ":email", component: CardComponent },
    ]
  },
  { path: "delivery-report/:id", component: CardDeliveryReportComponent },
  {
    path: "bank-statement",
    children: [
      { path: "", component: BranchComponent },
      { path: ":email", component: BranchComponent }
    ]
  },
  { path: "statement-report/:id", component: BankStatementComponent },
  { path: "statement-report", component: BankStatementComponent },

  // Account
  { path: "account", component: AccountComponent },

  // Scan
  { path: "upload", component: FileUplaodComponent },

  // Events
  { path: "events", component: EventsComponent },

  // Inventories
  {
    path: "inventories",
    // canActivate: [LoginGuard],
    // canActivateChild: [LoginGuard],
    children: [
      { path: "", component: InventoriesComponent },
      { path: "new", component: AddInventoryComponent },
      {
        path: ":inventoryUuid",
        children: [
          { path: "", component: EditInventoryComponent },

          // Categories
          {
            path: "categories",
            children: [
              { path: "", component: CategoriesComponent },
              { path: "new", component: AddCategoryComponent },
              { path: ":categoryUuid", component: EditCategoryComponent }
            ]
          },

          // Things
          {
            path: "things",
            children: [
              { path: "", component: ThingsComponent },
              { path: "new", component: AddThingComponent },
              {
                path: ":thingUuid",
                children: [
                  { path: "", component: EditThingComponent },

                  // Stocks
                  {
                    path: "stocks",
                    children: [
                      { path: "", component: StocksComponent },
                      { path: "new", component: AddStockComponent },
                      { path: ":stockUuid", component: EditStockComponent }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // Page not found (fallback)
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

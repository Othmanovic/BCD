import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatTreeModule } from "@angular/material/tree";

import { QRCodeModule } from "angularx-qrcode";
import { ZXingScannerModule } from "@zxing/ngx-scanner";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { ThingCardComponent } from "./components/thing-card/thing-card.component";
import { StockCardComponent } from "./components/stock-card/stock-card.component";
import { ThingsComponent } from "./components/things/things.component";
import { AddThingComponent } from "./components/add-thing/add-thing.component";
import { AddStockComponent } from "./components/add-stock/add-stock.component";
import { StocksComponent } from "./components/stocks/stocks.component";
import { EditStockComponent } from "./components/edit-stock/edit-stock.component";
import { EditThingComponent } from "./components/edit-thing/edit-thing.component";
import { CardComponent } from "./components/card/card.component";
import { BranchComponent } from "./components/branch/branch.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { InventoriesComponent } from "./components/inventories/inventories.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { EditInventoryComponent } from "./components/edit-inventory/edit-inventory.component";
import { AddInventoryComponent } from "./components/add-inventory/add-inventory.component";
import { InventoryCardComponent } from "./components/inventory-card/inventory-card.component";
import { DeleteConfirmationDialogComponent } from "./components/delete-confirmation-dialog/delete-confirmation-dialog.component";
import { AccountComponent } from "./components/account/account.component";
import { FileUplaodComponent } from "./components/file-upload/file-upload.component";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { EventsComponent } from "./components/events/events.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { CategoriesComponent } from "./components/categories/categories.component";
import { EditCategoryComponent } from "./components/edit-category/edit-category.component";
import { AddCategoryComponent } from "./components/add-category/add-category.component";
import { CategoryCardComponent } from "./components/category-card/category-card.component";
import { CrumbTrailComponent } from "./components/crumb-trail/crumb-trail.component";
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FilterPipe } from "./components/filter.pipe";
import {MatSelectModule} from '@angular/material/select';
import { LayoutsModule } from "./layouts/layouts.module";
import { CardDeliveryReportComponent } from './components/card/card-delivery-report/card-delivery-report.component';
import { FlashMessagesModule } from "angular2-flash-messages";
import { BankStatementComponent } from './components/bank-statement/bank-statement.component';

@NgModule({
  declarations: [
    AppComponent,
    ThingCardComponent,
    StockCardComponent,
    ThingsComponent,
    AddThingComponent,
    AddStockComponent,
    StocksComponent,
    EditStockComponent,
    EditThingComponent,
    CardComponent,
    BranchComponent,
    PageNotFoundComponent,
    InventoriesComponent,
    ClientsComponent,
    EditInventoryComponent,
    AddInventoryComponent,
    InventoryCardComponent,
    DeleteConfirmationDialogComponent,
    AccountComponent,
    FileUplaodComponent,
    SideNavComponent,
    EventsComponent,
    CategoriesComponent,
    EditCategoryComponent,
    AddCategoryComponent,
    CategoryCardComponent,
    CrumbTrailComponent,
    CreateCategoryComponent,
    LandingPageComponent,
    FilterPipe,
    CardDeliveryReportComponent,
    BankStatementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatToolbarModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatMenuModule,
    QRCodeModule,
    ZXingScannerModule,
    MatTreeModule,
    MatSelectModule,
    LayoutsModule,
    FlashMessagesModule.forRoot(),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
      // enabled: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

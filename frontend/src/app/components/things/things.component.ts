import { Component, OnInit } from "@angular/core";
import { Thing } from "../../models/thing/thing";
import { ThingService } from "../../services/thing/thing.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  CrumbTrailComponent,
  Icon
} from "../crumb-trail/crumb-trail.component";
import { InventoryService } from "../../services/inventory/inventory.service";
import { Inventory } from "../../models/inventory/inventory";
import { AuthService, GetStatusResponse } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-things",
  templateUrl: "./things.component.html",
  styleUrls: ["./things.component.scss"]
})
export class ThingsComponent implements OnInit {
  // unauthorized = false;
  // notFound = false;
  // loading = true;
  // oof = false;

  // things: Thing[] = [];

  // inventoryUuid: string;
  // inventory: Inventory;

  // constructor(
  //   private ts: ThingService,
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private is: InventoryService
  // ) {}

  // async ngOnInit(): Promise<void> {
  //   // Get Inventory UUID
  //   this.inventoryUuid = this.route.snapshot.params.inventoryUuid;

  //   await this.is.ready;
  //   this.inventory = this.is.inventories[this.inventoryUuid];

  //   CrumbTrailComponent.crumbs = [
  //     {
  //       icon: Icon.Inventory,
  //       title: this.inventory.name,
  //       routerLink: `/inventories`
  //     },
  //     {
  //       icon: Icon.Thing,
  //       title: "Things"
  //     }
  //   ];

  //   // Fetch the things of this inventory
  //   await this.getThings();

  //   /*
  //   // Navigate to the login component 3 seconds after being unauthorized
  //   setTimeout(() => {
  //     if (this.unauthorized) {
  //       this.router.navigate(["/login"]);
  //     }
  //   }, 3000);
  //   */
  // }

  // async getThings(): Promise<void> {
  //   try {
  //     await this.ts.ready;
  //     this.things = this.ts.things[this.inventoryUuid];

  //     this.loading = false;
  //   } catch (error) {
  //     this.oof = true;

  //     console.log("Unknown error in getThings while creating");
  //     console.error(error);
  //   }
  // }


  title = "مصرف التجارة والتنمية";

  get sideNavOpened(): boolean {
    switch (window.localStorage.getItem("sideNavOpened")) {
      case "true":
        return true;
      case "false":
        return false;
      case null:
        this.sideNavOpened = true;
        return true;
    }
  }

  set sideNavOpened(value: boolean) {
    window.localStorage.setItem("sideNavOpened", value + "");
  }

  /**
   * If the authentication status is currently being checked
   */
  loading = true;

  /**
   * If the authentication token is invalid
   */
  invalidJWT = false;

  /**
   * The user, cached here
   */
  authStatus: GetStatusResponse = {} as GetStatusResponse;

  constructor(private as: AuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.testLogin();
    document.addEventListener("auth", () => this.testLogin());
  }

  /**
   * Tests if the user is logged in
   */
  async testLogin(): Promise<void> {
    const res = await this.as.getCurrentUser();

    this.authStatus = res;

    this.loading = false;
  }

  async onLogout(): Promise<void> {
    await this.logout();
  }

  async logout(): Promise<void> {
    try {
      await this.as.logout();

      this.router.navigate(["/welcome"]);
    } catch (error) {
      console.log(error);
    }

    // Reload the login status
    document.dispatchEvent(new Event("auth"));
  }
}

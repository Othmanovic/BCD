import { ActivatedRoute, Router } from "@angular/router";
import { Component, ElementRef, OnInit } from "@angular/core";
import { AuthService, LoginResponse } from "../../services/auth/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { InventoryService } from "../../services/inventory/inventory.service";
import { CardService } from "src/app/services/card/card.service";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {

  cardInfo: any;
  searchResults: any[];
  account: any[];
  transactions: any[];
  searchQuery: string = '';
  selectedRow: any; // Declare a variable to store the selected result

  filteredCardInfo: any;
  filteredTransactionHistory: any[];

  constructor(
    private elementRef: ElementRef,
    private cardService: CardService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() { }


  // Click handler for rows
  onRowClick(result: any) {
    this.selectedRow = result;
    console.log("Clicked", this.selectedRow);
    if (result) {
      this.router.navigate(['/delivery-report', result._id]);
    } else {
      // Handle case when no row is selected (e.g., show an error message)
    }

  }

  performSearch() {
    // Check if the search query is a PAN number
    const isPANNumber = /^[0-9]{16}$/.test(this.searchQuery);

    // Include the trailing zero in the search query if it's a PAN number
    const formattedSearchQuery = isPANNumber ? this.searchQuery + ' 0' : this.searchQuery;

    this.cardService.searchCards(formattedSearchQuery).subscribe(
      (response) => {
        this.searchResults = response['cards'].map((card) => {
          // Format the card number
          const firstDigits = card.PAN.substr(0, 4);
          const lastDigits = card.PAN.substr(-6);
          const maskedCardNumber = firstDigits + '****' + lastDigits;

          // Update the card object with the masked card number
          return { ...card, maskedCardNumber };
        });

        this.account = response['account'].map((account) => {
          return { ...account };
        });
        this.sharedService.setCardsData(this.searchResults);
        this.sharedService.setAccountCardsData(this.account);
      },
      (error) => {
        console.error('Error searching cards:', error);
        // Handle error here (e.g., show an error message on the UI)
      }
    );
  }

  showRowDetails(selectedRow: any) {
    // Store the selected row's data in a shared service
    this.sharedService.setSelectedRowData(selectedRow);

    // Navigate to the report page
    this.router.navigate(['/delivery-report']);
  }

  getAccountCurrency(accountNo: string): string {
    const matchedAccount = this.account.find(account => account.AccountNo === accountNo);
    return matchedAccount ? matchedAccount.AccountCurrency : 'N/A';
  }

  getAccountArrestedAmounts(accountNo: string): string {
    const matchedAccount = this.account.find(account => account.AccountNo === accountNo);
    return matchedAccount ? matchedAccount.ArrestedAmounts : 'N/A';
  }

  getAccountBalance(accountNo: string): string {
    const matchedAccount = this.account.find(account => account.AccountNo === accountNo);
    return matchedAccount ? matchedAccount.Balance : 'N/A';
  }

  // goToReport(selectedRow: any) {
  //   if (selectedRow) {
  //     this.router.navigate(['/delivery-report', selectedRow._id]);
  //   } else {
  //     // Handle case when no row is selected (e.g., show an error message)
  //   }
  // }

}

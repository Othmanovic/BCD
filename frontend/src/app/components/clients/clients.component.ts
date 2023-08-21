import { Component, ElementRef, OnInit } from "@angular/core";
import {
  CrumbTrailComponent,
  Icon
} from "../crumb-trail/crumb-trail.component";
import html2canvas from 'html2canvas';
import { FilterPipe } from "../filter.pipe";
import { CardService } from "src/app/services/card/card.service";
import { SharedService } from "src/app/services/shared.service";

// const logo = require('../../../assets/icons/bank-logo-1').default as string;
interface Client {
  accountNumber: string;
  idNumber: string;
  name: string;
  amount: number;
  branch: string;
  slipDate: string;
  serialNumber: string;
}

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.scss"],
  providers: [FilterPipe]
})
export class ClientsComponent implements OnInit {

  cardInfo: any;
  searchResults: any[];
  account: any[];
  transactions: any[];
  searchQuery: string = '';

  filteredCardInfo: any;
  filteredTransactionHistory: any[];

  constructor(
    private elementRef: ElementRef,
    private cardService: CardService,
    private sharedService: SharedService,
  ) { }

  ngOnInit() { }

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


  // performSearch() {
  //   this.cardService.searchCards(this.searchQuery).subscribe(
  //     (result) => {
  //       this.filteredCardInfo = result.cardInfo;
  //       this.filteredTransactionHistory = result.transactions;
  //     },
  //     (error) => {
  //       console.error('Error searching cards:', error);
  //     }
  //   );
  // }


}

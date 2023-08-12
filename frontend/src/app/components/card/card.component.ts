import { ActivatedRoute, Router } from "@angular/router";
import { Component, ElementRef, OnInit } from "@angular/core";
import { AuthService, LoginResponse } from "../../services/auth/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { InventoryService } from "../../services/inventory/inventory.service";
import domtoimage from 'dom-to-image';
import { CardService } from "src/app/services/card/card.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  // cardInfo: any;
  // transactions: any[];
  // searchQuery: string = '';

  // filteredCardInfo: any;
  // filteredTransactionHistory: any[];

  // constructor(private elementRef: ElementRef) {
  //   // Simulated data (Replace with actual data from the database)
  //   this.cardInfo = {
  //     accountNumber: '1234567890',
  //     cardNumber: '**** **** **** 1234',
  //     cardHolderName: 'John Doe',
  //     releaseDate: '2022-01-01',
  //     expiryDate: '2024-12-31',
  //     reservedValue: 1000,
  //     balance: 5000,
  //     currency: 'USD'
  //   };

  //   this.transactions = [
  //     {
  //       transactionDate: '2022-01-01',
  //       transactionType: 'Purchase',
  //       transactionValue: 100,
  //       cardCurrency: 'USD',
  //       withdrawnValue: 90,
  //       withdrawalType: 'Online',
  //       withdrawalPlace: 'Website XYZ'
  //     },
  //     {
  //       transactionDate: '2022-01-02',
  //       transactionType: 'Withdrawal',
  //       transactionValue: 200,
  //       cardCurrency: 'USD',
  //       withdrawnValue: 200,
  //       withdrawalType: 'ATM',
  //       withdrawalPlace: 'ATM ABC'
  //     }
  //   ];

  //   this.filteredCardInfo = this.cardInfo;
  //   this.filteredTransactionHistory = this.transactions;
  // }

  // performSearch() {
  //   // Filter the card info data based on search query
  //   this.filteredCardInfo = this.cardInfo.filter((item: any) => {
  //     return (
  //       item.accountNumber.includes(this.searchQuery) ||
  //       item.cardNumber.includes(this.searchQuery) ||
  //       item.cardHolderName.includes(this.searchQuery)
  //     );
  //   });

  //   // Filter the transaction history data based on search query
  //   this.filteredTransactionHistory = this.transactions.filter((item: any) => {
  //     return (
  //       item.accountNumber.includes(this.searchQuery) ||
  //       item.cardNumber.includes(this.searchQuery) ||
  //       item.cardHolderName.includes(this.searchQuery)
  //     );
  //   });
  // }

  // ngOnInit() { }

  cardInfo: any;
  searchResults: any[];
  transactions: any[];
  searchQuery: string = '';

  filteredCardInfo: any;
  filteredTransactionHistory: any[];

  constructor(private elementRef: ElementRef, private cardService: CardService) {}

  ngOnInit() {}

  performSearch() {
    // Include the trailing zero in the search query
    const formattedSearchQuery = this.searchQuery + ' 0';
  
    this.cardService.searchCards(formattedSearchQuery).subscribe(
      (response) => {
        this.searchResults = response['cards'].map((card) => {
          // Format the card number
          const firstDigits = card.PAN.substr(0, 4);
          const lastDigits = card.PAN.substr(-4);
          const maskedCardNumber = firstDigits + '****' + lastDigits;
  
          // Update the card object with the masked card number
          return { ...card, maskedCardNumber };
        });
      },
      (error) => {
        console.error('Error searching cards:', error);
        // Handle error here (e.g., show an error message on the UI)
      }
    );
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

  

  printReport() {
    const reportElement = this.elementRef.nativeElement.querySelector('.table');
    const options = {
      height: reportElement.offsetHeight,
      width: reportElement.offsetWidth
    };

    domtoimage.toPng(reportElement, options)
      .then((dataUrl: string) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write('<html><head><title>Visa Card Report</title></head><body><img src="' + dataUrl + '" /></body></html>');
        printWindow.document.close();
        printWindow.onload = function () {
          printWindow.print();
          printWindow.onafterprint = function () {
            printWindow.close();
          };
        };
      })
      .catch((error: any) => {
        console.error('Error generating report:', error);
      });
  }

}

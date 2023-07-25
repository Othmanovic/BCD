import { ActivatedRoute, Router } from "@angular/router";
import { Component, ElementRef, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { CustomValidatorsService } from "../../services/CustomValidators/custom-validators.service";
import { InventoryService } from "../../services/inventory/inventory.service";
import domtoimage from 'dom-to-image';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})



export class RegisterComponent implements OnInit {
  branchData: any[];
  cardData: any;
  searchQuery: string = '';

  filteredbranchData: any[];
  filteredCardData: any;
  // selected = 'option2';
  branches = ['Branch 1', 'Branch 2', 'Branch 3'];
  selectedBranch: string;
  selectedDate: Date;

  constructor(private elementRef: ElementRef) {
    // Simulated data (Replace with actual data from the database)
    this.cardData = {
      releaseDate: '2022-12-31',
      expiryDate: '2024-12-31',
      accountNumber: 23452365256,
      currency: '$',
      cardNumber: 1000,
      cardHolderName: 'John Doe',
      currentBalance: 5000
    };

    this.branchData = [
      {
        name: 'Alfwaihat',
        portfolioDate: '2022-01-01',
        serialNumber: 10234550,
    
      },
      
    ];

    this.filteredCardData = this.cardData;
    this.filteredbranchData = this.branchData;
  }

  // Function to search for branch or agency information
  performSearch() {
    // Filter the card info data based on search query
    this.filteredCardData = this.cardData.filter((item: any) => {
      return (
        item.accountNumber.includes(this.searchQuery) ||
        item.cardNumber.includes(this.searchQuery) ||
        item.cardHolderName.includes(this.searchQuery)
      );
    });

    // Filter the transaction history data based on search query
    this.filteredbranchData = this.branchData.filter((item: any) => {
      return (
        item.accountNumber.includes(this.searchQuery) ||
        item.cardNumber.includes(this.searchQuery) ||
        item.cardHolderName.includes(this.searchQuery)
      );
    });
  }

  ngOnInit() {}

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
        printWindow.document.write('<html><head><title>بياتات الفرع أو الوكالة</title></head><body><img src="' + dataUrl + '" /></body></html>');
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

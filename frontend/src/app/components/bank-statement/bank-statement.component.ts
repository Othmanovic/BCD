import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as html2pdf from 'html2pdf.js';
import { SharedService } from 'src/app/services/shared.service';
import { TransactionsService } from 'src/app/services/transactions/transactions.service';


@Component({
  selector: 'app-bank-statement',
  templateUrl: './bank-statement.component.html',
  styleUrls: ['./bank-statement.component.scss']
})
export class BankStatementComponent implements OnInit {

  rowId: string;
  name = JSON.parse(localStorage.getItem('user'))['username'];
  currDate: number;
  transactions: any[] | null;
  account: any[] | null;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    // Retrieve transactions data from the shared service
    this.currDate = Date.now()
    this.transactions = this.sharedService.getTransactionsData();
    this.account = this.sharedService.getAccountData();
    console.log("Transactions: ",this.transactions);

    if (!this.transactions) {
      const storedData = localStorage.getItem('transactionsData');
      if (storedData) {
        this.transactions = JSON.parse(storedData);
      }
    }
  }

  getAccountName(accountNo: string): string {
    // Find the account with a matching AccountNo
    const matchedAccount = this.account.find(account => account.AccountNo === accountNo);
  
    // Return the ClientName if the account is found, or a default value if not found
    return matchedAccount ? matchedAccount.ClientName : 'N/A';
  }

  getProductType(accountNo: string): string {
    // Find the account with a matching AccountNo
    const matchedAccount = this.account.find(account => account.AccountNo === accountNo);
  
    // Return the ClientName if the account is found, or a default value if not found
    return matchedAccount ? matchedAccount.ProductType : 'N/A';
  }

  downloadAngularPageAsPdf() {
    const divElement = document.getElementById('download');
    if (!divElement) {
      console.error(`Element with ID 'download' not found.`);
      return;
    }

    // Clone the target div to avoid modifying the original page
    const clonedDiv = divElement.cloneNode(true) as HTMLElement;

    // Remove the download button from the cloned div
    const downloadButton = clonedDiv.querySelector('#download_button');
    if (downloadButton) {
      downloadButton.remove();
    }

    // Create options for html2pdf
    const options = {
      filename: 'Report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generate PDF from the cloned div's HTML content
    html2pdf().from(clonedDiv.outerHTML).set(options).save();
  }


}

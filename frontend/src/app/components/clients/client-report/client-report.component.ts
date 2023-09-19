import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as html2pdf from 'html2pdf.js';
import { CardService } from 'src/app/services/card/card.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-client-report',
  templateUrl: './client-report.component.html',
  styleUrls: ['./client-report.component.scss']
})
export class ClientReportComponent implements OnInit {

  rowId: string;
  name = JSON.parse(localStorage.getItem('user'))['name'];
  cardData: any;
  account: any;
  currDate: any;
  
  constructor(
    private route: ActivatedRoute, 
    private cardService: CardService,
    private sharedService: SharedService,
    ) {}

  ngOnInit(): void {
    this.currDate = Date.now()
    this.cardData = this.sharedService.getCardsData();
    this.account = this.sharedService.getAccountCardsData();
    this.route.params.subscribe(params => {
      this.rowId = params['id'];
      console.log('id', this.rowId);
      
      // Fetch the card data using the cardService based on the row ID
      this.cardService.getCardData(this.rowId).subscribe(
        (response) => {
          if (response['success']) {
            this.cardData = response['cardData'];
          }
          else {
            alert('Error, could not find this account or card')
          }
        },
        (error) => {
          console.error('Error fetching card data:', error);
          // Handle error here (e.g., show an error message on the UI)
        }
      );
    });
  }

  sanitizeAccountNumber(input: string): string {
    return input.replace(/[^0-9]/g, '');    
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

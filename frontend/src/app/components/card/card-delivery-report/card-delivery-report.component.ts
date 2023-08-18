import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as html2pdf from 'html2pdf.js';
import { CardService } from 'src/app/services/card/card.service';

@Component({
  selector: 'app-card-delivery-report',
  templateUrl: './card-delivery-report.component.html',
  styleUrls: ['./card-delivery-report.component.scss']
})
export class CardDeliveryReportComponent implements OnInit {

  rowId: string;
  name = JSON.parse(localStorage.getItem('user'))['username'];
  cardData: any; // Variable to store the fetched card data

  constructor(private route: ActivatedRoute, private cardService: CardService) {}

  ngOnInit(): void {
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

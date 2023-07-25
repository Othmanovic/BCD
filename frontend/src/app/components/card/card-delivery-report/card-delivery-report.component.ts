import { Component, OnInit } from '@angular/core';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-card-delivery-report',
  templateUrl: './card-delivery-report.component.html',
  styleUrls: ['./card-delivery-report.component.scss']
})
export class CardDeliveryReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

import { Component, ElementRef, OnInit } from "@angular/core";
import {
  CrumbTrailComponent,
  Icon
} from "../crumb-trail/crumb-trail.component";
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';
import { FilterPipe } from "../filter.pipe";

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

  clients: Client[] = [

    { accountNumber: '354656787', idNumber: '11111', name: 'Mustafa Mohammed', amount: 30000, branch: 'الحدائق', slipDate: '03/12/2021', serialNumber: '1234551' },
    { accountNumber: '345467765', idNumber: '22222', name: 'Othmanovic Hadirov', amount: 10000, branch: 'الحدائق', slipDate: '03/07/2022', serialNumber: '1234551' },
  ];

  bankClients: HTMLElement[];
  _filterText: string = '';
  filteredClients: any[];

  get filterText() {
    return this._filterText;
  }

  set filterText(value: string) {
    this._filterText = value;
    this.filteredClients = this.filerClientsByName(value)
  }

  filerClientsByName(filterTerm: string) {
    if (this.clients.length === 0 || this.filterText === '') {
      return this.clients;
    } else {
      return this.clients.filter((client) => {
        console.log("in filter function", this.clients)
        return client.name.toLowerCase() === filterTerm.toLowerCase();
      });
    }
  }


  ngOnInit(): void {
    this.filteredClients = this.clients;

    CrumbTrailComponent.crumbs = [
      {
        icon: Icon.Welcome,
        title: "Welcome"
      }
    ];
  }

  // clientData: any[];


  // searchQuery: string;
  // searchResults: any;

  constructor(private elementRef: ElementRef) {
    // this.clientData = [
    //   {
    //     accountNumber: '1234567890',
    //     idNumber: '123456789',
    //     name: 'Mostafa Alhadiri',
    //     amount: 10000,
    //     branch: 'Main Branch',
    //     slipDate: '2023-06-15',
    //     serialNumber: 'ABC123'

    //   },
    // ];

    // this.filteredClientData = this.clientData;
  }



  // search() {

  //   this.searchResults = {
  //     accountNumber: '1234567890',
  //     idNumber: '123456789',
  //     name: 'Mostafa Alhadiri',
  //     amount: 10000,
  //     branch: 'Main Branch',
  //     slipDate: '2023-06-15',
  //     serialNumber: 'ABC123'
  //   };
  // }

  // performSearch() {
  //   // Filter the card info data based on search query
  //   this.filteredClientData = this.clientData.filter((item: any) => {
  //     return (
  //       item.accountNumber.includes(this.searchQuery) ||
  //       item.idNumber.includes(this.searchQuery) ||
  //       item.name.includes(this.searchQuery) ||
  //       item.amount.includes(this.searchQuery) ||
  //       item.branch.includes(this.searchQuery) ||
  //       item.slipDate.includes(this.searchQuery) ||
  //       item.serialNumber.includes(this.searchQuery)
  //     );
  //   });


  // }

  // filterProducts(): void {
  //   const term = this.searchTerm.toLowerCase();

  //   this.bankClients.forEach((product) => {
  //     const title = product.getElementsByClassName('record')[0].textContent;
  //     product.style.display = title.toLowerCase().includes(term) ? 'none' : 'table-row';
  //   });
  // }

  // onKeyUp(event: KeyboardEvent): void {
  //   this.filterProducts();
  // }

  // ngAfterViewInit(): void {
  //   this.bankClients = Array.from(document.getElementsByClassName('table')) as HTMLElement[];
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
        printWindow.document.write('<html><head><title>معلومات العميل</title></head><body><img src="' + dataUrl + '" /></body></html>');
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

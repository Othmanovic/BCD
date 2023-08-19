import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private transactionsData: any[] | null = null;
  constructor() { }

  setTransactionsData(transactions: any[]) {
    this.transactionsData = transactions;
  }

  getTransactionsData() {
    return this.transactionsData;
  }
}

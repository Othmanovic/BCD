import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private transactionsData: any[] | null = null;
  private accountData: any[] | null = null;
  private cardssData: any[] | null = null;
  private accountCardsData: any[] | null = null;
  private selectedRow: any[] | null = null;
  constructor() { }

  // ******* Transactions ***********
  setTransactionsData(transactions: any[]) {
    this.transactionsData = transactions;
  }
  setAccountData(account: any[]) {
    this.accountData = account;
  }

  getTransactionsData() {
    return this.transactionsData;
  }
  getAccountData() {
    return this.accountData;
  }

  // ******* Cards ***********
  setCardsData(cards: any[]) {
    this.cardssData = cards;
  }
  setAccountCardsData(account: any[]) {
    this.accountCardsData = account;
  }

  getCardsData() {
    return this.cardssData;
  }
  getAccountCardsData() {
    return this.accountCardsData;
  }

  setSelectedRowData(selectedRow: any[]) {
    this.selectedRow = selectedRow;
  }

  getSelectedRowData() {
    return this.selectedRow;
  }
}

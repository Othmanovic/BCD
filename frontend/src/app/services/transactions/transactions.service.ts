import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  // Add a method to fetch bank statement based on card number, start date, and end date
  getBankStatement(searchData: any): Observable<any> {
    let token = localStorage.getItem('id_token');
    token = token.split(' ')[1];
    const headerDict = {
      'Authorization': token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };

    const data = { searchData };

    // Adjust the URL according to your backend route
    return this.http.post<any>('http://localhost:3000/files/getBankStatment', data, requestOptions);
  }

  getCardData(id: string) {

    let token = localStorage.getItem('id_token');
    token = token.split(' ')[1];
    const headerDict = {
      'Authorization': token,
    };
    console.log("Token", token);

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };

    return this.http.get<any>(`http://localhost:3000/files/get-transaction-data/${id}`, requestOptions);
  }
}

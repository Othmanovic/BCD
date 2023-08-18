import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  authToken: any;

  constructor(private http: HttpClient) {}

  searchCards(query: string) {
    let token = localStorage.getItem('id_token');
    token = token.split(' ')[1];
    const headerDict = {
      'Authorization': token,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.get<any[]>(`http://localhost:3000/files/search?query=${query}`, requestOptions);
  }

  getCardData(id: string) {
    let token = localStorage.getItem('id_token');
    token = token.split(' ')[1];
    const headerDict = {
      'Authorization': token,
    };
    
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    
    return this.http.get<any>(`http://localhost:3000/files/get-card-data/${id}`, requestOptions);
  }
}

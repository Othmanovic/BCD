import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }
  

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file1', file);
    let token = localStorage.getItem('id_token');
    token = token.split(' ')[1];
    const headerDict = {
      'Authorization': token,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.post('http://localhost:3000/files/upload1', formData, requestOptions);
  }
  
  uploadFile2(file: File) {
    const formData = new FormData();
    formData.append('file2', file);
    let token = localStorage.getItem('id_token');
    token = token.split(' ')[1];
    const headerDict = {
      'Authorization': token,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.post('http://localhost:3000/files/upload2', formData, requestOptions);
  }

  uploadFile3(file: File) {
    const formData = new FormData();
    formData.append('file3', file);
    let token = localStorage.getItem('id_token');
    token = token.split(' ')[1];
    const headerDict = {
      'Authorization': token,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.post('http://localhost:3000/files/upload3', formData, requestOptions);
  }

  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file1', file);

    return this.http.post('http://localhost:3000/files/upload1', formData);
  }
  
  uploadFile2(file: File) {
    const formData = new FormData();
    formData.append('file2', file);

    return this.http.post('http://localhost:3000/files/upload2', formData);
  }
}

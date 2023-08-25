import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import BarcodeFormat from "@zxing/library/esm5/core/BarcodeFormat";
import { FileService } from "src/app/services/file-upload/file.service";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"]
})
export class FileUplaodComponent implements OnInit {
  selectedFile1: File;
  selectedFile2: File;
  selectedFile3: File;

  isUploading1: boolean = false;
  isUploading2: boolean = false;
  isUploading3: boolean = false;

  constructor(
    private http: HttpClient,
    private fileService: FileService,
  ) { }

  onFileUpload1(event: any) {
    const file = event.target.files[0];
    const allowedExtensions = /(\.txt)$/i;

    if (allowedExtensions.test(file.name)) {
      this.selectedFile1 = file;
    } else {
      // Show popup or alert with error message
      alert('Invalid file type. Please select a .txt file.');
      // Clear the file input value
      event.target.value = '';
      // Reset the selected file
      this.selectedFile1 = null;
    }
  }

  onFileUpload2(event: any) {
    const file = event.target.files[0];
    const allowedExtensions = /(\.txt)$/i;

    if (allowedExtensions.test(file.name)) {
      this.selectedFile2 = file;
    } else {
      // Show popup or alert with error message
      alert('Invalid file type. Please select a .txt file.');
      // Clear the file input value
      event.target.value = '';
      // Reset the selected file
      this.selectedFile2 = null;
    }
  }

  onFileUpload3(event: any) {
    const file = event.target.files[0];
    const allowedExtensions = /(\.txt)$/i;

    if (allowedExtensions.test(file.name)) {
      this.selectedFile3 = file;
    } else {
      // Show popup or alert with error message
      alert('Invalid file type. Please select a .txt file.');
      // Clear the file input value
      event.target.value = '';
      // Reset the selected file
      this.selectedFile3 = null;
    }
  }



  uploadFile1() {
    if (!this.selectedFile1) {
      alert('Please select a file first.');
      return;
    }

    // Check if the selected file is a text file
    if (this.selectedFile1.type !== 'text/plain') {
      alert('Please select a .txt file.');
      return;
    }

    this.isUploading1 = true;

    this.fileService.uploadFile(this.selectedFile1).subscribe(
      (response) => {
        console.log('File uploaded successfully!', response);
        this.isUploading1 = false;
      },
      (error) => {
        console.error('Error uploading file:', error);
        this.isUploading1 = false;
      }
    );
  }

  uploadFile2() {
    if (!this.selectedFile2) {
      alert('Please select a file first.');
      return;
    }

    // Check if the selected file is a text file
    if (this.selectedFile2.type !== 'text/plain') {
      alert('Please select a .txt file.');
      return;
    }

    this.isUploading2 = true;

    this.fileService.uploadFile2(this.selectedFile2).subscribe(
      (response) => {
        console.log('File uploaded successfully!', response);
        this.isUploading2 = false;
      },
      (error) => {
        console.error('Error uploading file:', error);
        this.isUploading2 = false;
      }
    );
  }

  uploadFile3() {
    if (!this.selectedFile3) {
      alert('Please select a file first.');
      return;
    }

    // Check if the selected file is a text file
    if (this.selectedFile3.type !== 'text/plain') {
      alert('Please select a .txt file.');
      return;
    }

    this.isUploading3 = true;

    this.fileService.uploadFile3(this.selectedFile3).subscribe(
      (response) => {
        console.log('File uploaded successfully!', response);
        this.isUploading3 = true;
      },
      (error) => {
        console.error('Error uploading file:', error);
        this.isUploading3 = true;
      }
    );
  }


  ngOnInit() { }

}

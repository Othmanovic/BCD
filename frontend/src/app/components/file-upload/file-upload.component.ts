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
  selectedFile: File;

  file1: File;
  file2: File;
  file3: File;

  constructor(
    private http: HttpClient,
    private fileService: FileService,
    ) { }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    const allowedExtensions = /(\.txt)$/i;

    if (allowedExtensions.test(file.name)) {
      this.selectedFile = file;
    } else {
      // Show popup or alert with error message
      alert('Invalid file type. Please select a .txt file.');
      // Clear the file input value
      event.target.value = '';
      // Reset the selected file
      this.selectedFile = null;
    }
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadFile() {
    if (!this.selectedFile) {
      alert('Please select a file first.');
      return;
    }

    // Check if the selected file is a text file
    if (this.selectedFile.type !== 'text/plain') {
      alert('Please select a .txt file.');
      return;
    }

    this.fileService.uploadFile(this.selectedFile).subscribe(
      (response) => {
        console.log('File uploaded successfully!', response);
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }

  uploadFile2() {
    if (!this.selectedFile) {
      alert('Please select a file first.');
      return;
    }

    // Check if the selected file is a text file
    if (this.selectedFile.type !== 'text/plain') {
      alert('Please select a .txt file.');
      return;
    }

    this.fileService.uploadFile2(this.selectedFile).subscribe(
      (response) => {
        console.log('File uploaded successfully!', response);
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }

  uploadFile3() {
    if (!this.selectedFile) {
      alert('Please select a file first.');
      return;
    }

    // Check if the selected file is a text file
    if (this.selectedFile.type !== 'text/plain') {
      alert('Please select a .txt file.');
      return;
    }

    this.fileService.uploadFile3(this.selectedFile).subscribe(
      (response) => {
        console.log('File uploaded successfully!', response);
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }
  
  // onFileSelected(event: any, fileNumber: number) {
  //   const file: File = event.target.files[0];
  //   switch (fileNumber) {
  //     case 1:
  //       this.file1 = file;
  //       break;
  //     case 2:
  //       this.file2 = file;
  //       break;
  //     case 3:
  //       this.file3 = file;
  //       break;
  //     default:
  //       break;
  //   }
  // }


  // uploadFile() {
  //   // Perform upload logic here
  //   console.log('Uploading file:', this.selectedFile);
  //   // Reset the form after upload
  //   this.selectedFileType = null;
  //   this.selectedFile = null;
  // }

  ngOnInit() { }

}

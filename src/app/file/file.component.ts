import {Component} from '@angular/core';
import {AppComponent} from "../app.component";

/**
 * File Component
 */
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {


  file?: File = undefined;
  uploadMessage: string = "";

  // Dependency injection
  constructor(public appComponent: AppComponent) {
  }

  /**
   * setting currently selected file
   * @param event select file
   */
  onFileChange(event: any) {
    this.file = event.target.files[0]
  }

  /**
   * Upload a xlsx file to write values into database
   */
  upload() {

    // If file is set
    if (this.file) {

      // Sets message that the file is uploading
      this.uploadMessage = "Uploading...";

      // Sends file to Server
      this.appComponent.fileService.upload(this.file).subscribe(message => {

        // Sets report as message
        this.uploadMessage = message;

        // Updates all entities
        this.appComponent.reload();

        // Removes file
        this.file = undefined;
      });
    }
  }
}

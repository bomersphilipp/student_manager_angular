import {Component} from "@angular/core";
import {AppComponent} from "../app.component";

/**
 * File Component
 */
@Component({
  selector: "app-file",
  templateUrl: "./file.component.html",
  styleUrls: ["./file.component.css"]
})
export class FileComponent {


  file?: File = undefined;
  uploadMessage = "";

  // Dependency injection
  constructor(public appComponent: AppComponent) {
  }

  /**
   * Sets currently selected file
   * @param event select file
   */
  onFileChange(event: any): void {
    this.file = event.target.files[0]
  }

  /**
   * Uploads a xlsx file to write values into database
   */
  upload(): void {

    // If file is set
    if (this.file) {

      // Sets message that the file is uploading
      this.uploadMessage = "Uploading...";

      // Sends file to Server
      this.appComponent.fileService.upload(this.file).subscribe({

        // Writes upload success message
        next: (message: string) => this.uploadMessage = message,

        // Sets report as message
        complete: () => {
          this.closeUploadDialog();
        },

        // Writes the collected issues
        error: error => this.uploadMessage = error

      });
    }
  }

  /**
   * Closes upload dialog and refreshes database content
   */
  closeUploadDialog() {
    this.appComponent.router.navigate(["/"]).finally(() => this.appComponent.reload());
  }
}

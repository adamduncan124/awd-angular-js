import { Component, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { HttpResponse } from 'selenium-webdriver/http';
import { IMediaService } from '../../../abstracts/services/media.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  //https://stackoverflow.com/questions/40214772/file-upload-in-angular

  pendingFiles: string[] = null;

  constructor(private _uploadService: IMediaService) { }

  ngOnInit() {
  }

  public onDropFile(event: DragEvent): void {
    event.preventDefault();
    this.UploadFiles(event.dataTransfer.files);
  }
  
  public onDragOverFile(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
  }
  
  public onSelectFiles(event: any): void {
    this.UploadFiles(event.target.files);
  }

  private UploadFiles(files: FileList): void {
     if(files.length == 0){
       console.log("No Files Were Selected");
       return;
     }

     if(this.pendingFiles===null)
        this.pendingFiles = [];

     for(var i: number = 0; i < files.length; i++){
        this._uploadService.UploadFile(files[i])
          .subscribe(
            event => {
              if (event.type == HttpEventType.UploadProgress) {
                const percentDone = Math.round(100 * event.loaded / event.total);
                console.log(`File is ${percentDone}% loaded.`);
              } else if (event instanceof HttpResponse) {
                console.log('File is completely loaded!');
              }
            },
            (err) => {
              console.log("Upload Error:", err);
            },
            () => {
              console.log("Upload done");
            }
          );
     }
  }
}

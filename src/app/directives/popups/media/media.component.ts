import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IPopup } from '../../../models/popup';
import { IPopupEvent } from '../../../models/popup-event';
import { IMediaService } from '../../../abstracts/services/media.service';
import { IRequest } from '../../../models/request';
import { IResponse } from '../../../models/response';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit, IPopup {
  data: any = null;
  @Output() onpopupclick: EventEmitter<IPopupEvent> = new EventEmitter();
  errorMessage: any;
  constructor(private mediaService: IMediaService) { }

  ngOnInit() {
    if(this.data === null){
      var response: IResponse;

      this.mediaService.GetMedias(this.BuildRequest()).subscribe(
        response => response = response,
        error => this.errorMessage = <any>error
      );

      if(response!==null)
        this.data = response.results;
    }
  }

  private BuildRequest(): IRequest{
    return null; // just all right now
  }

}

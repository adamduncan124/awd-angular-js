import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IPopup } from '../../../models/popup';
import { IPopupEvent } from '../../../models/popup-event';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit, IPopup {
  data: any = null;
  @Output() onpopupclick: EventEmitter<IPopupEvent> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}

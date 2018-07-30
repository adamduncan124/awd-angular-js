import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IPopup } from '../../../models/popup';
import { IPopupEvent } from '../../../models/popup-event';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, IPopup {
  data: any = null;
  @Output() onpopupclick: EventEmitter<IPopupEvent> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}

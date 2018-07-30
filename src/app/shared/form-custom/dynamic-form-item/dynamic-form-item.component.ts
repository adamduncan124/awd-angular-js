//https://angular.io/guide/dynamic-form

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { IFormItemColumn } from '../../../models/form-item-column';
import { FormItemRichText } from './form-item-richtext';
import * as $ from 'jquery';
import { PopupService } from '../../../services/popup.service';
//import { PopupService } from '../../../services/popup.service';

@Component({
  selector: 'app-dynamic-form-item',
  templateUrl: './dynamic-form-item.component.html',
  styleUrls: ['./dynamic-form-item.component.css']
})

export class DynamicFormItemComponent implements OnInit {    
  @Input() formItem: IFormItemColumn<any>;
  @Input() form: FormGroup;
  @Input() extraValidation: boolean = false;
  get isRequired() { return this.formItem.required; }
  get isValid() { return this.form.controls[this.formItem.name].valid; }

  constructor(private popupService: PopupService){}  

  ngOnInit(): void {
    this.InitRichText();
  }

  public InitRichText(): void{
    var obj = this.formItem;

    $(document).ready(function() {    
      if(obj && obj.controlType == 'richtext'){
        (<FormItemRichText>obj).Init();
      }
    });
  }

  public ExecuteButtonEvent(action: string){
    switch(action){
      case "forecolor":
      case "hilitecolor":
        this.popupService.ShowPopup("color-picker");
        break;
      case "link":
      case "media":
      case "table":
        this.popupService.ShowPopup(action);
        break;
      default:
        (<FormItemRichText>this.formItem).CommandAction(action);
        break;
    }
  }
}

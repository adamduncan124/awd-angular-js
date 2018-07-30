import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPopup } from '../../../models/popup';
import { IPopupEvent } from '../../../models/popup-event';

@Component({
  selector: 'app-colorpicker',
  templateUrl: './colorpicker.component.html',
  styleUrls: ['./colorpicker.component.css']
})
export class ColorpickerComponent implements OnInit, IPopup {
  @Input() data: any;
  @Output() onpopupclick: EventEmitter<IPopupEvent> = new EventEmitter();

  public hexList: string[] = [];

  constructor() { }

  ngOnInit() {
    this.buildColorList();
  }

  private buildColorList(){
    for(var i = 0; i <= 16; i = i + 3){
      for(var j = 0; j <= 16; j = j + 3){
        for(var k = 0; k <= 16; k = k + 3){
          var hexValue: string = "#" 
              + this.convertIntToHex(i)
              + this.convertIntToHex(i)
              + this.convertIntToHex(j)
              + this.convertIntToHex(j)
              + this.convertIntToHex(k)
              + this.convertIntToHex(k);

          this.hexList.push(hexValue);
        }
      }
    }
  }

  public onClick(value: string): void{
    this.onpopupclick.emit({ selectedValue: value });
  }

  private convertIntToHex(num: number): string{
    if((num > 16) || (num < 0))
			return "0";
		
		return num.toString(16);
  }
}

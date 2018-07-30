import { Component, OnInit, Input } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { ICalendarBlockList } from '../../models/calendar-block-list';
import { ICalendarBlock } from '../../models/calendar-block';
import { ICalendarItem } from '../../models/calendar-item';

//https://docs.angularjs.org/api/ng/filter/date

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  curDay: number = null;
  curMonth: number = null;
  curYear: number = null;
  format: string = "month";

  error: string;
  headings: string[];
  blockLists: ICalendarBlockList[] = null;

  constructor(private _calendarService: CalendarService) { }

  ngOnInit() {
    this.setDefaults();
    this.loadCalendar();
  }

  private setDefaults(): void{
    var date = new Date();
    this.curDay === null ? this.curDay = date.getDate() : this.curDay;
    this.curMonth === null ? this.curMonth = date.getMonth() : this.curMonth;
    this.curYear === null ? this.curYear = date.getFullYear() : this.curYear;
  }

  private loadCalendar(): void{
    this.headings = this.loadHeadingsByFormat(this.format);
    this.blockLists = this.loadCalendarByFormat(this.format);
  }
  
  private loadHeadingsByFormat(format: string): string[]{
    //set headers
    switch(format){
      case "month":
        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      default:
        return [""];
    }
  }

  private loadCalendarByFormat(format: string): ICalendarBlockList[]{
    var items: ICalendarItem[];

    switch(format){
      case "month":
        this._calendarService.getRange(
          new Date(this.curYear, this.curMonth, 1),
          new Date(this.curYear, this.curMonth + 1, 0)
        ).subscribe(
          items => items = items,
          error => error = error
        );
        return this.loadCalendarByMonth(items);
      default:
        this._calendarService.getRange(
          new Date(this.curYear, this.curMonth, this.curDay),
          new Date(this.curYear, this.curMonth, this.curDay)
        ).subscribe(
          items => items = items,
          error => error = error
        );
        return this.loadCalendarByEvent(items);
    }
  }
  
  private loadCalendarByEvent(items: ICalendarItem[]): ICalendarBlockList[]{
    let blockLists: ICalendarBlockList[] = [];
    var blocks: ICalendarBlock[] = [];

    blocks.push({ isBlank: false, showDate: true, displayTitle: "", items: items });
    blockLists.push({ blocks: blocks });
    return blockLists;
  }

  private loadCalendarByMonth(items: ICalendarItem[]): ICalendarBlockList[]{
    var maxDays: number = 7;
    let blockLists: ICalendarBlockList[] = [];
    var firstDay: Date = new Date(this.curYear, this.curMonth, 1);
    var lastDay: Date = new Date(this.curYear, this.curMonth + 1, 0);
    var skipStartDays: number = firstDay.getDay();
    var numRows: number = Math.ceil((skipStartDays + lastDay.getDate()) / maxDays);
    var curMonth: number = 1;  
    var curRow: number = 1;  

    //set days
    for(var i: number = 0; i < numRows; i++){
      var blocks: ICalendarBlock[] = [];
      var curWeek: number = 1;      

      //test if first blank
      if(i===0){
        for(var first = 0; first < skipStartDays; first++){
            blocks.push({ isBlank: true, showDate: false, displayTitle: "", items: null });
            curWeek++;
        }
      }      

      for(var day = curMonth; day <= ((maxDays * curRow) - skipStartDays); day++) {
        if(day > lastDay.getDate())
          break;

        blocks.push({ isBlank: false, 
          showDate: false, 
          displayTitle: 
          curMonth.toString(), 
          items: items !== undefined ? items.filter(
            item => item.date.getDate() === day
          ) : null });
        curWeek++;
        curMonth++;
      }

      //test if blank last
      if(i===(numRows - 1)){
        for(var last: number = curWeek; curWeek <= maxDays; last++){
          blocks.push({ isBlank: true, showDate: false, displayTitle: "", items: null });
          curWeek++;
        }
      }
      curRow++;
      blockLists.push({ blocks: blocks });
    }

    return blockLists;
  }
}

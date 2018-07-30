import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IGridColumn } from '../../models/grid-column';
import { IResponse } from '../../models/response';
import { IRequest } from '../../models/request';
import { ISort } from '../../models/sort';
import { IGridRouteUrl } from '../../models/grid-route-url';
import { trigger, state, transition, style, animate } from '@angular/animations'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('1600ms')),
      transition('hidden => shown', animate('1300ms')),
    ])
  ]
})

//create pipe
//https://stackoverflow.com/questions/36564976/dynamic-pipe-in-angular-2
//https://angular.io/guide/pipes

export class GridComponent implements OnInit {
  @Input() columns: IGridColumn[];
  @Input() response: IResponse;
  @Input() gridRouteUrls: IGridRouteUrl[] = null;

  public showOptions: boolean = true;

  @Output() public onrequest: EventEmitter<IRequest> = new EventEmitter();

  public visiblityState = 'hidden';
  public toggle(): void {
    if (this.visiblityState === 'hidden')
      this.visiblityState = 'shown';
    else
      this.visiblityState = 'hidden';
  }

  public get results(): Array<any>{
    return this.response ?
           this.response.results :
           [];
  }

  public get current_sorting(): Array<ISort>{
    return this.response ?
           this.response.sorting :
           [];
  }

  constructor() { }

  ngOnInit() {
  }

  public sortToggle(column: IGridColumn): void{
    if(!column.sortable)
      return;

    var request: IRequest;
    var currentSort: number = this.currentSort(column);
    var sorting: ISort[] = [];

    sorting.push(this.BuildSort(column.name
        , (currentSort == 1)));

    this.onrequest.next(this.BuildRequest(sorting));
  }

  private BuildRequest(sort: ISort[]): IRequest{
    return {
      "page": 1,
      "size": 10,
      "filters": null,
      "sorting": sort
    };
  }

  private BuildSort(name: string, directionAsc: boolean){
    return {
      "table": null,
      "name": name,
      "directionAsc": directionAsc
    };
  }

  public currentSort(column: IGridColumn): number{
    var sort = this.current_sorting
    .find(sort => sort.name === column.name);

    if(sort === null || sort === undefined)
      return 0;

    return sort.directionAsc ? 1 : 2;      
  }

  public onResize(event: MouseEvent): void{
    alert("resize coming soon!");
  }

  public BuildOptionHref(result: any[]){
    if(this.gridRouteUrls === null)
      return "#";
    
    var returnStr = "";
    this.gridRouteUrls.forEach(r => 
      returnStr += (r.folderValue !== null && r.folderVariable !== "" ?
        result[r.folderVariable] :
        r.folderValue) + "/" );

    return returnStr.length > 0 ? returnStr.substring(0, returnStr.length - 1) : returnStr;
  }
}

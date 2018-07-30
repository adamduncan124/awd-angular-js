import { Component, OnInit } from '@angular/core';
import { IColumnsService } from '../../abstracts/services/columns.service';
import { IGridColumn } from '../../models/grid-column';
import { IResponse } from '../../models/response';
import { IDataResultsService } from '../../abstracts/services/data-results.service';
import { PmtColumnsService } from './pmt-columns.service';
import { PmtResponseService } from './pmt-response.service';
import { FormItemBase } from '../../shared/form-custom/dynamic-form-item/form-item-base';
import { FormItemTextbox } from '../../shared/form-custom/dynamic-form-item/form-item-textbox';
import { FormItemDropDown } from '../../shared/form-custom/dynamic-form-item/form-item-dropdown';
import { FormItemRichText } from '../../shared/form-custom/dynamic-form-item/form-item-richtext';
import { IRequest } from '../../models/request';

@Component({
  selector: 'app-pmt',
  templateUrl: './pmt.component.html',
  styleUrls: ['./pmt.component.css']
})
export class PmtComponent implements OnInit {
  columns: IGridColumn[];
  response: IResponse;
  errorMessage: string = "test";
  jsonSerial: string;
  formItems: any[];

  constructor(private _columnsService: PmtColumnsService,
              private _responseService: PmtResponseService) { }

  ngOnInit(): void {
    this.formItems = [
      new FormItemRichText(
        {
          name: 'top',
          label: 'Test New Text',
          order: 4,
          value: "Hello World!"
        }
      ),

      new FormItemDropDown({
        name: 'brave',
        label: 'Test Rating',
        options: [
          {name: 'solid',  value: 'Solid'},
          {name: 'great',  value: 'Great'},
          {name: 'good',   value: 'Good'},
          {name: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),

      new FormItemTextbox({
        name: 'firstName',
        label: 'Test name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),

      new FormItemTextbox({
        name: 'emailAddress',
        label: 'Email',
        type: 'email',
        required: true,
        order: 2
      })
    ];
    this.BindGrid(null);
    this.jsonSerial = "test" + JSON.stringify(this.columns) + "<br /><br />" + JSON.stringify(this.response);
  }

  public BindGrid(request: IRequest): void{
    this._columnsService.getGridColumns("test")
        .subscribe(
          columns => this.columns = columns,
          error => this.errorMessage = <any>error
        );
    this._responseService.getResponse(request)
        .subscribe(
          response => this.response = response,
          error => this.errorMessage = <any>error
        );
  }
}

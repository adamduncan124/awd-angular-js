import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//import { IColumnsService } from '../../../abstracts/services/columns.service';
import { IFormItemColumn } from '../../../models/form-item-column';
import { FormItemBase } from '../dynamic-form-item/form-item-base';
import { FormItemTextbox } from '../dynamic-form-item/form-item-textbox';
import { FormItemRichText } from '../dynamic-form-item/form-item-richtext';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.css']
})
export class TableFormComponent implements OnInit {
  @Input() className: string;
  @Input() refId: string;

  formItems: FormItemBase<any>[];
  form: FormGroup;
  errorMessage: string;

  constructor(/*private _columnsService: IColumnsService*/) {  }
 
  ngOnInit() {
    var formColumns: IFormItemColumn<any>[];
    //this._columnsService.GetFormItemColumns(this.className).subscribe(
    //  columns => formColumns = columns,
    //  error => this.errorMessage = <any>error
    //);
    this.form = this.getFormGroup(formColumns);
    this.formItems = this.getFormItems(formColumns);
  }

  private getFormGroup(formColumns: IFormItemColumn<any>[]): FormGroup {
    let group: any = {};

    formColumns.forEach(formColumn => {
      group[formColumn.name] = formColumn.required ? new FormControl(formColumn.value || '', Validators.required)
                                              : new FormControl(formColumn.value || '');
    });
    return new FormGroup(group);
  }

  private getFormItems(formColumns: IFormItemColumn<any>[]): FormItemBase<any>[] {
    let formItems: FormItemBase<any>[] = [];

    //NOTE: controlType is set here by casting classes
    formColumns.forEach(formColumn => {
      switch(formColumn.columnType){
        case ColumnTypes.varcharbig:
          formItems.push(new FormItemRichText(formColumn));
          break;
        case ColumnTypes.varchar:
        case ColumnTypes.int:
          formItems.push(new FormItemTextbox(formColumn));
          break;
        default:
          formItems.push(new FormItemTextbox(formColumn));
          break;
      }      
    });

    return formItems;
  }
}

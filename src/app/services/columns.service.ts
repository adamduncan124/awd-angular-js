import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IFormItemColumn } from '../models/form-item-column';
import { IColumnsService } from '../abstracts/services/columns.service';
import { IColumn } from '../models/column';
import { IGridColumn } from '../models/grid-column';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ColumnsService implements IColumnsService {
  constructor() { }

  public getColumns(tableName: string): Observable<IColumn[]> {
    throw new Error("Method not implemented.");
  }

  public getGridColumns(className: string): Observable<IGridColumn[]> {
    throw new Error("Method not implemented.");
  }

  public getFormItemColumns(className: string, dataResultItems: Array<any>[]): Observable<IFormItemColumn<any>[]> {
    throw new Error("Method not implemented.");
  }
}
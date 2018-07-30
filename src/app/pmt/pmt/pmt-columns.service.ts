import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IFormItemColumn } from '../../models/form-item-column';
import { IColumnsService } from '../../abstracts/services/columns.service';
import { IColumn } from '../../models/column';
import { IGridColumn } from '../../models/grid-column';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PmtColumnsService implements IColumnsService {
  private fakeTest1Columns: string = "./api/fakes/test-grid1/columns.json";

  constructor(private _http: HttpClient) { }

  public getColumns(tableName: string): Observable<IColumn[]> {
    return this.getAnyColumns<IColumn>();
  }

  public getGridColumns(className: string): Observable<IGridColumn[]> {
    return this.getAnyColumns<IGridColumn>();
  }

  public getFormItemColumns(className: string, dataResultItems: Array<any>[]): Observable<IFormItemColumn<any>[]> {
    return this.getAnyColumns<IFormItemColumn<any>>();
  }

  private getAnyColumns<T>(): Observable<T[]> {
    //alert(this.fakeTest1Columns);
    return this._http.get<T[]>(this.fakeTest1Columns)
        .catch(this.handleError);
        //.do(data => con)
  }

  private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
  }
}
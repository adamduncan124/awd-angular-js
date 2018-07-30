import { IColumn } from '../../models/column';
import { IGridColumn } from '../../models/grid-column';
import { IFormItemColumn } from '../../models/form-item-column';
import { Observable } from 'rxjs/Observable';

export interface IColumnsService{
    getColumns(tableName: string): Observable<IColumn[]>;
    getGridColumns(className: string): Observable<IGridColumn[]>;
    getFormItemColumns(className: string, dataResultItems: Array<any>[]): Observable<IFormItemColumn<any>[]>;
}
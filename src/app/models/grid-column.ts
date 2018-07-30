import { IColumn } from './column';

export interface IGridColumn extends IColumn{
    display: string;
    show: boolean;
    sortable: boolean;
}
import { IColumn } from './column';

export interface IFormItemColumn<T> extends IColumn{
    required: boolean;
    label: string;
    value: T;
    controlType: string;
}
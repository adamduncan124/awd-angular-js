import { IFormItemColumn } from "../../../models/form-item-column";

export class FormItemBase<T> implements IFormItemColumn<T>{
    value: T;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    display: string;
    name: string;
    columnType: ColumnTypes;
  
    constructor(options: {
        value?: T,
        name?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string
      } = {}) {

      this.value = options.value;
      this.name = options.name || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
    }
  }
import { FormItemBase } from './form-item-base';

export class FormItemTextbox extends FormItemBase<string> {
  controlType = 'textbox';
  type: string;
  value: string = "";
  
  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { FormItemBase } from '../dynamic-form-item/form-item-base';
import { FormItemRichText } from '../dynamic-form-item/form-item-richtext';
import { FormItemTextbox } from '../dynamic-form-item/form-item-textbox';

declare var AWD: any;

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent {
  form: FormGroup
  @Input() formItems: FormItemBase<any>[];
  @Input() saveText: String = "Save";
  @Input() cancelText: String = "Cancel";
  
  @Output() public OnCancel: EventEmitter<string> = new EventEmitter();
  @Output() public OnSubmit: EventEmitter<FormData> = new EventEmitter();
  
  public extraValidation: boolean = false;

  constructor() {  }
 
  ngOnInit() {
    this.form = this.ToFormGroup(this.formItems);
  }

  payLoad: string = '';

  private ToFormGroup(formItems: FormItemBase<any>[]): FormGroup{
    let groupItems: any = {};

    formItems.forEach( 
      item => {
        let fn: ValidatorFn[] = [];

        if(item.required)
          fn.push(Validators.required);

        if(item.controlType == 'textbox' && (<FormItemTextbox>item).type == "email")
          fn.push(Validators.email);
	  
	    if(item.controlType == 'textbox' && (<FormItemTextbox>item).type == "phone")
		  fn.push(this.PhoneValidator);
	  
	    if(item.controlType == 'textbox' && (<FormItemTextbox>item).type == "phoneemail")
		  fn.push(this.PhoneAndEmailValidator);

        groupItems[item.name] = new FormControl(item.value || '', fn);

      }
    );

    return new FormGroup(groupItems);
  }

  public PhoneValidator(control: FormControl){
	  let phone = control.value;
	  //call awd validator is phone, and format phone also if good.
	  if(AWD.FormValidation.Phone.TestIfPhone(phone, true)){
		  phone = AWD.FormValidation.Phone.Format(phone, true);
		  return null;
	  }
	  
	  return {
		phoneError: AWD.FormValidation.ErrorMsg		
	  };
  }
  
  public PhoneAndEmailValidator(control: FormControl){
	  var phoneReturn = this.PhoneValidator(control);
	  
	  if(phoneReturn === null){
		   return null;
	  }
	  
	  //maybe add the error for phone here also to return (phoneReturn);
	  
	  return Validators.email(control);
  }
  
  SubmitClick() {
    this.extraValidation = true;
    this.FixRichValues();
    //this.payLoad = JSON.stringify(this.form.value);
    this.OnSubmit.next(this.form.value);
  }

  CancelClick(){
    this.OnCancel.next("");
  } 

  private FixRichValues(){
    this.formItems.forEach(item => {
      if(item.controlType == 'richtext'){
        (<FormItemRichText>item).SaveToHidden();
        this.form.controls[item.name].setValue((<FormItemRichText>item).GetValueFromGlobal());
      }        
    });    
  }
}

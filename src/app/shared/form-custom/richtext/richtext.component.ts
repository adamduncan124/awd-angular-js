import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-richtext',
  templateUrl: './richtext.component.html',
  styleUrls: ['./richtext.component.css']
})
export class RichtextComponent extends FormControl implements OnInit {
/*
https://www.tinymce.com/docs/integrations/angular2/
https://github.com/KillerCodeMonkey/ngx-quill
*/
  @Input() formControlName: string;
  @Input() value: string;
  @Input() form: FormGroup;


  constructor(formState: any = null, validatorOrOpts?: ValidatorFn | ValidatorFn | null) { 
    super(formState, validatorOrOpts);
  }

  ngOnInit() {
  }

}

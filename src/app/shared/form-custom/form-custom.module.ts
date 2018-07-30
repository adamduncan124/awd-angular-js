import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule }                from '@angular/platform-browser';
import { ReactiveFormsModule }          from '@angular/forms';

//import { RichtextComponent } from './richtext/richtext.component';
//import { UploadComponent } from './upload/upload.component';
//import { UploadService } from '../../services/upload.service';
import { TableFormComponent } from './table-form/table-form.component';
import { DynamicFormItemComponent } from './dynamic-form-item/dynamic-form-item.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    //RichtextComponent, 
    //UploadComponent, 
    //TableFormComponent, 
    DynamicFormItemComponent, 
    DynamicFormComponent
  ],
  providers: [
    //UploadService,
    
  ],
  exports: [
    DynamicFormItemComponent, 
    DynamicFormComponent
  ]
})
export class FormCustomModule { }

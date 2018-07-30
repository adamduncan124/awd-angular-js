import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FormCustomModule } from './form-custom/form-custom.module';
import { CalendarService } from '../services/calendar.service';
import { DynamicFormComponent } from './form-custom/dynamic-form/dynamic-form.component';
import { DynamicFormItemComponent } from './form-custom/dynamic-form-item/dynamic-form-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormCustomModule,
  ],
  declarations: [ 
    GridComponent, 
    CalendarComponent
  ],
  providers: [
    CalendarService
  ],
  exports: [
    GridComponent,
    CalendarComponent,
    DynamicFormComponent,
    DynamicFormItemComponent
  ],
})
export class SharedModule { }

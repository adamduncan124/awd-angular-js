import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PmtComponent } from './pmt/pmt.component';
import { SharedModule } from '../shared/shared.module';
import { PmtResponseService } from './pmt/pmt-response.service';
import { PmtColumnsService } from './pmt/pmt-columns.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    SharedModule
  ],
  declarations: [PmtComponent],
  providers: [
    PmtColumnsService,
    PmtResponseService
  ],
  exports: [
    PmtComponent
  ]
})
export class PmtModule { }

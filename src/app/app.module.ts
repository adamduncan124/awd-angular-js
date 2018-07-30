import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { PmtModule } from './pmt/pmt.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MobileComponent } from './mobile/mobile.component';
import { PopupComponent } from './directives/popup/popup.component';
import { ColorpickerComponent } from './directives/popups/colorpicker/colorpicker.component';
import { TableComponent } from './directives/popups/table/table.component';
import { LinksComponent } from './directives/popups/links/links.component';
import { PopupDirective } from './directives/popup.directive';
import { PopupService } from './services/popup.service';

@NgModule({
  declarations: [
    AppComponent,
    MobileComponent,
    PopupComponent,
    ColorpickerComponent,
    TableComponent,
    //MediaComponent,
    LinksComponent,
    PopupDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PmtModule
  ],
  providers: [    
    PopupService
  ],
  entryComponents: [
    ColorpickerComponent,
    TableComponent,
    //MediaComponent,
    LinksComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

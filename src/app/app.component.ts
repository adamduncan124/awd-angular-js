import { Component, OnInit, ViewChild } from '@angular/core';
import { IMobileNavItem } from './mobile/mobile-nav-item';
import { IMobileConfig } from './mobile/mobile-config';
import { IPopupItem } from './models/popup-item';
import { ColorpickerComponent } from './directives/popups/colorpicker/colorpicker.component';
import { MediaComponent } from './directives/popups/media/media.component';
import { LinksComponent } from './directives/popups/links/links.component';
import { PopupComponent } from './directives/popup/popup.component';
import { TableComponent } from './directives/popups/table/table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  navigation: IMobileNavItem[];
  mobileConfig: IMobileConfig;

  @ViewChild(PopupComponent) popupComponent: PopupComponent;

  constructor() { }

  ngOnInit(){
    //test nav and test mobile settings
    this.navigation = [
      {
        htmlHref: "#",
        htmlInner:"Test 1",
        htmlTarget: ""
      },
      {
        htmlHref: "#",
        htmlInner:"Test 2",
        htmlTarget: ""
      },
      {
        htmlHref: "#",
        htmlInner:"Test Last",
        htmlTarget: ""
      }
    ];

    this.mobileConfig = {
      mobileNavWidth: 600,
      useMainMenu: true,
      useFontSize: false,
      fontConfig: {
        maxWidth: 0,
        minWidth: 0,    
        maxEm: 0,
        minEm: 0,
        increaseWidth: 0,
        increaseEm: 0,
        contentIds: null 
      }
    };
  }

  public PopupShow(event: any){
    alert(event.target.innerText);
    this.popupComponent.Show(event.target.innerText, true);
  }

  public PopupClose(){
    this.popupComponent.Close();
  }
}

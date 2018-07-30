import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { IMobileConfig } from '../models/mobile-config';
import { IMobileFontConfig } from '../models/mobile-font-config';
import { IMobileNavItem } from '../models/mobile-nav-item';
import { isArray } from 'util';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  },
  animations: [
    trigger('toggleHeight', [
      state('inactive', style({
        height: '0',
        opacity: '0'
      })),
      state('active', style({
        height: '*',
        opacity: '1'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])
  ]
})
export class MobileComponent implements OnInit, AfterViewInit {
  readonly desktopClass: string = "desktop-view";
  readonly mobileClass: string = "mobile-view";
  readonly awdMobileIconClass: string = "awd-mobile-icon";
  readonly hideClass: string = "mobile-view";

  showNavBar: boolean;
  showNavLinks: boolean = true;
  navMobileClass: string;
  navLinksClass: string;
  navLinksState = 'active'

  @Input() navigation: IMobileNavItem[];
  @Input() mobileConfig: IMobileConfig;

  constructor() { }

  ngOnInit() {
    this.showNavBar = this.mobileConfig.useMainMenu;
    this.SiteResize(true, false);
  }

  ngAfterViewInit(){    
    this.SiteResize(false, true);
  }

  onMobileToggle(){
    this.showNavLinks = true;
    this.navLinksState = this.navLinksState === 'active' ? 'inactive' : 'active';
  }

  public onResize(event){
    this.SiteResize(true, true);
  }

  private SiteResize(runMenu: boolean, runFont: boolean): void{
    if(runMenu && this.mobileConfig.useMainMenu)
      this.SiteResizeMainMenu(this.mobileConfig.mobileNavWidth);

    if(runFont && this.mobileConfig.useFontSize)
      this.SiteResizeFontSize(this.mobileConfig.fontConfig);
  }

  private SiteResizeMainMenu(mobileNavWidth: number): void{
    var isMobile: boolean = mobileNavWidth >= window.innerWidth;

    this.navLinksClass = isMobile ?
                  this.mobileClass :
                  this.desktopClass;

    this.navMobileClass = isMobile ?
                  this.awdMobileIconClass :
                  this.hideClass;

    this.showNavLinks = !isMobile;
    this.navLinksState = isMobile ? 'inactive' : 'active';
  }

  private SiteResizeFontSize(mobileFontConfig: IMobileFontConfig): void{    
    var defaultFontSize: string = "1em";
    var fontSize: string = null;

    if(mobileFontConfig.minWidth > 0 && window.innerWidth <= mobileFontConfig.minWidth){
      fontSize = mobileFontConfig.minEm + "em";
    }

    if(mobileFontConfig.maxWidth > 0 && window.innerWidth >= mobileFontConfig.maxWidth){
      fontSize = mobileFontConfig.maxEm + "em";
    }

    //we currently require a min or its just 1
    if(mobileFontConfig.minWidth <= 0 || fontSize !== null){
      if(fontSize === null)
        fontSize = defaultFontSize;
    }else{
      //loop and adjust font
      var increaseEm: number = mobileFontConfig.minEm;
      var increaseWidth: number = mobileFontConfig.minWidth;
      while(increaseWidth < window.innerWidth){
        increaseWidth += mobileFontConfig.increaseWidth;
        increaseEm += mobileFontConfig.increaseEm;
      }
      
      fontSize = increaseEm + "em";
    }
  
    this.ResizeFontForContentId(mobileFontConfig.contentIds, fontSize);
  }

  private ResizeFontForContentId(ids: any, fontSize: string){
    var fontSizeIds = isArray(ids) ? ids : [ids];
    
    fontSizeIds.forEach(i => document.getElementById(i).style.fontSize = fontSize);
  }
}

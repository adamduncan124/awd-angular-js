import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input } from '@angular/core';
import { IPopup } from '../../models/popup';
import { IPopupItem } from '../../models/popup-item';
import { PopupService } from '../../services/popup.service';
import { PopupDirective } from '../popup.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  /*@Input() 
  set show(id: string) {
    this.Show(id, this.resizeable);
  }*/
  //get show() : string

  @ViewChild(PopupDirective) popupHost: PopupDirective;

  public show: boolean = false;
  public active: IPopupItem;
  private popups: IPopupItem[] = [];
  private popupServiceListener: Subscription;

  //overlay properties
  public boHeight: number;
  //boDisplay: string = "none";

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private popupService: PopupService) { }

  ngOnInit(): void {
    this.popups = this.popupService.GetPopups();

    this.popupServiceListener = this.popupService.popupRequest$
        .subscribe(id => this.ProcessRequest(id));
  }

  ngOnDestroy() {
    this.popupServiceListener.unsubscribe();
  }
  
  /*
  public Add(popup: IPopupItem): void{
    this.popups.push(popup);
  }
  */

  private ProcessRequest(id: string){
    if(id === null)
      this.Close();
    else
      this.Show(id, false);
  }

  public Find(id: string): IPopupItem{
    return this.popups.find(p => p.htmlId === id);
  }

  public Exists(id: string): boolean{
    return this.popups.some(p => p.htmlId === id);
  }
  
  public Show(id: string, resizeable: boolean){
      if(this.active = this.Find(id)){
        this.boHeight = window.innerHeight;
        this.show = true;
        this.loadComponent();
        //awd note: add move exact top for popup
        //awd note: add focus element stuff             
        //awd note: resize coming soon.
      }
  }

  public Close(){
    this.show = false;
  }

  public onCloseClicked(): void{
    this.Close();
  }

  private loadComponent() {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.active.component);
    let viewContainerRef = this.popupHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<IPopup>componentRef.instance).data = this.active.data;
  }
}

//https://angular.io/guide/dynamic-component-loader
//https://stackblitz.com/angular/epbedamapdx?file=src%2Fapp%2Fad.service.ts

import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[popup-host]',
})
export class PopupDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

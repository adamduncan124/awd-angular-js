import { Type } from '@angular/core';

export interface IPopupItem {
  htmlId: string;
  htmlTitle: string;
  component: Type<any>;
  data: any;
}
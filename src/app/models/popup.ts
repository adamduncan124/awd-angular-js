import { EventEmitter } from "@angular/core";
import { IPopupEvent } from "./popup-event";

export interface IPopup {
    data: any;
    onpopupclick: EventEmitter<IPopupEvent>;
}
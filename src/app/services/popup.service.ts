import { Injectable }           from '@angular/core';
import { BehaviorSubject }      from 'rxjs/BehaviorSubject';
import { IPopupItem } from '../models/popup-item';
import { ColorpickerComponent } from '../directives/popups/colorpicker/colorpicker.component';
import { TableComponent } from '../directives/popups/table/table.component';
import { MediaComponent } from '../directives/popups/media/media.component';
import { LinksComponent } from '../directives/popups/links/links.component';

@Injectable()
export class PopupService{
    private popupRequestSource = new BehaviorSubject<string>(null);

    public popupRequest$ = this.popupRequestSource.asObservable();

    public ShowPopup(id: string): void{
        this.popupRequestSource.next(id);
    }

    public ClosePopup(): void{
        this.popupRequestSource.next(null);
    }

    public GetPopups(): IPopupItem[]{
        return [
            {
                htmlId: "color-picker",
                htmlTitle: "Color Picker",
                component: ColorpickerComponent,
                data: null
            },
            {
                htmlId: "media",
                htmlTitle: "Media Picker",
                component: MediaComponent,
                data: null
            },
            {
                htmlId: "links",
                htmlTitle: "Links",
                component: LinksComponent,
                data: null
            },
            {
                htmlId: "table",
                htmlTitle: "Tables",
                component: TableComponent,
                data: null
            }
        ];
    }
}
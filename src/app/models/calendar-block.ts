import { ICalendarItem } from './calendar-item';

export interface ICalendarBlock{
    isBlank: boolean;
    showDate: boolean;
    displayTitle: string;    
    items: ICalendarItem[];
}
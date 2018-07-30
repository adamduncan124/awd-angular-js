import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IResponse } from '../models/response';
import { ICalendarItem } from '../models/calendar-item';

@Injectable()
export class CalendarService {
    constructor(private _http: HttpClient) { }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
  }

    public getRange(startDate: Date, endDate: Date): Observable<ICalendarItem[]>{
        return this._http.get<IResponse>("./api/fakes/test-calendarorgrid/response.json")
        .map(r => this.ConvertResponseToCalendarItem(r))
        .catch(this.handleError);
    }

    private ConvertResponseToCalendarItem(response: IResponse): ICalendarItem[]{
        let items: ICalendarItem[] = [];
        //alert("here");
        if(response.results!==null){
            response.results.forEach(
                i => items.push(
                    { 
                        date: i['date'], 
                        title: i['title'], 
                        description: i['description'], 
                        location: i['location'],
                        venue: i['venue']
                    }
                )
            );
        }

        return items;
    }
}
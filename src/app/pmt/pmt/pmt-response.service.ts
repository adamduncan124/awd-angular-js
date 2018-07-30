import { Injectable }   from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IDataResultsService } from '../../abstracts/services/data-results.service';
import { IRequest } from '../../models/request';
import { IResponse } from '../../models/response';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PmtResponseService implements IDataResultsService {
    private fakeTest1Response: string = "./api/fakes/test-grid1/response.json";

    constructor(private _http: HttpClient) { }

    public getResponse(request: IRequest): Observable<IResponse> {
        //alert(this.fakeTest1Response);
        return this._http.get<IResponse>(this.fakeTest1Response)
        .catch(this.handleError);
    }

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
}
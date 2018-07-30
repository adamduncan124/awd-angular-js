import { Injectable }   from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IMediaService } from '../abstracts/services/media.service';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { IResponse } from '../models/response';
import { IRequest } from '../models/request';

//http://jasonwatmore.com/post/2017/12/15/angular-5-mock-backend-example-for-backendless-development

@Injectable()
export class MediaService implements IMediaService {    
  reportProgress: boolean = true;
  url: string = "";

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

  constructor(private _http: HttpClient) { }

  public UploadFile(file: File): Observable<HttpEvent<any>>{
    let formData = new FormData();
    formData.append('upload', file);

    return this.UploadFileWithForm(formData);
  }

  public UploadFileWithForm(formData: FormData): Observable<HttpEvent<any>> {
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: this.reportProgress,
    };

    const req = new HttpRequest('POST', this.url, formData, options);
    return this._http.request(req).catch(this.handleError);
  }
  public GetMedias(request: IRequest): Observable<IResponse> {
    return this._http.get<IResponse>("./api/fakes/media/response.json")
        .catch(this.handleError);
  }

}
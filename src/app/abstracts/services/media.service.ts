import {HttpClient, HttpParams, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from "rxjs";
import { IRequest } from '../../models/request';
import { IResponse } from '../../models/response';

export interface IMediaService {
    UploadFile(file: File): Observable<HttpEvent<any>>;
    UploadFileWithForm(formData: FormData): Observable<HttpEvent<any>>;
    GetMedias(request: IRequest): Observable<IResponse>;
}
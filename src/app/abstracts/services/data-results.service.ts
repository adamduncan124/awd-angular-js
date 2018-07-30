import { IRequest } from "../../models/request";
import { IResponse } from "../../models/response";
import { Observable } from "rxjs/Observable";

export interface IDataResultsService {
    getResponse(request: IRequest): Observable<IResponse>;
}
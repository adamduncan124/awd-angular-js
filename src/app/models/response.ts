import { IRequest } from "./request";

export interface IResponse extends IRequest {
    results: Array<any>[];
    total: number;
}
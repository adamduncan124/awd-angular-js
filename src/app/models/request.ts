import { ISort } from "./sort";
import { IFilter } from "./filter";

export interface IRequest{
    page: number;
    size: number;
    filters: IFilter[];
    sorting: ISort[];
}
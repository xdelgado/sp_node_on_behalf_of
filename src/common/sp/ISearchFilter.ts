import { Sort } from "@pnp/sp";

export interface ISearchFilter {
    text?:string;
    contentTypes:Array<string>;
    sort:Array<Sort>
}
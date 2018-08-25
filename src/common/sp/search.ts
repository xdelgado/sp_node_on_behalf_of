import { ISearchFilter } from "./ISearchFilter";
import { SearchQueryBuilder,SearchResults, sp } from "@pnp/sp";
import { Configuration } from "../../model/Configuration";

export async function search(filter:ISearchFilter){
    const q = SearchQueryBuilder.create()                    
    .text(filter.text || '*')
    .refinementFilters(...getRefinementFilters(filter))
    .rowLimit(10)
    .sortList(...filter.sort);                    
    let content:SearchResults = await sp.search(q);     
    return content;   
}

function getRefinementFilters(filter:ISearchFilter):Array<string>{
    let refinementFilters:Array<string> = [];
    refinementFilters.push(getRefinementFiltersByContentType(filter.contentTypes));
    return refinementFilters;
}

function getRefinementFiltersByContentType(contentTypes:Array<string>){
    if (contentTypes.length > 1){
        return `ContentType:or(${contentTypes.join(',')})`;
    } else {
        return `ContentType:${contentTypes[0]}`;
    }
}

export async function parse(spContents:SearchResults,configuration:Configuration){
    
    let cards = await Promise.all(spContents.PrimarySearchResults.map(async (content):Promise<any> => {        
        let card = {
            contentPageUrl:content.Path,
            updatedBy:content.Author,
            updatedDate:content.LastModifiedTime,
            title:content.Title
        }
        return card;
    }));
    return cards;
}
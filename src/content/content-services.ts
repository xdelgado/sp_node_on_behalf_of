import { Request, Response, Application } from 'express';
import { Configuration } from '../model/Configuration';
import { acquireTokenOnBehalfOf } from '../common/security/authorization';
import { initialize } from "../common/pnp/setup";
import { search, parse } from "../common/sp/search";
import { ISearchFilter } from "../common/sp/ISearchFilter";
import { sp, SortDirection } from '@pnp/sp';

const Default = {
    ContentTypes:['News','Announcement','Document'],
    Sort:[{Property:'LastModifiedTime',Direction:SortDirection.Ascending}]
}


var router =(app:Application,configuration:Configuration) => {
    app.get('/content/all', async (req:Request,res:Response) => {
        if (req.headers.authorization){
            let token:any = acquireTokenOnBehalfOf(req.headers.authorization.split(" ")[1],configuration);
            let filter:ISearchFilter = {
                contentTypes:req.body.contentTypes || Default.ContentTypes,
                sort: JSON.parse(req.body.sort) || Default.Sort
            }
            let content:any = await all(token.access_token,configuration,filter);
            res.send(content);
        } else {
            res.sendStatus(403);
        }
    });
}

export async function all(token:any,configuration:Configuration,filter:ISearchFilter):Promise<any>{
    initialize(sp,configuration,token);
    let spContents = await search(filter);
    let contents = await parse(spContents,configuration);
    return contents;
}

export default router;
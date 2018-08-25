import { SPRest } from "@pnp/sp";
import { Configuration } from "../../model/Configuration";
import { FetchClient } from "./fetchclient";
import * as node_fetch_1 from "node-fetch";
var __global:any = global;
__global.Headers = node_fetch_1.Headers;
__global.Request = node_fetch_1.Request;


export function initialize(sp:SPRest,configuration:Configuration,token:string){
    sp.setup({
        sp: {
            baseUrl: `${configuration.resources.sharepoint}`,
            headers: {
                "Accept": "application/json;odata=verbose",
                "Authorization": `Bearer ${token}`
            },
            fetchClientFactory: () => new FetchClient(`${configuration.resources.sharepoint}`,token)
        }
    });       
}
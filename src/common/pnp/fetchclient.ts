declare var global: any;
declare var require: (path: string) => any;
const nodeFetch = require("node-fetch").default;


const u: any = require("url");
import { HttpClientImpl, combinePaths, isUrlAbsolute } from "@pnp/common";


/**
 * Fetch client for use within nodejs assuming that an authorization bearer is passed
 */
export class FetchClient implements HttpClientImpl {

    private static SharePointServicePrincipal = "00000003-0000-0ff1-ce00-000000000000";

    constructor(public siteUrl: string, private token: any) {
        this.siteUrl=siteUrl;
        this.token = token;
    }

    public fetch(url: string, options: any): Promise<Response> {

        if (!isUrlAbsolute(url)) {
            url = combinePaths(this.siteUrl, url);
        }

        options.headers.set("Authorization", `Bearer ${this.token.access_token}`);
        return nodeFetch(url, options);
    }
}
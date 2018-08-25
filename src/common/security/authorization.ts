import { Configuration } from "../../model/Configuration";
import * as superagent from 'superagent';

export async function acquireTokenOnBehalfOf(token:string,configuration:Configuration):Promise<any>{
    let response = await superagent.post(configuration.authority + '/' + configuration.tenant + '/oauth2/token')
        .send({
            grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',
            client_id:configuration.clientId,
            client_secret:configuration.secretId,
            assertion:token,
            resource:configuration.resources.sharepoint,
            requested_token_use:'on_behalf_of'
        })
        .set('Content-Type','application/x-www-form-urlencoded')

    return JSON.parse(response.text);
}
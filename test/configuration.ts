import {Chromeless} from 'chromeless';

let token:string = undefined;

// Client id and secret id must be obtained when creating the app registration in Azure AD
// public key get from the https://login.microsoftonline.com/common/discovery/keys
export let configuration = {
    authority:'https://login.microsoftonline.com',
    tenant:'<your tenant>',
    clientId:'<your client id>',
    secretId:'<your secret id>',
    publicKey:'MIIDBTCCAe2gAwIBAgIQE7nbxEiAlqhFdKnsKV+nuTANBgkqhkiG9w0BAQsFADAtMSswKQYDVQQDEyJhY2NvdW50cy5hY2Nlc3Njb250cm9sLndpbmRvd3MubmV0MB4XDTE4MDYyMTAwMDAwMFoXDTIwMDYyMTAwMDAwMFowLTErMCkGA1UEAxMiYWNjb3VudHMuYWNjZXNzY29udHJvbC53aW5kb3dzLm5ldDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAL1cxvfI3wPu1HFGZL6wnSHfcqX6DlvezLF1wbqUs6/DS5GhxtvHk6+9nKyNuCjznkEKql6bTIgnUbvTPr0UUKa3hezq/D9nkGu4qX8LVONVWkb53mjnN45lnVfOLh6VQ7J8/9Ut/ybbnhcn2a12vWiR0c6899TgtRp+i0bkT9dYl+3/wfP8+bBqmolwno7yojv/DxMz86mzhS7lW6mS9zzYtdsy6IHcF2P9XIac2TaP0efUpLrQY81wuTE3gUh2s6j7tqNH7aKK2PNAuxXtyGtZ9r+bg0gMrDXXVKJylQO9m4Z5J0vuz8xgCElLg3uJPOI8q/j0YrLe5rHy67ACg0MCAwEAAaMhMB8wHQYDVR0OBBYEFDnSNW3pMmrshl3iBAS4OSLCu/7GMA0GCSqGSIb3DQEBCwUAA4IBAQAFs3C5sfXSfoi7ea62flYEukqyVMhrDrpxRlvIuXqL11g8KEXlk8pS8gEnRtU6NBeHhMrhYSuiqj7/2jUT1BR3zJ2bChEyEpIgOFaiTUxq6tXdpWi/M7ibf8O/1sUtjgYktwJlSL6FEVAMFH82TxCoTWp2g5i2lmZQ7KxiKhG+Vl9nw1bPX57hkWWhR7Hpes0MbpGNZI2IEpZSjNG1IWPPOBcaOh4ed2WBQcLcaTuAaELlaxanQaC0B3029To80MnzpZuadaul3+jN7JQg0MpHdJJ8GMHAWe/IjXc0evJNhVUcKON41hzTu0R+Sze7xq1zGljQihJgcNpO9oReBUsX',
    resources: {
        sharepoint:'https://<your tenant>.sharepoint.com',
        graph:''
    }            
};

// Open chrome and generate a valid id_token based on a valid username and password
export function getToken():Promise<string>{
    if (token) return Promise.resolve(token);
    
    return new Promise<string>(async (resolve,reject)=>{
        const browser = new Chromeless();
        const url = await browser
            .goto(`https://login.microsoftonline.com/${configuration.tenant}/oauth2/authorize?response_type=id_token&client_id=${configuration.clientId}&redirect_uri=${configuration.resources.sharepoint}/sites/togo/SitePages/Home.aspx&nonce=12345-6789`)
            .type(`<your username>@${configuration.tenant}`,'input[name="loginfmt"]')
            .click('#idSIButton9')
            .wait('input[name="passwd"]',10000)
            .type(`<your password>`,'input[name="passwd"]')
            .click('#idSIButton9')
            .wait('#displayName',10000)
            .click('#idSIButton9')
            .wait(5000)
            .evaluate(()=>{
                return document.location.href;
            })
            .end();
        const regex = /.*id_token=(.*)&.*/gm;
        token = regex.exec(url)[1];
        resolve(token);
    });
}
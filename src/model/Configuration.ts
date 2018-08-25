export interface Configuration {
    authority:string;
    tenant:string;
    clientId:string;
    secretId:string;
    publicKey:string;
    resources: {
        sharepoint:string;
        graph:string;
    }
}
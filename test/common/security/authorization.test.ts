import * as authorization from '../../../src/common/security/authorization';
import {getToken,configuration} from '../../configuration';

describe('Given that I have an id_token', async ()=>{
    let token:string = await getToken();
    it('then I could get an application token on behalf of a user', async ()=> {
        
        //Generate an id_token for a given user using chromeless

        //Generate a token on behalf of based on the id_token generated in the previous step
        let appToken = await authorization.acquireTokenOnBehalfOf(token,configuration);

        console.log("===================== TOKEN ========================");
        console.log(JSON.stringify(appToken));
        console.log("===================== TOKEN ========================");
    });
});
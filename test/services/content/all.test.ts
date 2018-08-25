import { acquireTokenOnBehalfOf } from '../../../src/common/security/authorization';
import {getToken,configuration} from '../../configuration';
import { SortDirection } from '@pnp/sp';
import { all } from '../../../src/content/content-services';

describe('services.content.latest', ()=>{
    it('should return a list of latest contents', async ()=>{
        let token = await getToken();
        let sptoken = await acquireTokenOnBehalfOf(token,configuration)
        let content = await all(sptoken,configuration,{ 
            contentTypes:['News'],
            sort:[{Property:'LastModifiedTime',Direction:SortDirection.Descending}]
        });
        console.log("===================== CONTENT ========================");
        console.log(JSON.stringify(content));
        console.log("===================== CONTENT ========================");
    })
})
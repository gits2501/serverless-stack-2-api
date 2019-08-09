import uuid from "uuid";
import * as dynomoDbLib from './libs/dynamodb-lib';
import { success , failure } from './libs/response-lib';


// Lambda
export async function main (event, context /*callback*/){

    const data = JSON.parse(event.body);// body of the http request a JSON string from event.body

    const params = {                 // parameters for one item (row) we are inserting into a DynomoDb table named "notes"

         TableName: "notes",
         Item:{                     // Item attributes

            userId: event.requestContext.identity.cognitoIdentityId,// comes as part of the request - to AUTHORIZE user access to DynamoDb
                                                                     // (after user has been AUTHENTICATE-d  -signed in- via Cognito User Pool )
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createAt: Date.now()

         }

    };

    try{
        await dynomoDbLib.call("put", params);
        return success(params.Item); // serverless-stack exemple quide doesn't use callback provided by the Lamba execution environment (but i think it should)
    }
    catch(e){
       //console.log(e)

       return failure({status: false});

    }
}
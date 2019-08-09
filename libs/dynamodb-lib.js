import AWS from "aws-sdk";

AWS.config.update({region:"eu-central-1"});            // Region for our AWS resources manipulation

export function call(action, params) {

  // Alows the use of native JS types instead of AttributeValues. (converts JS types to DynamoDB AttributeValues and back)
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();            // exp: dynamoDb.put(params, (error, data)=>{})
}

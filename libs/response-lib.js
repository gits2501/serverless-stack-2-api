export function success(body) {    // succssesfull response
  return buildResponse(200, body);
}

export function failure(body) {    // error
  return buildResponse(500, body);
}

function buildResponse(statusCode, body) {  // response builder
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  };
}

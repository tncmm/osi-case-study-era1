export enum HttpCodes {
    //successfull
    Ok = 200,
    Created = 201,
    Accepted = 202,
  
    //client errors
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    TooManyRequests = 429,
  
    //internal errors
    InternalServerError = 500,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
  }
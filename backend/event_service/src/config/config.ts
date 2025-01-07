import { env } from "process";

export const config = {
    port: 3002,
    log_level: 'debug',
    tokenExpireDurationInMinutes: 10_080, 
    jwt_private_key: env.JWT_PRIVATE_KEY || "osi-case-study-jwt-private-key",
    
  }
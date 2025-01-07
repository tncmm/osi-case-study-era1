import { env } from "process";

export const config = {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3002,
    log_level: process.env.LOG_LEVEL || 'info',
    tokenExpireDurationInMinutes: process.env.TOKEN_EXPIRE_DURATION_IN_MINUTES ? parseInt(process.env.TOKEN_EXPIRE_DURATION_IN_MINUTES) : 60,
    jwt_private_key: process.env.JWT_PRIVATE_KEY || 'your-256-bit-secret',
    auth_service_url: process.env.AUTH_SERVICE_URL || 'https://osi-case-study-era1-1-auth.onrender.com'
};
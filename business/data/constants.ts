import dotenv from 'dotenv'

export const env = process.env.PORTAL_ENV  || 'test';

dotenv.config({ path: `.env.${env}` });

export const URL = process.env.URL || 'URL NOT PROVIDED';

export const CREDENTIALS = {

    VALID: {
        USERNAME: process.env.USERNAME || 'USERNAME NOT PROVIDED',
        PASSWORD: process.env.PASSWORD || 'PASSWORD NOT PROVIDED'
    },

    INVALID: {
        USERNAME: 'invalidUser',
        PASSWORD: 'invalidPassword'
    },
    
} 
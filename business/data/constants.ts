import dotenv from 'dotenv'

export const env = process.env.PORTAL_ENV  || 'test';

//By Terminal `./.env.${env}`
//By Test Extension `../.env.${env}`
dotenv.config({ path: `./.env.${env}` });

export const URLS = {
    LOGIN: process.env.LOGIN_URL || 'LOGIN URL NOT PROVIDED',
    PORTAL: process.env.PORTAL_URL || 'PORTAL URL NOT PROVIDED',
    LAUNCHES: process.env.LAUNCHES_URL || 'LAUNCHES URL NOT PROVIDED'
}

export const CREDENTIALS = {

    VALID: {
        USERNAME: process.env.USERNAME || 'USERNAME NOT PROVIDED',
        PASSWORD: process.env.PASSWORD || 'PASSWORD NOT PROVIDED'
    },

    INVALID: {
        USERNAME: 'invalidUser',
        PASSWORD: 'invalidPassword'
    },
    
};

export const LOGIN_EXPECTATIONS = {
    BAD_CREDENTIALS: `An error occurred while connecting to server: You do not have enough permissions. Bad credentials`
}
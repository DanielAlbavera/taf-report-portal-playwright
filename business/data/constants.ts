import dotenv from 'dotenv'

export const env = process.env.PORTAL_ENV || 'test';

//By Terminal `./.env.${env}`
//By Test Extension `../.env.${env}`
dotenv.config({ path: `./.env.${env}` });

export const URLS = {
    LOGIN: process.env.LOGIN_URL || 'LOGIN URL NOT PROVIDED',
    PORTAL: process.env.PORTAL_URL || 'PORTAL URL NOT PROVIDED',
    BASE_API: process.env.API_URL || 'API URL NOT PROVIDED'
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

export const LAUNCHES_DATA = {
    BEARER_TOKEN: process.env.BEARER_TOKEN || 'BEARER TOKEN NOT PROVIDED',
    UUID: process.env.UUID || 'UUID NOT PROVIDED',
    LAUNCH: process.env.LAUNCH || 'LAUNCH NOT PROVIDED',
    PROJECT: process.env.PROJECT || 'PROJECT NOT PROVIDED',
    INVALID_PROJECT_NAME: 'Invalid_project_name',
    POST_LAUNCH_DATA: {
        "attributes": [
            {
                "key": "name",
                "system": true,
                "value": "test"
            }
        ],
        "description": "Test Launch",
        "mode": "DEFAULT",
        "name": "testLaunch",
        "rerun": false,
        "rerunOf": "off",
        "startTime": "2023-05-17T18:43:43.929Z"
    },
    POST_EMPTY_DATA: {},
    PUT_STATUS: 'IN_PROGRESS',
    PUT_INVALID_ID: 0,
    PUT_LAUNCH_DATA: {
        "endTime": "2023-05-18T18:54:08.574Z",
        "status": "STOPPED"
      },
      DELETE_INVALID_ID: 0
}

export const EXPECTED_LAUNCHES_API_RESPONSES = {
    CONTENT_TYPE: 'application/json',
    TOTAL: 5,
    VALID_RESPONSES: {
        GET: {
            CODE: 200
        },
        POST: {
            CODE: 201
        },
        PUT: {
            CODE: 200
        },
        DELETE: {
            CODE: 200
        }
    },
    ERRORS: {
        GET: {
            CODE: 403,
            DETAILS: {
                "errorCode": 4003,
                "message": "You do not have enough permissions. Please check the list of your available projects."
            }
        },
        POST: {
            CODE: 403,
            DETAILS: {
                "errorCode": 4003,
                "message": "You do not have enough permissions."
              }
        },
        PUT: {
            CODE: 404,
            DETAILS: {
                "errorCode": 4041,
                "message": "Launch '0' not found. Did you use correct Launch ID?"
              }
        },
        DELETE: {
            CODE: 404,
            DETAILS: {
                "errorCode": 4041,
                "message": "Launch '0' not found. Did you use correct Launch ID?"
              }
        },
        BAD_REQUEST: {
            CODE: 400,
            DETAILS: {
                "errorCode": 4001,
                "message": "Incorrect Request. [Field 'name' should not be null.] [Field 'startTime' should not be null.] "
              }
        },
        INCORRECT_REQUEST: {
            CODE: 400,
            DETAILS: {
                "errorCode": 4001,
                "message": "Incorrect Request. [Field 'startTime' should not be null.] [Field 'name' should not be null.] "
              }
        }
    }
}
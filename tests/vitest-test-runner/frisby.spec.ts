import { describe, beforeAll, afterAll, test, expect  } from 'vitest';
import frisbyLaunchService from '../../business/api/services/frisby-launch.service';
import { env, LAUNCHES_DATA, EXPECTED_LAUNCHES_API_RESPONSES } from '../../business/data/constants';
import { logger } from '../../utilities/logger';
import { getLaunchesDataSets } from '../../utilities/json-reader';

describe('Launch API Validations', () => {

    let launches: [];
    let launch_id: number;

    let json: object;
    let symbols: object;
    let headerSymbol: string;
    let headers: object;
    let headerSymbols: object;
    let contentSymbol: string;
    let content: object;
    let status: number;

    beforeAll( async () => {
        logger.info(`Testing on [${env}] environment`);
    });

    afterAll( async () => {
        logger.info(`Tests finalized`);
    });

    test('GET should list all launches by project name', async () => {
        const response = await frisbyLaunchService.getLaunches(LAUNCHES_DATA.PROJECT);
        initializeVariables(response);
        launches = response['_json']['content'];
        expect(status).toBe(EXPECTED_LAUNCHES_API_RESPONSES.VALID_RESPONSES.GET.CODE);
        expect(content).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        //Reversing data-Sets because API Response is also reversed
        const expectedLaunchesData = getLaunchesDataSets().reverse();
        for (let index = 0; index < launches.length; index++) {
            let launchDataSet = expectedLaunchesData[index];
            let launch = launches[index];
            expect(launchDataSet['name']).toContain(launch['name']);
            expect(launchDataSet['owner']).toBe(launch['owner']);
            expect(launchDataSet['results']['total']).toBe(launch['statistics']['executions']['total']);
        }
    });

    test('GET should NOT get launches list by invalid project name', async () => {
        const response = await frisbyLaunchService.getLaunches(LAUNCHES_DATA.INVALID_PROJECT_NAME);
        expect(response['_json']).toEqual(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.GET.DETAILS);
    });

    test('POST should create a new launch', async () => {
        const response = await frisbyLaunchService.postLaunch(LAUNCHES_DATA.PROJECT, LAUNCHES_DATA.POST_LAUNCH_DATA);
        initializeVariables(response);
        expect(content).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        expect(status).toBe(EXPECTED_LAUNCHES_API_RESPONSES.VALID_RESPONSES.POST.CODE);
    });

    test('POST should NOT create a new launch by invalid project name', async () => {
        const response = await frisbyLaunchService.postLaunch(LAUNCHES_DATA.INVALID_PROJECT_NAME, LAUNCHES_DATA.POST_LAUNCH_DATA);
        initializeVariables(response);
        expect(content).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        expect(status).toBe(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.POST.CODE);
    });

    test('POST should NOT create a new launch by empty payload', async () => {
        const response = await frisbyLaunchService.postLaunch(LAUNCHES_DATA.PROJECT, LAUNCHES_DATA.POST_EMPTY_DATA);
        initializeVariables(response);
        expect(content).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        expect(status).toBe(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.INCORRECT_REQUEST.CODE);
    });

    test('PUT should stop a launch by valid launchId', async () => {
        const runningLaunches = await frisbyLaunchService.getLaunchesByStatus(LAUNCHES_DATA.PROJECT, LAUNCHES_DATA.PUT_STATUS);
        launch_id = runningLaunches['_json']['content'][0]['id'];
        const response = await frisbyLaunchService.putStopLaunch(LAUNCHES_DATA.PROJECT, launch_id, LAUNCHES_DATA.PUT_LAUNCH_DATA);
        initializeVariables(response);              
        expect(content).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        expect(status).toBe(EXPECTED_LAUNCHES_API_RESPONSES.VALID_RESPONSES.PUT.CODE);
        expect(response['_json']['message']).toBe(`Launch with ID = '${launch_id}' successfully stopped.`);
    });

    test('PUT should NOT stop a launch by invalid project name', async () => {
        const response = await frisbyLaunchService.putStopLaunch(LAUNCHES_DATA.INVALID_PROJECT_NAME, launch_id, LAUNCHES_DATA.PUT_LAUNCH_DATA);
        initializeVariables(response);               
        expect(content).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        expect(status).toBe(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.POST.CODE);
        expect(response['_json']).toEqual(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.POST.DETAILS);
    });

    test('PUT should NOT stop a launch by invalid launch id', async () => {
        const response = await frisbyLaunchService.putStopLaunch(LAUNCHES_DATA.PROJECT, LAUNCHES_DATA.PUT_INVALID_ID, LAUNCHES_DATA.PUT_LAUNCH_DATA);
        initializeVariables(response);               
        expect(content).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        expect(status).toBe(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.PUT.CODE);
        expect(response['_json']).toEqual(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.PUT.DETAILS);
    });

    test('DELETE should delete a launch by valid launchId', async () => {
        const response = await frisbyLaunchService.deleteLaunch(LAUNCHES_DATA.PROJECT, launch_id);
        initializeVariables(response);             
        expect(content).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        expect(status).toBe(EXPECTED_LAUNCHES_API_RESPONSES.VALID_RESPONSES.DELETE.CODE);
        expect(response['_json']['message']).toBe(`Launch with ID = '${launch_id}' successfully deleted.`);
    });

    test('DELETE should NOT delete a launch by invalid launchId', async () => {
        const response = await frisbyLaunchService.deleteLaunch(LAUNCHES_DATA.PROJECT, LAUNCHES_DATA.DELETE_INVALID_ID);
        initializeVariables(response);
        expect(content).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        expect(status).toBe(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.DELETE.CODE);
        expect(response['_json']).toEqual(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.DELETE.DETAILS);
    });

    function initializeVariables(response: Object) {
        json = response['_response'];
        symbols = Object.getOwnPropertySymbols(json);
        headerSymbol = symbols[1];
        headers = json[headerSymbol];
        headerSymbols = Object.getOwnPropertySymbols(headers['headers']);
        contentSymbol = headerSymbols[0];
        content = headers['headers'][contentSymbol]['content-type'][0];
        status = headers['status'];   
    }

});



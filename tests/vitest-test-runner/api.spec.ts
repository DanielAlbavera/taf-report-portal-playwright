import { describe, beforeAll, afterAll, test, expect  } from 'vitest';
import axiosLaunchService from '../../business/api/services/axios-launch.service';
import { env, LAUNCHES_DATA, EXPECTED_LAUNCHES_API_RESPONSES } from '../../business/data/constants';
import { logger } from '../../utilities/logger';
import { getLaunchesDataSets } from '../../utilities/json-reader';

describe('Launch API Validations', () => {

    let launches: launch[];
    let launch_id: number;

    beforeAll( async () => {
        logger.info(`Testing on [${env}] environment`);
    });

    afterAll( async () => {
        logger.info(`Tests finalized`);
    });

    test('GET should list all launches by project name', async () => {
        const response: launchResponse = await axiosLaunchService.getLaunches(LAUNCHES_DATA.PROJECT);
        launches = response['data']['content'];
        expect(response['status']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.VALID_RESPONSES.GET.CODE);
        expect(response['headers']['content-type']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        expect(launches.length).toBe(EXPECTED_LAUNCHES_API_RESPONSES.TOTAL);
        // Reversing data-Sets because API Response is also reversed
        const expectedLaunchesData = getLaunchesDataSets().reverse();
        for (let index=0; index < launches.length; index++) {
            let launchDataSet = expectedLaunchesData[index];
            let launch = launches[index];
            expect(launchDataSet['name']).toContain(launch['name']);
            expect(launchDataSet['owner']).toBe(launch['owner']);
            expect(launchDataSet['results']['total']).toBe(launch['statistics']['executions']['total']);
        }
    });

    test('GET should NOT get launches list by invalid project name', async () => {
        const response: launchResponse = await axiosLaunchService.getLaunches(LAUNCHES_DATA.INVALID_PROJECT_NAME);
        expect(response['headers']['content-type']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        expect(response['status']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.GET.CODE);
        expect(response['data']).toEqual(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.GET.DETAILS);
    });

    test('POST should create a new launch', async () => {
        const response = await axiosLaunchService.postLaunch(LAUNCHES_DATA.PROJECT, LAUNCHES_DATA.POST_LAUNCH_DATA);
        expect(response['headers']['content-type']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        expect(response['status']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.VALID_RESPONSES.POST.CODE);
    });

    test('POST should NOT create a new launch by invalid project name', async () => {
        const response = await axiosLaunchService.postLaunch(LAUNCHES_DATA.INVALID_PROJECT_NAME, LAUNCHES_DATA.POST_LAUNCH_DATA);
        expect(response['headers']['content-type']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        expect(response['status']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.POST.CODE);
    });

    test('POST should NOT create a new launch by empty payload', async () => {
        const response = await axiosLaunchService.postLaunch(LAUNCHES_DATA.PROJECT, LAUNCHES_DATA.POST_EMPTY_DATA);
        expect(response['headers']['content-type']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        expect(response['status']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.INCORRECT_REQUEST.CODE);
    });

    test('PUT should stop a launch by valid launchId', async () => {
        const runningLaunches: launchResponse = await axiosLaunchService.getLaunchesByStatus(LAUNCHES_DATA.PROJECT, LAUNCHES_DATA.PUT_STATUS);
        launch_id = runningLaunches['data']['content'][0]['id'];
        const response = await axiosLaunchService.putStopLaunch(LAUNCHES_DATA.PROJECT, launch_id, LAUNCHES_DATA.PUT_LAUNCH_DATA);                
        expect(response['headers']['content-type']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        expect(response['status']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.VALID_RESPONSES.PUT.CODE);
        expect(response['data']['message']).toBe(`Launch with ID = '${launch_id}' successfully stopped.`);
    });

    test('PUT should NOT stop a launch by invalid project name', async () => {
        const response = await axiosLaunchService.putStopLaunch(LAUNCHES_DATA.INVALID_PROJECT_NAME, launch_id, LAUNCHES_DATA.PUT_LAUNCH_DATA);                
        expect(response['headers']['content-type']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        expect(response['status']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.POST.CODE);
        expect(response['data']).toEqual(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.POST.DETAILS);
    });

    test('PUT should NOT stop a launch by invalid launch id', async () => {
        const response = await axiosLaunchService.putStopLaunch(LAUNCHES_DATA.PROJECT, LAUNCHES_DATA.PUT_INVALID_ID, LAUNCHES_DATA.PUT_LAUNCH_DATA);                
        expect(response['headers']['content-type']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        expect(response['status']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.PUT.CODE);
        expect(response['data']).toEqual(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.PUT.DETAILS);
    });

    test('DELETE should delete a launch by valid launchId', async () => {
        const response = await axiosLaunchService.deleteLaunch(LAUNCHES_DATA.PROJECT, launch_id);                
        expect(response['headers']['content-type']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        expect(response['status']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.VALID_RESPONSES.DELETE.CODE);
        expect(response['data']['message']).toBe(`Launch with ID = '${launch_id}' successfully deleted.`);
    });

    test('DELETE should NOT delete a launch by invalid launchId', async () => {
        const response = await axiosLaunchService.deleteLaunch(LAUNCHES_DATA.PROJECT, LAUNCHES_DATA.DELETE_INVALID_ID);                
        expect(response['headers']['content-type']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.CONTENT_TYPE);
        expect(response['status']).toBe(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.DELETE.CODE);
        expect(response['data']).toEqual(EXPECTED_LAUNCHES_API_RESPONSES.ERRORS.DELETE.DETAILS);
    });

});

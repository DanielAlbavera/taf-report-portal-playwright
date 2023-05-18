import { AxiosHTTPClient } from "../clients/axios";
import { URLS } from "../../data/constants";

class LaunchService extends AxiosHTTPClient {

    constructor() {
        super({ baseURL: URLS.BASE_API });
    }

    public async getLaunches(projectName: string) {
        const endpoint = `/v1/${projectName}/launch`;
        return await super.get(endpoint);
    }

    public async getLaunchesByStatus(projectName: string, status: string) {
        const endpoint = `/v1/${projectName}/launch?filter.eq.status=${status}`;
        return await super.get(endpoint);
    }

    public async postLaunch(projectName: string, data: Object) {
        const endpoint = `/v1/${projectName}/launch`;
        return await super.post(endpoint, data);
    }

    public async putStopLaunch(projectName: string, launchId: number, data: Object) {
        const endpoint = `/v1/${projectName}/launch/${launchId}/stop`;
        return await super.put(endpoint, data);
    }

    public async deleteLaunch(projectName: string, launchId: number) {
        const endpoint = `v1/${projectName}/launch/${launchId}`;
        return await super.delete(endpoint);
    }

}

export default new LaunchService();
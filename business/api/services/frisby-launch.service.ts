import { FrisbyHTTPClient } from "../clients/frisby";
import { URLS } from "../../data/constants";

class LaunchService extends FrisbyHTTPClient {

    public async getLaunches(projectName: string) {
        const url = `${URLS.BASE_API}/v1/${projectName}/launch`;
        this.setUrl(url);
        return await this.client.get(url);
    }

    public async getLaunchesByStatus(projectName: string, status: string) {
        const url = `${URLS.BASE_API}/v1/${projectName}/launch?filter.eq.status=${status}`;
        this.setUrl(url);
        return await this.client.get(url);
    }

    public async postLaunch(projectName: string, data: Object) {
        const url = `${URLS.BASE_API}/v1/${projectName}/launch`;
        this.setUrl(url);
        return await this.client.post(url, data);
    }

    public async putStopLaunch(projectName: string, launchId: number, data: Object) {
        const url = `${URLS.BASE_API}/v1/${projectName}/launch/${launchId}/stop`;
        this.setUrl(url);
        return await this.client.put(url, data);
    }

    public async deleteLaunch(projectName: string, launchId: number) {
        const url = `${URLS.BASE_API}v1/${projectName}/launch/${launchId}`;
        this.setUrl(url);
        return await this.client.delete(url);
    }

}

export default new LaunchService();
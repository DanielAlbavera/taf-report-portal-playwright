import frisby from 'frisby';
import { LAUNCHES_DATA } from '../../data/constants';

export class FrisbyHTTPClient {

    protected client: any;
    protected url: string;

    public constructor() {
        this.client = frisby;
        this.setup();
    }

    protected setup() {
        this.client.globalSetup({
            request: {
                headers: {
                    "accept" : "*/*",
                    "Authorization" : `bearer ${LAUNCHES_DATA.BEARER_TOKEN}`
                }
            }
        });
    }

    protected setUrl(newUrl: string) {
        this.url = newUrl;
    }

    protected async get(endpoint: string) {
        return this.client.get(this.url+endpoint);
    }

    protected async post(endpoint: string, data: Object) {
        return this.client.post(this.url+endpoint, data);
    }

    protected async put(endpoint: string, data: Object) {
        return this.client.put(this.url+endpoint, data);
    }

    protected async delete(endpoint: string) {
        return this.client.del(this.url+endpoint);
    }


}
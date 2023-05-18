import axios, { AxiosRequestConfig } from 'axios';
import { URLS, LAUNCHES_DATA } from '../../data/constants';
import _ from "lodash";


export class AxiosHTTPClient {
    protected defaultConfig: AxiosRequestConfig;

    public constructor(protected readonly axiosConfig?: AxiosRequestConfig) {
        this.defaultConfig = {
            baseURL: URLS.BASE_API,
            headers: {
                "accept" : "*/*",
                "Authorization" : `bearer ${LAUNCHES_DATA.BEARER_TOKEN}`,
            },
            ...axiosConfig
        }
    }

    protected async get(url: string, config?: AxiosRequestConfig) {
        return this.apiProcessor({...config, url, method: "GET"});
    }

    protected async post(url: string, data: object, config?: AxiosRequestConfig) {
        return this.apiProcessor({...config, data, url, method: "POST"});
    }

    protected async patch(url: string, data: object, config?: AxiosRequestConfig) {
        return this.apiProcessor({...config, data, url, method: "PATCH"}); 
    }

    protected async put(url: string, data: object, config?: AxiosRequestConfig) {
        return this.apiProcessor({...config, data, url, method: "PUT"}); 
    }

    protected async delete(url: string, config?: AxiosRequestConfig) {
        return this.apiProcessor({...config, url, method: "DELETE"});
    }

    private async apiProcessor(config: AxiosRequestConfig) {
        const axiosConfig: AxiosRequestConfig = _.merge({}, this.defaultConfig, config);
        try {
            const instance = axios.create({
                validateStatus(status) {
                    return status >= 200 && status <= 503;
                },
            });
            return instance.request(axiosConfig);
        } catch (error: any) {
            return error.response ? error.response : error;
        }
    }    
 
}
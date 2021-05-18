import { TrendingParams } from "./params";
import { PagingResponse, TenorError } from "./types";

// Hack to define a fetch function.
const fetchFunc: typeof fetch = (() => {
    try {
        return fetch !== undefined ? fetch : require("node-fetch");
    } catch (_) {
        // We need a try catch here because jest is terrible.
        return require("node-fetch");
    }
})();

export interface ClientOptions {
    apiKey?: string;
}

interface StandardParams {
    key?: string;
}

export class TenorClient {
    private apiKey?: string;

    public constructor(options: ClientOptions) {
        this.apiKey = options.apiKey;
    }

    public fetchTrending(params: TrendingParams = {}): Promise<PagingResponse> {
        return this.makeRequest("trending", params);
    }

    // TODO: Make endpoint a string union.
    private async makeRequest<T, P>(endpoint: string, params: P): Promise<T> {
        const queryParams = {
            ...this.standardParams,
            ...params,
        };
        const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");

        const response = await fetchFunc(`https://g.tenor.com/v1/${endpoint}?${queryString}`);
        const data: T | { code?: number; error: string } = await response.json();

        if ("error" in data) {
            throw new TenorError(data);
        } else {
            return data;
        }
    }

    private get standardParams(): StandardParams {
        return {
            key: this.apiKey,
        };
    }
}

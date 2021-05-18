import {
    AutoCompleteParams,
    CategoriesParams,
    GifsParams,
    RandomParams,
    RegisterShareParams,
    SearchSuggestionsParams,
    TrendingParams,
    TrendingTermsParams,
} from "./params";
import { CategoriesResponse, CategoryObject, PagingResponse, StringListResponse, TenorError } from "./types";

// Hack to define a fetch function.
const fetchFunc: typeof fetch = (() => {
    try {
        return fetch !== undefined ? fetch : require("node-fetch");
    } catch (_) {
        // We need a try catch here because jest is terrible.
        return require("node-fetch");
    }
})();

export interface StandardParams {
    key?: string;
    locale?: string;
}

type Endpoints =
    | "trending"
    | "categories"
    | "search_suggestions"
    | "autocomplete"
    | "trending_terms"
    | "registershare"
    | "gifs"
    | "random"
    | "anonid";

export class TenorClient {
    private standardParams: StandardParams;

    public constructor(standardParams: StandardParams = {}) {
        this.standardParams = standardParams;
    }

    public fetchTrending(params: TrendingParams = {}): Promise<PagingResponse> {
        return this.makeRequest("trending", params);
    }

    public async fetchCategories(params: CategoriesParams = {}): Promise<CategoryObject[]> {
        const res: CategoriesResponse = await this.makeRequest("categories", params);
        return res.tags;
    }

    public async fetchSearchSuggestions(params: SearchSuggestionsParams): Promise<string[]> {
        const res: StringListResponse = await this.makeRequest("search_suggestions", params);
        return res.results;
    }

    public async fetchAutoComplete(params: AutoCompleteParams): Promise<string[]> {
        const res: StringListResponse = await this.makeRequest("autocomplete", params);
        return res.results;
    }

    public async fetchTrendingTerms(params: TrendingTermsParams = {}): Promise<string[]> {
        const res: StringListResponse = await this.makeRequest("trending_terms", params);
        return res.results;
    }

    public async fetchRegisterShare(params: RegisterShareParams): Promise<void> {
        // We don't need to worry about the return type because the only response we can get is
        // a string of "ok" if the request worked.
        await this.makeRequest("registershare", params);
    }

    public fetchGifs(ids: string[], params: GifsParams = {}): Promise<PagingResponse> {
        return this.makeRequest("gifs", {
            ids: ids.join(","),
            ...params,
        });
    }

    public fetchRandom(params: RandomParams): Promise<PagingResponse> {
        return this.makeRequest("random", params);
    }

    public async fetchAnonId(): Promise<string> {
        const res: { anon_id: string } = await this.makeRequest("anonid", {});
        return res.anon_id;
    }

    private async makeRequest<T, P>(endpoint: Endpoints, params: P): Promise<T> {
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
}

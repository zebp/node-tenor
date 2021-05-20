export interface ParamsWithAnonId {
    /**
     * Specify the anonymous_id tied to the given user.
     */
    anon_id?: string;
}

export interface ParamsWithLimit {
    /**
     * Fetch up to a specified number of results (max: 50).
     */
    limit?: number;
}

export interface ParamsWithContentFilter {
    /**
     * Specify the content safety filter level.
     */
    contentfilter?: "off" | "low" | "medium" | "high";
}

export interface ParamsWithRequiredSearchString {
    /**
     * A search string.
     */
    q: string;
}

export interface ParamsWithPaging {
    /**
     * Reduce the Number of GIF formats returned in the GIF_OBJECT list.
     *
     * minimal - tinygif, gif, and mp4.
     * basic - nanomp4, tinygif, tinymp4, gif, mp4, and nanogif
     */
    media_filter?: "basic" | "minimal";
    /**
     * Filter the response GIF_OBJECT list to only include GIFs with aspect ratios that fit with in the selected range.
     *
     * all - no constraints
     * wide - 0.42 <= aspect ratio <= 2.36
     * standard - .56 <= aspect ratio <= 1.78
     */
    ar_range?: "all" | "wide" | "standard";
    /**
     * Get results starting at position "value". Use a non-zero "next" value returned by API
     * results to get the next set of results. pos is not an index and may be an integer, float,
     * or string
     */
    pos?: string;
}

export type SearchParams = ParamsWithAnonId &
    ParamsWithLimit &
    ParamsWithContentFilter &
    ParamsWithPaging &
    ParamsWithRequiredSearchString;

export type TrendingParams = ParamsWithAnonId & ParamsWithLimit & ParamsWithContentFilter & ParamsWithPaging;

export type SearchSuggestionsParams = ParamsWithAnonId & ParamsWithLimit & ParamsWithRequiredSearchString;

export type AutoCompleteParams = ParamsWithAnonId & ParamsWithLimit & ParamsWithRequiredSearchString;

export type TrendingTermsParams = ParamsWithAnonId & ParamsWithLimit;

export type GifsParams = ParamsWithAnonId & ParamsWithLimit & ParamsWithContentFilter & ParamsWithPaging;

export type RandomParams = ParamsWithAnonId &
    ParamsWithLimit &
    ParamsWithContentFilter &
    ParamsWithPaging &
    ParamsWithRequiredSearchString;

export interface RegisterShareParams extends ParamsWithAnonId {
    /**
     * The id of a {@link GifObject}
     */
    id: string;
    /**
     *The search string that lead to this share
     */
    q?: string;
}

export interface CategoriesParams extends ParamsWithAnonId, ParamsWithContentFilter {
    /**
     * Determines the type of categories returned.
     */
    type?: "featured" | "emoji" | "trending";
}

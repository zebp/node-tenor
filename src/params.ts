export interface TrendingParams {
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
     * Specify the content safety filter level.
     */
    contentfilter?: "off" | "low" | "medium" | "high";
    /**
     * Fetch up to a specified number of results (max: 50).
     */
    limit?: number;
    /**
     * Get results starting at position "value". Use a non-zero "next" value returned by API
     * results to get the next set of results. pos is not an index and may be an integer, float,
     * or string
     */
    pos?: string;
    /**
     * Specify the anonymous_id tied to the given user.
     */
    anon_id?: string;
}

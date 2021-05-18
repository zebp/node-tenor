export interface PagingResponse {
    results: GifObject[];
    next?: string;
}

export type GifFormat =
    | "gif"
    | "mediumgif"
    | "tinygif"
    | "nanogif"
    | "mp4"
    | "loopedmp4"
    | "tinymp4"
    | "nanomp4"
    | "webm"
    | "tinywebm"
    | "nanowebm";

export interface GifObject {
    /**
     * A unix timestamp representing when this post was created.
     */
    created: number;
    /**
     * If this post contains audio (only video formats support audio, the gif image file format can
     * not contain audio information).
     */
    hasaudio: boolean;
    /**
     * Tenor result identifier.
     */
    id: string;
    /**
     * An array of dictionaries with {@link GifFormat} as the key and {@link MediaObject} as the value.
     */
    media: [Record<GifFormat, MediaObject>];
    /**
     * An array of tags for the post.
     */
    tags: string[];
    /**
     * The title of the post.
     */
    title: string;
    /**
     * The full URL to view the post on tenor.com.
     */
    itemurl: string;
    /**
     * If this post contains captions.
     */
    hascaption: boolean;
    /**
     * A short URL to view the post on tenor.com.
     */
    url: string;
}

export interface MediaObject {
    /**
     * A url to a preview image of the media source.
     */
    preview: string;
    /**
     * A url to the media source.
     */
    url: string;
    /**
     * Width and height in pixels.
     */
    dims: [number, number];
    /**
     * Size of file in bytes.
     */
    size: number;
}

export class TenorError extends Error {
    public readonly code?: number;
    public readonly error: string;

    public constructor({ code, error }: { code?: number; error: string }) {
        super(code !== undefined ? `[${code}] ${error}` : error);
        this.code = code;
        this.error = error;
    }
}

import { TenorClient } from "../src/index";

test("load trending gifs", async () => {
    const client = new TenorClient({ apiKey: process.env.TENOR_API_KEY });

    try {
        const res = await client.fetchTrending({ limit: 10 });
        expect(res.results).toHaveLength(10);
        expect(res.next).toBeDefined();
    } catch (error) {
        fail(error);
    }
});

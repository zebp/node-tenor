import { TenorClient } from "../src/index";

const client = new TenorClient({ key: process.env.TENOR_API_KEY });

test("trending gifs", async () => {
    const res = await client.fetchTrending({ limit: 10 });
    expect(res.results).toHaveLength(10);
    expect(res.next).toBeDefined();
});

test("categories", async () => {
    const categories = await client.fetchCategories();
    expect(Array.isArray(categories)).toBeTruthy();
});

test("search suggestions", async () => {
    const suggestions = await client.fetchSearchSuggestions({ q: "test" });
    expect(Array.isArray(suggestions)).toBeTruthy();
    suggestions.forEach((suggestion) => expect(typeof suggestion).toStrictEqual("string"));
});

test("auto complete", async () => {
    const autoCompleteItems = await client.fetchAutoComplete({ q: "test" });
    expect(Array.isArray(autoCompleteItems)).toBeTruthy();
    autoCompleteItems.forEach((item) => expect(typeof item).toStrictEqual("string"));
});

test("trending terms", async () => {
    const trendingTerms = await client.fetchTrendingTerms();
    expect(Array.isArray(trendingTerms)).toBeTruthy();
    trendingTerms.forEach((term) => expect(typeof term).toStrictEqual("string"));
});

test("register share", async () => {
    await client.fetchRegisterShare({ id: "14559695" });
});

test("gifs", async () => {
    const res = await client.fetchGifs(["14559695"]);
    expect(res.results).toHaveLength(1);
    expect(res.next).toBeDefined();
});

test("random", async () => {
    const res = await client.fetchRandom({ q: "excited", limit: 10 });
    expect(res.results).toHaveLength(10);
    expect(res.next).toBeDefined();
});

test("anon id", async () => {
    const anonId = await client.fetchAnonId();
    expect(typeof anonId).toStrictEqual("string");
});

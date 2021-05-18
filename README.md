# node-tenor

![npm](https://img.shields.io/npm/v/node-tenor)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/zebp/node-tenor/Node.js%20CI)
![NPM](https://img.shields.io/npm/l/node-tenor)

A Node package for the tenor.com RESTful api.

## Example

```typescript
import { TenorClient } from "node-tenor";

async function main() {
    const client = new TenorClient();
    const { results } = await client.fetchTrending({ limit: 10 });

    console.log(results);
}

main();
```

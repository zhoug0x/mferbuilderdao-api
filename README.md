# mferbuilderDAO web API

serverless web API w/ TypeScript & Next.js

## available endpoints

- get latest auction
  - `/api/v1/auctions`
- get token data by id
  - `/api/v1/tokens/[id]`

## todos

**critical:**

- [] fetch historical tokens & their auction data (if any at all)

**functional**

- [] fetch proposals
- [] fetch bids for a specific token
- [] voting activity for specific token (ex: voted against prop X, voted for prop Y)

**nice-to-have**

- [] nested objects for MFBLR tokens, votes, proposals (less calls for the client to get different types of data)

## run locally

> note - you will need a node url, you can get one from [Alchemy](https://www.alchemy.com) or [Infura](https://www.infura.io) for free

make a copy of the `env.example` named `env.local` and add your mainnet node url

```
NODE_URL=your_node_url_here
```

install packages:

```bash
yarn
```

build the app:

```bash
yarn build
```

run the dev server:

```bash
yarn dev
```

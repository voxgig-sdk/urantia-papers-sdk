# UrantiaPapers TypeScript SDK



The TypeScript SDK for the UrantiaPapers API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Audio()` — each with a small set of operations (`list`, `load`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/urantia-papers-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/urantia-papers-sdk
npm install ./urantia-papers-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { UrantiaPapersSDK } from '@voxgig-sdk/urantia-papers-sdk'

const client = new UrantiaPapersSDK()
```

### 3. Load an audio

`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const audio = await client.Audio().load({ id: 'example_id' })
  console.log(audio.data())
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const embedding = await client.Embedding().load({ id: "example_id" })
  console.log(embedding.data())
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = UrantiaPapersSDK.test()

const embedding = await client.Embedding().load({ id: 'test01' })
// embedding is the Embedding entity; .data() reads its mock record
console.log(embedding.data())
```

You can also use the instance method:

```ts
const client = new UrantiaPapersSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Embedding()

// First call runs the operation and stores its result
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new UrantiaPapersSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
URANTIA_PAPERS_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### UrantiaPapersSDK

#### Constructor

```ts
new UrantiaPapersSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Audio(data?)` | `AudioEntity` | Create an Audio entity instance. |
| `Bible(data?)` | `BibleEntity` | Create a Bible entity instance. |
| `Citation(data?)` | `CitationEntity` | Create a Citation entity instance. |
| `Embedding(data?)` | `EmbeddingEntity` | Create an Embedding entity instance. |
| `Entity(data?)` | `EntityEntity` | Create an Entity entity instance. |
| `Feedback(data?)` | `FeedbackEntity` | Create a Feedback entity instance. |
| `Language(data?)` | `LanguageEntity` | Create a Language entity instance. |
| `Ogn(data?)` | `OgnEntity` | Create an Ogn entity instance. |
| `Paper(data?)` | `PaperEntity` | Create a Paper entity instance. |
| `Paragraph(data?)` | `ParagraphEntity` | Create a Paragraph entity instance. |
| `Quote(data?)` | `QuoteEntity` | Create a Quote entity instance. |
| `Scripture(data?)` | `ScriptureEntity` | Create a Scripture entity instance. |
| `Search(data?)` | `SearchEntity` | Create a Search entity instance. |
| `TableOfContent(data?)` | `TableOfContentEntity` | Create a TableOfContent entity instance. |
| `Tool(data?)` | `ToolEntity` | Create a Tool entity instance. |
| `Work(data?)` | `WorkEntity` | Create a Work entity instance. |
| `tester(testopts?, sdkopts?)` | `UrantiaPapersSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `UrantiaPapersSDK.test(testopts?, sdkopts?)` | `UrantiaPapersSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity, and return it. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): UrantiaPapersSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Audio

| Field | Description |
| --- | --- |
| `audio` |  |
| `id` |  |

Operations: load.

API path: `/audio/{ref}`

#### Bible

| Field | Description |
| --- | --- |
| `abbr` |  |
| `bookCode` |  |
| `bookName` |  |
| `bookOrder` |  |
| `canon` |  |
| `chapter` |  |
| `chapterCount` |  |
| `chunk` |  |
| `data` |  |
| `fullName` |  |
| `id` |  |
| `limit` |  |
| `meta` |  |
| `page` |  |
| `q` |  |
| `reference` |  |
| `text` |  |
| `translation` |  |
| `urantiaParallelLimit` |  |
| `urantiaParallels` |  |
| `verse` |  |
| `verseCount` |  |
| `verses` |  |

Operations: create, list, load.

API path: `/bible/search/semantic`

#### Citation

| Field | Description |
| --- | --- |
| `citation` |  |
| `ref` |  |
| `style` |  |

Operations: load.

API path: `/cite`

#### Embedding

| Field | Description |
| --- | --- |
| `dimensions` |  |
| `embedding` |  |
| `id` |  |
| `model` |  |
| `standardReferenceId` |  |

Operations: load.

API path: `/embeddings/{ref}`

#### Entity

| Field | Description |
| --- | --- |
| `aliases` |  |
| `citationCount` | Number of citations in the source index. |
| `description` |  |
| `id` |  |
| `language` |  |
| `name` |  |
| `seeAlso` | Related entry names. |
| `sense` | For a concept with a lowercase name: "special" when the papers coin the word or use it in their own sense, "ordinary" when they use it in its everyday sense. |
| `type` |  |

Operations: list, load.

API path: `/entities/{id}/paragraphs`

#### Feedback

| Field | Description |
| --- | --- |
| `category` |  |
| `client` |  |
| `contact` |  |
| `endpoint` |  |
| `message` |  |
| `pageUrl` |  |
| `ref` |  |
| `requestId` |  |

Operations: create.

API path: `/feedback`

#### Language

| Field | Description |
| --- | --- |
| `code` |  |
| `entityCount` |  |
| `name` |  |
| `paragraphCount` |  |

Operations: list.

API path: `/languages`

#### Ogn

| Field | Description |
| --- | --- |

Operations: load.

API path: `/og/{ref}`

#### Paper

| Field | Description |
| --- | --- |
| `id` |  |
| `labels` |  |
| `paper` |  |
| `paragraphs` |  |
| `partId` |  |
| `sortId` |  |
| `title` |  |
| `topEntities` |  |
| `video` |  |

Operations: list, load.

API path: `/papers/{id}/sections`

#### Paragraph

| Field | Description |
| --- | --- |
| `data` |  |
| `id` |  |
| `navigation` |  |

Operations: load.

API path: `/paragraphs/{ref}`

#### Quote

| Field | Description |
| --- | --- |

Operations: create.

API path: `/quotes/verify`

#### Scripture

| Field | Description |
| --- | --- |
| `chunk` |  |
| `closest` |  |
| `consensus` | Mean percentile across the texts, 0 to 1 |
| `corpus` | Corpus id, slug, or ref prefix, e.g. |
| `data` |  |
| `distance` | 1 minus the highest percentile, 0 to 1 |
| `divisionLabel` |  |
| `divisions` |  |
| `gap` | How far this text's percentile is above the paragraph's mean across texts |
| `id` |  |
| `license` |  |
| `limit` |  |
| `meta` |  |
| `notes` | How the text is numbered or selected |
| `page` |  |
| `pages` | The reading pages of the work, in order: one division, or one subdivision for a work with three reference levels. |
| `paragraph` |  |
| `passage` |  |
| `passageCount` |  |
| `passages` |  |
| `percentile` |  |
| `q` |  |
| `refLevels` | Numbers in a full ref: 1 for `Dhp 183`, 2 for `BG 2.47`, 3 for `Epictetus 3.22.5` |
| `refPrefix` |  |
| `religion` |  |
| `similarity` | text-embedding-3-large cosine similarity |
| `similaritySmall` | text-embedding-3-small cosine similarity |
| `slug` |  |
| `sourceUrl` |  |
| `textsClose` | Texts that have this paragraph in their top 10% |
| `title` |  |
| `translator` |  |
| `unitLabel` |  |
| `urantiaParallelLimit` |  |
| `urantiaParallels` |  |
| `urantiaSection` | The Paper 131 section headed with this religion, or null when Paper 131 has no such heading |
| `year` |  |

Operations: create, list, load.

API path: `/scriptures/search/semantic`

#### Search

| Field | Description |
| --- | --- |
| `audio` |  |
| `bibleParallels` |  |
| `data` |  |
| `entities` |  |
| `htmlText` |  |
| `id` |  |
| `include` |  |
| `labels` |  |
| `language` |  |
| `limit` |  |
| `match` | How the paragraph matched: reference (the query named it), exact (the whole phrase), all (every word), near (every word after a typo fix, see meta.didYouMean), most (two thirds of the words or more; with type `or`, some of the words). |
| `meta` |  |
| `page` |  |
| `paperId` |  |
| `paperTitle` |  |
| `paragraphId` |  |
| `partId` |  |
| `q` |  |
| `rank` |  |
| `scriptureParallels` |  |
| `scriptureScores` |  |
| `sectionId` |  |
| `sectionTitle` |  |
| `sortId` |  |
| `standardReferenceId` |  |
| `text` |  |
| `translation` | Present only when the text is a translation: a machine made it, and it is released as CC0. |
| `type` |  |
| `urantiaParallels` |  |

Operations: create, list.

API path: `/search`

#### TableOfContent

| Field | Description |
| --- | --- |
| `parts` |  |

Operations: load.

API path: `/toc`

#### Tool

| Field | Description |
| --- | --- |

Operations: list.

API path: `/tools/anthropic`

#### Work

| Field | Description |
| --- | --- |
| `data` |  |
| `id` | The work id: "bible", or the slug of a text such as "dhammapada". |
| `kind` | "scripture": read as sacred by its tradition. |
| `limit` |  |
| `match` | Keyword search: how it matched. |
| `meta` |  |
| `page` |  |
| `q` |  |
| `refPrefix` | The prefix of its references, such as "Dhp". |
| `reference` | "John 3:16", "Dhp 183", "BG 2.47-49" (a chunk in semantic search). |
| `religion` | The same as `tradition`, kept for older clients. |
| `similarity` | Semantic search: cosine similarity. |
| `strength` | How close the result is: strong (most right answers score this), related, or weak (likely off the topic). |
| `summary` | One plain sentence on what the work is. |
| `text` |  |
| `title` |  |
| `tradition` | The people or the religion of the work: "Buddhist", "Norse", "Ancient Greek". |
| `translator` |  |
| `unitLabel` | The word for one unit of the work: "verse", "section", "pauri". |
| `units` |  |
| `urantiaParallelLimit` |  |
| `urantiaParallels` | The nearest Urantia paragraphs (semantic parallels, not curated ones). |
| `urantiaSection` |  |
| `url` | The public page that holds the text, or null. |
| `work` | One work only: "bible" or a work id such as "dhammapada". |
| `year` |  |

Operations: create, list, load.

API path: `/works/search`



## Entities


### Audio

Create an instance: `const audio = client.Audio()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audio` | `Record<string, any> | null` |  |
| `id` | `string` |  |

#### Example: Load

```ts
const audio = await client.Audio().load({ id: 'audio_id' })
```


### Bible

Create an instance: `const bible = client.Bible()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abbr` | `string` |  |
| `bookCode` | `string` |  |
| `bookName` | `string` |  |
| `bookOrder` | `number` |  |
| `canon` | `string` |  |
| `chapter` | `number` |  |
| `chapterCount` | `number` |  |
| `chunk` | `Record<string, any>` |  |
| `data` | `any[]` |  |
| `fullName` | `string` |  |
| `id` | `string` |  |
| `limit` | `number` |  |
| `meta` | `Record<string, any>` |  |
| `page` | `number` |  |
| `q` | `string` |  |
| `reference` | `string` |  |
| `text` | `string` |  |
| `translation` | `string` |  |
| `urantiaParallelLimit` | `number` |  |
| `urantiaParallels` | `any[]` |  |
| `verse` | `number` |  |
| `verseCount` | `number` |  |
| `verses` | `any[]` |  |

#### Example: Load

```ts
const bible = await client.Bible().load({ id: 'bible_id' })
```

#### Example: List

```ts
const bibles = await client.Bible().list()
```

#### Example: Create

```ts
const bible = await client.Bible().create({
  q: 'example_q',
})
```


### Citation

Create an instance: `const citation = client.Citation()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `citation` | `string` |  |
| `ref` | `string` |  |
| `style` | `string` |  |

#### Example: Load

```ts
const citation = await client.Citation().load({ ref: 'ref' })
```


### Embedding

Create an instance: `const embedding = client.Embedding()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dimensions` | `number` |  |
| `embedding` | `any[]` |  |
| `id` | `string` |  |
| `model` | `string` |  |
| `standardReferenceId` | `string` |  |

#### Example: Load

```ts
const embedding = await client.Embedding().load({ id: 'embedding_id' })
```


### Entity

Create an instance: `const entity = client.Entity()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aliases` | `any[] | null` |  |
| `citationCount` | `number` | Number of citations in the source index. |
| `description` | `string | null` |  |
| `id` | `string` |  |
| `language` | `string` |  |
| `name` | `string` |  |
| `seeAlso` | `any[] | null` | Related entry names. |
| `sense` | `string | null` | For a concept with a lowercase name: "special" when the papers coin the word or use it in their own sense, "ordinary" when they use it in its everyday sense. |
| `type` | `string` |  |

#### Example: Load

```ts
const entity = await client.Entity().load({ id: 'entity_id' })
```

#### Example: List

```ts
const entitys = await client.Entity().list()
```


### Feedback

Create an instance: `const feedback = client.Feedback()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` |  |
| `client` | `string` |  |
| `contact` | `string` |  |
| `endpoint` | `string` |  |
| `message` | `string` |  |
| `pageUrl` | `string` |  |
| `ref` | `string` |  |
| `requestId` | `string` |  |

#### Example: Create

```ts
const feedback = await client.Feedback().create({
  category: 'example_category',
  message: 'example_message',
})
```


### Language

Create an instance: `const language = client.Language()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` |  |
| `entityCount` | `number` |  |
| `name` | `string` |  |
| `paragraphCount` | `number` |  |

#### Example: List

```ts
const languages = await client.Language().list()
```


### Ogn

Create an instance: `const ogn = client.Ogn()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const ogn = await client.Ogn().load({ ref: 'ref' })
```


### Paper

Create an instance: `const paper = client.Paper()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `labels` | `any[] | null` |  |
| `paper` | `Record<string, any>` |  |
| `paragraphs` | `any[]` |  |
| `partId` | `string` |  |
| `sortId` | `string` |  |
| `title` | `string` |  |
| `topEntities` | `any[]` |  |
| `video` | `Record<string, any> | null` |  |

#### Example: Load

```ts
const paper = await client.Paper().load({ id: 'paper_id' })
```

#### Example: List

```ts
const papers = await client.Paper().list()
```


### Paragraph

Create an instance: `const paragraph = client.Paragraph()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Record<string, any>` |  |
| `id` | `string` |  |
| `navigation` | `Record<string, any>` |  |

#### Example: Load

```ts
const paragraph = await client.Paragraph().load({ id: 'paragraph_id' })
```


### Quote

Create an instance: `const quote = client.Quote()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const quote = await client.Quote().create({
})
```


### Scripture

Create an instance: `const scripture = client.Scripture()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chunk` | `Record<string, any>` |  |
| `closest` | `any[]` |  |
| `consensus` | `number` | Mean percentile across the texts, 0 to 1 |
| `corpus` | `Record<string, any>` | Corpus id, slug, or ref prefix, e.g. |
| `data` | `any[]` |  |
| `distance` | `number` | 1 minus the highest percentile, 0 to 1 |
| `divisionLabel` | `string` |  |
| `divisions` | `any[]` |  |
| `gap` | `number` | How far this text's percentile is above the paragraph's mean across texts |
| `id` | `string` |  |
| `license` | `string` |  |
| `limit` | `number` |  |
| `meta` | `Record<string, any>` |  |
| `notes` | `string | null` | How the text is numbered or selected |
| `page` | `number` |  |
| `pages` | `any[]` | The reading pages of the work, in order: one division, or one subdivision for a work with three reference levels. |
| `paragraph` | `Record<string, any>` |  |
| `passage` | `Record<string, any>` |  |
| `passageCount` | `number` |  |
| `passages` | `any[]` |  |
| `percentile` | `number` |  |
| `q` | `string` |  |
| `refLevels` | `number` | Numbers in a full ref: 1 for `Dhp 183`, 2 for `BG 2.47`, 3 for `Epictetus 3.22.5` |
| `refPrefix` | `string` |  |
| `religion` | `string` |  |
| `similarity` | `number` | text-embedding-3-large cosine similarity |
| `similaritySmall` | `number` | text-embedding-3-small cosine similarity |
| `slug` | `string` |  |
| `sourceUrl` | `string` |  |
| `textsClose` | `number` | Texts that have this paragraph in their top 10% |
| `title` | `string` |  |
| `translator` | `string` |  |
| `unitLabel` | `string` |  |
| `urantiaParallelLimit` | `number` |  |
| `urantiaParallels` | `any[]` |  |
| `urantiaSection` | `string | null` | The Paper 131 section headed with this religion, or null when Paper 131 has no such heading |
| `year` | `number` |  |

#### Example: Load

```ts
const scripture = await client.Scripture().load({ id: 'scripture_id' })
```

#### Example: List

```ts
const scriptures = await client.Scripture().list()
```

#### Example: Create

```ts
const scripture = await client.Scripture().create({
  q: 'example_q',
})
```


### Search

Create an instance: `const search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audio` | `Record<string, any> | null` |  |
| `bibleParallels` | `any[]` |  |
| `data` | `any[]` |  |
| `entities` | `any[]` |  |
| `htmlText` | `string` |  |
| `id` | `string` |  |
| `include` | `string` |  |
| `labels` | `any[] | null` |  |
| `language` | `string` |  |
| `limit` | `number` |  |
| `match` | `string` | How the paragraph matched: reference (the query named it), exact (the whole phrase), all (every word), near (every word after a typo fix, see meta.didYouMean), most (two thirds of the words or more; with type `or`, some of the words). |
| `meta` | `Record<string, any>` |  |
| `page` | `number` |  |
| `paperId` | `string` |  |
| `paperTitle` | `string` |  |
| `paragraphId` | `string` |  |
| `partId` | `string` |  |
| `q` | `string` |  |
| `rank` | `number` |  |
| `scriptureParallels` | `any[]` |  |
| `scriptureScores` | `Record<string, any> | null` |  |
| `sectionId` | `string | null` |  |
| `sectionTitle` | `string | null` |  |
| `sortId` | `string` |  |
| `standardReferenceId` | `string` |  |
| `text` | `string` |  |
| `translation` | `Record<string, any>` | Present only when the text is a translation: a machine made it, and it is released as CC0. |
| `type` | `string` |  |
| `urantiaParallels` | `any[]` |  |

#### Example: List

```ts
const searchs = await client.Search().list({ q: "example" })
```

#### Example: Create

```ts
const search = await client.Search().create({
  q: 'example_q',
})
```


### TableOfContent

Create an instance: `const table_of_content = client.TableOfContent()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `parts` | `any[]` |  |

#### Example: Load

```ts
const table_of_content = await client.TableOfContent().load()
```


### Tool

Create an instance: `const tool = client.Tool()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |


### Work

Create an instance: `const work = client.Work()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any[]` |  |
| `id` | `string` | The work id: "bible", or the slug of a text such as "dhammapada". |
| `kind` | `string` | "scripture": read as sacred by its tradition. |
| `limit` | `number` |  |
| `match` | `string` | Keyword search: how it matched. |
| `meta` | `Record<string, any>` |  |
| `page` | `number` |  |
| `q` | `string` |  |
| `refPrefix` | `string | null` | The prefix of its references, such as "Dhp". |
| `reference` | `string` | "John 3:16", "Dhp 183", "BG 2.47-49" (a chunk in semantic search). |
| `religion` | `string` | The same as `tradition`, kept for older clients. |
| `similarity` | `number` | Semantic search: cosine similarity. |
| `strength` | `string` | How close the result is: strong (most right answers score this), related, or weak (likely off the topic). |
| `summary` | `string` | One plain sentence on what the work is. |
| `text` | `string` |  |
| `title` | `string` |  |
| `tradition` | `string` | The people or the religion of the work: "Buddhist", "Norse", "Ancient Greek". |
| `translator` | `string` |  |
| `unitLabel` | `string` | The word for one unit of the work: "verse", "section", "pauri". |
| `units` | `number` |  |
| `urantiaParallelLimit` | `number` |  |
| `urantiaParallels` | `any[]` | The nearest Urantia paragraphs (semantic parallels, not curated ones). |
| `urantiaSection` | `string | null` |  |
| `url` | `string | null` | The public page that holds the text, or null. |
| `work` | `string` | One work only: "bible" or a work id such as "dhammapada". |
| `year` | `number | null` |  |

#### Example: Load

```ts
const work = await client.Work().load({ ref: 'ref', work: 'work' })
```

#### Example: List

```ts
const works = await client.Work().list()
```

#### Example: Create

```ts
const work = await client.Work().create({
  q: 'example_q',
})
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
urantia-papers/
├── src/
│   ├── UrantiaPapersSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { UrantiaPapersSDK } from '@voxgig-sdk/urantia-papers-sdk'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const embedding = client.Embedding()
await embedding.load({ id: "example_id" })

// embedding.data() now returns the embedding data from the last `load`
// embedding.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

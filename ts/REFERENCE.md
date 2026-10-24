# UrantiaPapers TypeScript SDK Reference

Complete API reference for the UrantiaPapers TypeScript SDK.


## UrantiaPapersSDK

### Constructor

```ts
new UrantiaPapersSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `UrantiaPapersSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = UrantiaPapersSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `UrantiaPapersSDK` instance in test mode.


### Instance Methods

#### `Audio(data?: object)`

Create a new `Audio` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AudioEntity` instance.

#### `Bible(data?: object)`

Create a new `Bible` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BibleEntity` instance.

#### `Citation(data?: object)`

Create a new `Citation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CitationEntity` instance.

#### `Embedding(data?: object)`

Create a new `Embedding` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmbeddingEntity` instance.

#### `Entity(data?: object)`

Create a new `Entity` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EntityEntity` instance.

#### `Feedback(data?: object)`

Create a new `Feedback` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FeedbackEntity` instance.

#### `Language(data?: object)`

Create a new `Language` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LanguageEntity` instance.

#### `Ogn(data?: object)`

Create a new `Ogn` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OgnEntity` instance.

#### `Paper(data?: object)`

Create a new `Paper` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PaperEntity` instance.

#### `Paragraph(data?: object)`

Create a new `Paragraph` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ParagraphEntity` instance.

#### `Quote(data?: object)`

Create a new `Quote` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `QuoteEntity` instance.

#### `Scripture(data?: object)`

Create a new `Scripture` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ScriptureEntity` instance.

#### `Search(data?: object)`

Create a new `Search` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SearchEntity` instance.

#### `TableOfContent(data?: object)`

Create a new `TableOfContent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TableOfContentEntity` instance.

#### `Tool(data?: object)`

Create a new `Tool` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ToolEntity` instance.

#### `Work(data?: object)`

Create a new `Work` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WorkEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `UrantiaPapersSDK.test()`.

**Returns:** `UrantiaPapersSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## AudioEntity

```ts
const audio = client.Audio()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audio` | `Record<string, any> | null` | Yes |  |
| `id` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Audio().load({ id: 'audio_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AudioEntity` instance with the same client and
options.

#### `client()`

Return the parent `UrantiaPapersSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BibleEntity

```ts
const bible = client.Bible()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abbr` | `string` | Yes |  |
| `bookCode` | `string` | Yes |  |
| `bookName` | `string` | Yes |  |
| `bookOrder` | `number` | Yes |  |
| `canon` | `string` | Yes |  |
| `chapter` | `number` | Yes |  |
| `chapterCount` | `number` | Yes |  |
| `chunk` | `Record<string, any>` | Yes |  |
| `data` | `any[]` | Yes |  |
| `fullName` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `limit` | `number` | No |  |
| `meta` | `Record<string, any>` | Yes |  |
| `page` | `number` | No |  |
| `q` | `string` | Yes |  |
| `reference` | `string` | Yes |  |
| `text` | `string` | Yes |  |
| `translation` | `string` | Yes |  |
| `urantiaParallelLimit` | `number` | No |  |
| `urantiaParallels` | `any[]` | Yes |  |
| `verse` | `number` | Yes |  |
| `verseCount` | `number` | Yes |  |
| `verses` | `any[]` | Yes |  |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `abbr` | - | - | - |
| `bookCode` | - | - | Yes |
| `bookName` | - | - | - |
| `bookOrder` | - | - | - |
| `canon` | - | - | Yes |
| `chapter` | - | - | - |
| `chapterCount` | - | - | - |
| `chunk` | - | - | - |
| `data` | - | - | - |
| `fullName` | - | - | - |
| `id` | - | - | - |
| `limit` | - | - | - |
| `meta` | - | - | - |
| `page` | - | - | - |
| `q` | - | - | - |
| `reference` | - | - | - |
| `text` | - | - | - |
| `translation` | - | - | - |
| `urantiaParallelLimit` | - | - | - |
| `urantiaParallels` | - | - | - |
| `verse` | - | - | - |
| `verseCount` | - | - | - |
| `verses` | - | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `book` | `/bible/books` | `client.Bible().list({ $action: 'book', ... })` |

An action returns that action's OWN response, which is not necessarily a
Bible record — check the API definition for its shape.

```ts
const result = await client.Bible().list({
  $action: 'book',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Bible().create({
  q: 'example_q',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Bible().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Bible().load({ id: 'bible_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BibleEntity` instance with the same client and
options.

#### `client()`

Return the parent `UrantiaPapersSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CitationEntity

```ts
const citation = client.Citation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `citation` | `string` | Yes |  |
| `ref` | `string` | Yes |  |
| `style` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Citation().load({ ref: 'ref' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CitationEntity` instance with the same client and
options.

#### `client()`

Return the parent `UrantiaPapersSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EmbeddingEntity

```ts
const embedding = client.Embedding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dimensions` | `number` | Yes |  |
| `embedding` | `any[]` | Yes |  |
| `id` | `string` | No |  |
| `model` | `string` | Yes |  |
| `standardReferenceId` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `export` | `/embeddings/export` | `client.Embedding().load({ $action: 'export', ... })` |

An action returns that action's OWN response, which is not necessarily a
Embedding record — check the API definition for its shape.

```ts
const result = await client.Embedding().load({
  $action: 'export',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Embedding().load({ id: 'embedding_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmbeddingEntity` instance with the same client and
options.

#### `client()`

Return the parent `UrantiaPapersSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EntityEntity

```ts
const entity = client.Entity()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aliases` | `any[] | null` | Yes |  |
| `citationCount` | `number` | Yes | Number of citations in the source index. |
| `description` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `language` | `string` | No |  |
| `name` | `string` | Yes |  |
| `seeAlso` | `any[] | null` | Yes | Related entry names. |
| `sense` | `string | null` | Yes | For a concept with a lowercase name: "special" when the papers coin the word or use it in their own sense, "ordinary" when they use it in its everyday sense. |
| `type` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `paragraph` | `/entities/{id}/paragraphs` | `client.Entity().list({ $action: 'paragraph', ... })` |

An action returns that action's OWN response, which is not necessarily a
Entity record — check the API definition for its shape.

```ts
const result = await client.Entity().list({
  $action: 'paragraph',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Entity().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Entity().load({ id: 'entity_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EntityEntity` instance with the same client and
options.

#### `client()`

Return the parent `UrantiaPapersSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FeedbackEntity

```ts
const feedback = client.Feedback()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | Yes |  |
| `client` | `string` | No |  |
| `contact` | `string` | No |  |
| `endpoint` | `string` | No |  |
| `message` | `string` | Yes |  |
| `pageUrl` | `string` | No |  |
| `ref` | `string` | No |  |
| `requestId` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Feedback().create({
  category: 'example_category',
  message: 'example_message',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FeedbackEntity` instance with the same client and
options.

#### `client()`

Return the parent `UrantiaPapersSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LanguageEntity

```ts
const language = client.Language()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | Yes |  |
| `entityCount` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `paragraphCount` | `number` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Language().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LanguageEntity` instance with the same client and
options.

#### `client()`

Return the parent `UrantiaPapersSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OgnEntity

```ts
const ogn = client.Ogn()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Ogn().load({ ref: 'ref' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OgnEntity` instance with the same client and
options.

#### `client()`

Return the parent `UrantiaPapersSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PaperEntity

```ts
const paper = client.Paper()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `labels` | `any[] | null` | Yes |  |
| `paper` | `Record<string, any>` | Yes |  |
| `paragraphs` | `any[]` | Yes |  |
| `partId` | `string` | Yes |  |
| `sortId` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `topEntities` | `any[]` | No |  |
| `video` | `Record<string, any> | null` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `section` | `/papers/{id}/sections` | `client.Paper().list({ $action: 'section', ... })` |

An action returns that action's OWN response, which is not necessarily a
Paper record — check the API definition for its shape.

```ts
const result = await client.Paper().list({
  $action: 'section',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Paper().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Paper().load({ id: 'paper_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PaperEntity` instance with the same client and
options.

#### `client()`

Return the parent `UrantiaPapersSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ParagraphEntity

```ts
const paragraph = client.Paragraph()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | Yes |  |
| `id` | `string` | No |  |
| `navigation` | `Record<string, any>` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `context` | `/paragraphs/{ref}/context` | `client.Paragraph().load({ $action: 'context', ... })` |
| `random` | `/paragraphs/random` | `client.Paragraph().load({ $action: 'random', ... })` |

An action returns that action's OWN response, which is not necessarily a
Paragraph record — check the API definition for its shape.

```ts
const result = await client.Paragraph().load({
  $action: 'context',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Paragraph().load({ id: 'paragraph_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ParagraphEntity` instance with the same client and
options.

#### `client()`

Return the parent `UrantiaPapersSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## QuoteEntity

```ts
const quote = client.Quote()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `verify` | `/quotes/verify` | `client.Quote().create({ $action: 'verify', ... })` |

An action returns that action's OWN response, which is not necessarily a
Quote record — check the API definition for its shape.

```ts
const result = await client.Quote().create({
  $action: 'verify',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Quote().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `QuoteEntity` instance with the same client and
options.

#### `client()`

Return the parent `UrantiaPapersSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ScriptureEntity

```ts
const scripture = client.Scripture()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chunk` | `Record<string, any>` | Yes |  |
| `closest` | `any[]` | Yes |  |
| `consensus` | `number` | Yes | Mean percentile across the texts, 0 to 1 |
| `corpus` | `Record<string, any>` | Yes | Corpus id, slug, or ref prefix, e.g. |
| `data` | `any[]` | Yes |  |
| `distance` | `number` | Yes | 1 minus the highest percentile, 0 to 1 |
| `divisionLabel` | `string` | Yes |  |
| `divisions` | `any[]` | Yes |  |
| `gap` | `number` | Yes | How far this text's percentile is above the paragraph's mean across texts |
| `id` | `string` | Yes |  |
| `license` | `string` | Yes |  |
| `limit` | `number` | No |  |
| `meta` | `Record<string, any>` | Yes |  |
| `notes` | `string | null` | Yes | How the text is numbered or selected |
| `page` | `number` | No |  |
| `pages` | `any[]` | Yes | The reading pages of the work, in order: one division, or one subdivision for a work with three reference levels. |
| `paragraph` | `Record<string, any>` | Yes |  |
| `passage` | `Record<string, any>` | Yes |  |
| `passageCount` | `number` | Yes |  |
| `passages` | `any[]` | Yes |  |
| `percentile` | `number` | Yes |  |
| `q` | `string` | Yes |  |
| `refLevels` | `number` | Yes | Numbers in a full ref: 1 for `Dhp 183`, 2 for `BG 2.47`, 3 for `Epictetus 3.22.5` |
| `refPrefix` | `string` | Yes |  |
| `religion` | `string` | Yes |  |
| `similarity` | `number` | Yes | text-embedding-3-large cosine similarity |
| `similaritySmall` | `number` | Yes | text-embedding-3-small cosine similarity |
| `slug` | `string` | Yes |  |
| `sourceUrl` | `string` | Yes |  |
| `textsClose` | `number` | Yes | Texts that have this paragraph in their top 10% |
| `title` | `string` | Yes |  |
| `translator` | `string` | Yes |  |
| `unitLabel` | `string` | Yes |  |
| `urantiaParallelLimit` | `number` | No |  |
| `urantiaParallels` | `any[]` | Yes |  |
| `urantiaSection` | `string | null` | Yes | The Paper 131 section headed with this religion, or null when Paper 131 has no such heading |
| `year` | `number` | Yes |  |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `chunk` | - | - | - |
| `closest` | - | - | - |
| `consensus` | - | - | - |
| `corpus` | - | - | Yes |
| `data` | - | - | - |
| `distance` | - | - | - |
| `divisionLabel` | - | - | - |
| `divisions` | - | - | - |
| `gap` | - | - | - |
| `id` | - | - | - |
| `license` | - | - | - |
| `limit` | - | - | - |
| `meta` | - | - | - |
| `notes` | - | - | - |
| `page` | - | - | - |
| `pages` | - | - | - |
| `paragraph` | - | - | - |
| `passage` | - | - | - |
| `passageCount` | - | - | - |
| `passages` | - | - | - |
| `percentile` | - | - | - |
| `q` | - | - | - |
| `refLevels` | - | - | - |
| `refPrefix` | - | - | - |
| `religion` | - | - | - |
| `similarity` | - | - | - |
| `similaritySmall` | - | - | - |
| `slug` | - | - | - |
| `sourceUrl` | - | - | - |
| `textsClose` | - | - | - |
| `title` | - | - | - |
| `translator` | - | - | - |
| `unitLabel` | - | - | - |
| `urantiaParallelLimit` | - | - | - |
| `urantiaParallels` | - | - | - |
| `urantiaSection` | - | - | - |
| `year` | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Scripture().create({
  q: 'example_q',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Scripture().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Scripture().load({ id: 'scripture_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ScriptureEntity` instance with the same client and
options.

#### `client()`

Return the parent `UrantiaPapersSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SearchEntity

```ts
const search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audio` | `Record<string, any> | null` | Yes |  |
| `bibleParallels` | `any[]` | No |  |
| `data` | `any[]` | Yes |  |
| `entities` | `any[]` | No |  |
| `htmlText` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `include` | `string` | No |  |
| `labels` | `any[] | null` | Yes |  |
| `language` | `string` | No |  |
| `limit` | `number` | No |  |
| `match` | `string` | Yes | How the paragraph matched: reference (the query named it), exact (the whole phrase), all (every word), near (every word after a typo fix, see meta.didYouMean), most (two thirds of the words or more; with type `or`, some of the words). |
| `meta` | `Record<string, any>` | Yes |  |
| `page` | `number` | No |  |
| `paperId` | `string` | No |  |
| `paperTitle` | `string` | Yes |  |
| `paragraphId` | `string` | Yes |  |
| `partId` | `string` | No |  |
| `q` | `string` | Yes |  |
| `rank` | `number` | Yes |  |
| `scriptureParallels` | `any[]` | No |  |
| `scriptureScores` | `Record<string, any> | null` | Yes |  |
| `sectionId` | `string | null` | Yes |  |
| `sectionTitle` | `string | null` | Yes |  |
| `sortId` | `string` | Yes |  |
| `standardReferenceId` | `string` | Yes |  |
| `text` | `string` | Yes |  |
| `translation` | `Record<string, any>` | Yes | Present only when the text is a translation: a machine made it, and it is released as CC0. |
| `type` | `string` | No |  |
| `urantiaParallels` | `any[]` | No |  |

### Field Usage by Operation

| Field | list | create |
| --- | --- | --- |
| `audio` | - | - |
| `bibleParallels` | - | - |
| `data` | - | - |
| `entities` | - | - |
| `htmlText` | - | - |
| `id` | - | - |
| `include` | - | - |
| `labels` | - | - |
| `language` | - | - |
| `limit` | - | - |
| `match` | - | - |
| `meta` | - | - |
| `page` | - | - |
| `paperId` | Yes | - |
| `paperTitle` | - | - |
| `paragraphId` | - | - |
| `partId` | Yes | - |
| `q` | - | - |
| `rank` | - | - |
| `scriptureParallels` | - | - |
| `scriptureScores` | - | - |
| `sectionId` | - | - |
| `sectionTitle` | - | - |
| `sortId` | - | - |
| `standardReferenceId` | - | - |
| `text` | - | - |
| `translation` | - | - |
| `type` | - | - |
| `urantiaParallels` | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `semantic` | `/search/semantic` | `client.Search().create({ $action: 'semantic', ... })` |
| `semantic` | `/search/semantic` | `client.Search().list({ $action: 'semantic', ... })` |

An action returns that action's OWN response, which is not necessarily a
Search record — check the API definition for its shape.

```ts
const result = await client.Search().create({
  $action: 'semantic',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Search().create({
  q: 'example_q',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Search().list({ q: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `UrantiaPapersSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TableOfContentEntity

```ts
const table_of_content = client.TableOfContent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `parts` | `any[]` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.TableOfContent().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TableOfContentEntity` instance with the same client and
options.

#### `client()`

Return the parent `UrantiaPapersSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ToolEntity

```ts
const tool = client.Tool()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `anthropic` | `/tools/anthropic` | `client.Tool().list({ $action: 'anthropic', ... })` |
| `openai` | `/tools/openai` | `client.Tool().list({ $action: 'openai', ... })` |

An action returns that action's OWN response, which is not necessarily a
Tool record — check the API definition for its shape.

```ts
const result = await client.Tool().list({
  $action: 'anthropic',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ToolEntity` instance with the same client and
options.

#### `client()`

Return the parent `UrantiaPapersSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WorkEntity

```ts
const work = client.Work()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | Yes |  |
| `id` | `string` | Yes | The work id: "bible", or the slug of a text such as "dhammapada". |
| `kind` | `string` | Yes | "scripture": read as sacred by its tradition. |
| `limit` | `number` | No |  |
| `match` | `string` | No | Keyword search: how it matched. |
| `meta` | `Record<string, any>` | Yes |  |
| `page` | `number` | No |  |
| `q` | `string` | Yes |  |
| `refPrefix` | `string | null` | Yes | The prefix of its references, such as "Dhp". |
| `reference` | `string` | Yes | "John 3:16", "Dhp 183", "BG 2.47-49" (a chunk in semantic search). |
| `religion` | `string` | Yes | The same as `tradition`, kept for older clients. |
| `similarity` | `number` | No | Semantic search: cosine similarity. |
| `strength` | `string` | No | How close the result is: strong (most right answers score this), related, or weak (likely off the topic). |
| `summary` | `string` | Yes | One plain sentence on what the work is. |
| `text` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `tradition` | `string` | Yes | The people or the religion of the work: "Buddhist", "Norse", "Ancient Greek". |
| `translator` | `string` | Yes |  |
| `unitLabel` | `string` | Yes | The word for one unit of the work: "verse", "section", "pauri". |
| `units` | `number` | Yes |  |
| `urantiaParallelLimit` | `number` | No |  |
| `urantiaParallels` | `any[]` | Yes | The nearest Urantia paragraphs (semantic parallels, not curated ones). |
| `urantiaSection` | `string | null` | Yes |  |
| `url` | `string | null` | Yes | The public page that holds the text, or null. |
| `work` | `string` | No | One work only: "bible" or a work id such as "dhammapada". |
| `year` | `number | null` | Yes |  |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `data` | - | - | - |
| `id` | - | - | - |
| `kind` | - | - | - |
| `limit` | - | - | - |
| `match` | - | - | - |
| `meta` | - | - | - |
| `page` | - | - | - |
| `q` | - | - | - |
| `refPrefix` | - | - | - |
| `reference` | - | - | - |
| `religion` | - | - | - |
| `similarity` | - | - | - |
| `strength` | - | - | - |
| `summary` | - | - | - |
| `text` | - | - | - |
| `title` | - | - | - |
| `tradition` | - | - | - |
| `translator` | - | - | - |
| `unitLabel` | - | - | - |
| `units` | - | - | - |
| `urantiaParallelLimit` | - | - | - |
| `urantiaParallels` | - | - | - |
| `urantiaSection` | - | - | - |
| `url` | - | - | - |
| `work` | - | Yes | - |
| `year` | - | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `search` | `/works/search` | `client.Work().create({ $action: 'search', ... })` |
| `search` | `/works/search` | `client.Work().list({ $action: 'search', ... })` |
| `urantia_parallel` | `/works/{work}/{ref}/urantia-parallels` | `client.Work().load({ $action: 'urantia_parallel', ... })` |
| `work_parallel` | `/works/{work}/{ref}/work-parallels` | `client.Work().load({ $action: 'work_parallel', ... })` |

An action returns that action's OWN response, which is not necessarily a
Work record — check the API definition for its shape.

```ts
const result = await client.Work().create({
  $action: 'search',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Work().create({
  q: 'example_q',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Work().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Work().load({ ref: 'ref', work: 'work' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WorkEntity` instance with the same client and
options.

#### `client()`

Return the parent `UrantiaPapersSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ts
const client = new UrantiaPapersSDK({
  feature: {
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.


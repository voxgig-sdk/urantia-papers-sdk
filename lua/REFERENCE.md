# UrantiaPapers Lua SDK Reference

Complete API reference for the UrantiaPapers Lua SDK.


## UrantiaPapersSDK

### Constructor

```lua
local sdk = require("urantia-papers_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Audio(data)`

Create a new `Audio` entity instance. Pass `nil` for no initial data.

#### `Bible(data)`

Create a new `Bible` entity instance. Pass `nil` for no initial data.

#### `Citation(data)`

Create a new `Citation` entity instance. Pass `nil` for no initial data.

#### `Embedding(data)`

Create a new `Embedding` entity instance. Pass `nil` for no initial data.

#### `Entity(data)`

Create a new `Entity` entity instance. Pass `nil` for no initial data.

#### `Feedback(data)`

Create a new `Feedback` entity instance. Pass `nil` for no initial data.

#### `Language(data)`

Create a new `Language` entity instance. Pass `nil` for no initial data.

#### `Ogn(data)`

Create a new `Ogn` entity instance. Pass `nil` for no initial data.

#### `Paper(data)`

Create a new `Paper` entity instance. Pass `nil` for no initial data.

#### `Paragraph(data)`

Create a new `Paragraph` entity instance. Pass `nil` for no initial data.

#### `Quote(data)`

Create a new `Quote` entity instance. Pass `nil` for no initial data.

#### `Scripture(data)`

Create a new `Scripture` entity instance. Pass `nil` for no initial data.

#### `Search(data)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `TableOfContent(data)`

Create a new `TableOfContent` entity instance. Pass `nil` for no initial data.

#### `Tool(data)`

Create a new `Tool` entity instance. Pass `nil` for no initial data.

#### `Work(data)`

Create a new `Work` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AudioEntity

```lua
local audio = client:Audio(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audio` | `table|nil` | Yes |  |
| `id` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Audio():load({ id = "audio_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AudioEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BibleEntity

```lua
local bible = client:Bible(nil)
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
| `chunk` | `table` | Yes |  |
| `data` | `table` | Yes |  |
| `fullName` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `limit` | `number` | No |  |
| `meta` | `table` | Yes |  |
| `page` | `number` | No |  |
| `q` | `string` | Yes |  |
| `reference` | `string` | Yes |  |
| `text` | `string` | Yes |  |
| `translation` | `string` | Yes |  |
| `urantiaParallelLimit` | `number` | No |  |
| `urantiaParallels` | `table` | Yes |  |
| `verse` | `number` | Yes |  |
| `verseCount` | `number` | Yes |  |
| `verses` | `table` | Yes |  |

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

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Bible():create({
  q = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Bible():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Bible():load({ id = "bible_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BibleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CitationEntity

```lua
local citation = client:Citation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `citation` | `string` | Yes |  |
| `ref` | `string` | Yes |  |
| `style` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Citation():load({ ref = "ref" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CitationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EmbeddingEntity

```lua
local embedding = client:Embedding(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dimensions` | `number` | Yes |  |
| `embedding` | `table` | Yes |  |
| `id` | `string` | No |  |
| `model` | `string` | Yes |  |
| `standardReferenceId` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Embedding():load({ id = "embedding_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmbeddingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EntityEntity

```lua
local entity = client:Entity(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aliases` | `table|nil` | Yes |  |
| `citationCount` | `number` | Yes | Number of citations in the source index. |
| `description` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `language` | `string` | No |  |
| `name` | `string` | Yes |  |
| `seeAlso` | `table|nil` | Yes | Related entry names. |
| `sense` | `string|nil` | Yes | For a concept with a lowercase name: "special" when the papers coin the word or use it in their own sense, "ordinary" when they use it in its everyday sense. |
| `type` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Entity():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Entity():load({ id = "entity_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EntityEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FeedbackEntity

```lua
local feedback = client:Feedback(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Feedback():create({
  category = --[[ string ]],
  message = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FeedbackEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LanguageEntity

```lua
local language = client:Language(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | Yes |  |
| `entityCount` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `paragraphCount` | `number` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Language():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LanguageEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OgnEntity

```lua
local ogn = client:Ogn(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Ogn():load({ ref = "ref" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OgnEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PaperEntity

```lua
local paper = client:Paper(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `labels` | `table|nil` | Yes |  |
| `paper` | `table` | Yes |  |
| `paragraphs` | `table` | Yes |  |
| `partId` | `string` | Yes |  |
| `sortId` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `topEntities` | `table` | No |  |
| `video` | `table|nil` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Paper():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Paper():load({ id = "paper_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaperEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ParagraphEntity

```lua
local paragraph = client:Paragraph(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `table` | Yes |  |
| `id` | `string` | No |  |
| `navigation` | `table` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Paragraph():load({ id = "paragraph_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ParagraphEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## QuoteEntity

```lua
local quote = client:Quote(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Quote():create({
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QuoteEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ScriptureEntity

```lua
local scripture = client:Scripture(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chunk` | `table` | Yes |  |
| `closest` | `table` | Yes |  |
| `consensus` | `number` | Yes | Mean percentile across the texts, 0 to 1 |
| `corpus` | `table` | Yes | Corpus id, slug, or ref prefix, e.g. |
| `data` | `table` | Yes |  |
| `distance` | `number` | Yes | 1 minus the highest percentile, 0 to 1 |
| `divisionLabel` | `string` | Yes |  |
| `divisions` | `table` | Yes |  |
| `gap` | `number` | Yes | How far this text's percentile is above the paragraph's mean across texts |
| `id` | `string` | Yes |  |
| `license` | `string` | Yes |  |
| `limit` | `number` | No |  |
| `meta` | `table` | Yes |  |
| `notes` | `string|nil` | Yes | How the text is numbered or selected |
| `page` | `number` | No |  |
| `pages` | `table` | Yes | The reading pages of the work, in order: one division, or one subdivision for a work with three reference levels. |
| `paragraph` | `table` | Yes |  |
| `passage` | `table` | Yes |  |
| `passageCount` | `number` | Yes |  |
| `passages` | `table` | Yes |  |
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
| `urantiaParallels` | `table` | Yes |  |
| `urantiaSection` | `string|nil` | Yes | The Paper 131 section headed with this religion, or null when Paper 131 has no such heading |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Scripture():create({
  q = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Scripture():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Scripture():load({ id = "scripture_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScriptureEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SearchEntity

```lua
local search = client:Search(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audio` | `table|nil` | Yes |  |
| `bibleParallels` | `table` | No |  |
| `data` | `table` | Yes |  |
| `entities` | `table` | No |  |
| `htmlText` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `include` | `string` | No |  |
| `labels` | `table|nil` | Yes |  |
| `language` | `string` | No |  |
| `limit` | `number` | No |  |
| `match` | `string` | Yes | How the paragraph matched: reference (the query named it), exact (the whole phrase), all (every word), near (every word after a typo fix, see meta.didYouMean), most (two thirds of the words or more; with type `or`, some of the words). |
| `meta` | `table` | Yes |  |
| `page` | `number` | No |  |
| `paperId` | `string` | No |  |
| `paperTitle` | `string` | Yes |  |
| `paragraphId` | `string` | Yes |  |
| `partId` | `string` | No |  |
| `q` | `string` | Yes |  |
| `rank` | `number` | Yes |  |
| `scriptureParallels` | `table` | No |  |
| `scriptureScores` | `table|nil` | Yes |  |
| `sectionId` | `string|nil` | Yes |  |
| `sectionTitle` | `string|nil` | Yes |  |
| `sortId` | `string` | Yes |  |
| `standardReferenceId` | `string` | Yes |  |
| `text` | `string` | Yes |  |
| `translation` | `table` | Yes | Present only when the text is a translation: a machine made it, and it is released as CC0. |
| `type` | `string` | No |  |
| `urantiaParallels` | `table` | No |  |

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

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Search():create({
  q = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Search():list({ q = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TableOfContentEntity

```lua
local table_of_content = client:TableOfContent(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `parts` | `table` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:TableOfContent():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TableOfContentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ToolEntity

```lua
local tool = client:Tool(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ToolEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WorkEntity

```lua
local work = client:Work(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `table` | Yes |  |
| `id` | `string` | Yes | The work id: "bible", or the slug of a text such as "dhammapada". |
| `kind` | `string` | Yes | "scripture": read as sacred by its tradition. |
| `limit` | `number` | No |  |
| `match` | `string` | No | Keyword search: how it matched. |
| `meta` | `table` | Yes |  |
| `page` | `number` | No |  |
| `q` | `string` | Yes |  |
| `refPrefix` | `string|nil` | Yes | The prefix of its references, such as "Dhp". |
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
| `urantiaParallels` | `table` | Yes | The nearest Urantia paragraphs (semantic parallels, not curated ones). |
| `urantiaSection` | `string|nil` | Yes |  |
| `url` | `string|nil` | Yes | The public page that holds the text, or null. |
| `work` | `string` | No | One work only: "bible" or a work id such as "dhammapada". |
| `year` | `number|nil` | Yes |  |

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

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Work():create({
  q = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Work():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Work():load({ ref = "ref", work = "work" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorkEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
  },
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


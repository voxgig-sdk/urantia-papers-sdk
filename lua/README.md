# UrantiaPapers Lua SDK



The Lua SDK for the UrantiaPapers API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Audio()` — each with the same small set of operations (`list`, `load`, `create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/urantia-papers-sdk/tags)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("urantia-papers_sdk")

local client = sdk.new()
```

### 3. Load an audio

`load` returns the entity; `data_get()` reads its record.

```lua
local audio, err = client:Audio():load({ id = "example_id" })
if err then error(err) end
local rec = audio:data_get()
print(rec["id"])
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local embedding, err = client:Embedding():load({ id = "example_id" })
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Embedding():load({ id = "test01" })
-- result is the entity; data_get() reads its mock record; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
URANTIA_PAPERS_TEST_LIVE=TRUE
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### UrantiaPapersSDK

```lua
local sdk = require("urantia-papers_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### UrantiaPapersSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Audio` | `(data) -> AudioEntity` | Create an Audio entity instance. |
| `Bible` | `(data) -> BibleEntity` | Create a Bible entity instance. |
| `Citation` | `(data) -> CitationEntity` | Create a Citation entity instance. |
| `Embedding` | `(data) -> EmbeddingEntity` | Create an Embedding entity instance. |
| `Entity` | `(data) -> EntityEntity` | Create an Entity entity instance. |
| `Feedback` | `(data) -> FeedbackEntity` | Create a Feedback entity instance. |
| `Language` | `(data) -> LanguageEntity` | Create a Language entity instance. |
| `Ogn` | `(data) -> OgnEntity` | Create an Ogn entity instance. |
| `Paper` | `(data) -> PaperEntity` | Create a Paper entity instance. |
| `Paragraph` | `(data) -> ParagraphEntity` | Create a Paragraph entity instance. |
| `Quote` | `(data) -> QuoteEntity` | Create a Quote entity instance. |
| `Scripture` | `(data) -> ScriptureEntity` | Create a Scripture entity instance. |
| `Search` | `(data) -> SearchEntity` | Create a Search entity instance. |
| `TableOfContent` | `(data) -> TableOfContentEntity` | Create a TableOfContent entity instance. |
| `Tool` | `(data) -> ToolEntity` | Create a Tool entity instance. |
| `Work` | `(data) -> WorkEntity` | Create a Work entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria, and return it. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria, one per record. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity, and return it. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` | the entity, whose `data_get()` reads its record (a `table`) |
| `list` | an array (`table`) of entities, one per record |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local audio, err = client:Audio():load({ id = "example_id" })
    if err then error(err) end
    -- audio is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Audio

| Field | Description |
| --- | --- |
| `audio` |  |
| `id` |  |

Operations: Load.

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

Operations: Create, List, Load.

API path: `/bible/search/semantic`

#### Citation

| Field | Description |
| --- | --- |
| `citation` |  |
| `ref` |  |
| `style` |  |

Operations: Load.

API path: `/cite`

#### Embedding

| Field | Description |
| --- | --- |
| `dimensions` |  |
| `embedding` |  |
| `id` |  |
| `model` |  |
| `standardReferenceId` |  |

Operations: Load.

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

Operations: List, Load.

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

Operations: Create.

API path: `/feedback`

#### Language

| Field | Description |
| --- | --- |
| `code` |  |
| `entityCount` |  |
| `name` |  |
| `paragraphCount` |  |

Operations: List.

API path: `/languages`

#### Ogn

| Field | Description |
| --- | --- |

Operations: Load.

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

Operations: List, Load.

API path: `/papers/{id}/sections`

#### Paragraph

| Field | Description |
| --- | --- |
| `data` |  |
| `id` |  |
| `navigation` |  |

Operations: Load.

API path: `/paragraphs/{ref}`

#### Quote

| Field | Description |
| --- | --- |

Operations: Create.

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

Operations: Create, List, Load.

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

Operations: Create, List.

API path: `/search`

#### TableOfContent

| Field | Description |
| --- | --- |
| `parts` |  |

Operations: Load.

API path: `/toc`

#### Tool

| Field | Description |
| --- | --- |

Operations: List.

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

Operations: Create, List, Load.

API path: `/works/search`



## Entities


### Audio

Create an instance: `local audio = client:Audio(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audio` | `table|nil` |  |
| `id` | `string` |  |

#### Example: Load

```lua
local audio, err = client:Audio():load({ id = "audio_id" })
```


### Bible

Create an instance: `local bible = client:Bible(nil)`

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
| `chunk` | `table` |  |
| `data` | `table` |  |
| `fullName` | `string` |  |
| `id` | `string` |  |
| `limit` | `number` |  |
| `meta` | `table` |  |
| `page` | `number` |  |
| `q` | `string` |  |
| `reference` | `string` |  |
| `text` | `string` |  |
| `translation` | `string` |  |
| `urantiaParallelLimit` | `number` |  |
| `urantiaParallels` | `table` |  |
| `verse` | `number` |  |
| `verseCount` | `number` |  |
| `verses` | `table` |  |

#### Example: Load

```lua
local bible, err = client:Bible():load({ id = "bible_id" })
```

#### Example: List

```lua
local bibles, err = client:Bible():list()
```

#### Example: Create

```lua
local bible, err = client:Bible():create({
  q = "example_q", -- string
})
```


### Citation

Create an instance: `local citation = client:Citation(nil)`

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

```lua
local citation, err = client:Citation():load({ ref = "ref" })
```


### Embedding

Create an instance: `local embedding = client:Embedding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dimensions` | `number` |  |
| `embedding` | `table` |  |
| `id` | `string` |  |
| `model` | `string` |  |
| `standardReferenceId` | `string` |  |

#### Example: Load

```lua
local embedding, err = client:Embedding():load({ id = "embedding_id" })
```


### Entity

Create an instance: `local entity = client:Entity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aliases` | `table|nil` |  |
| `citationCount` | `number` | Number of citations in the source index. |
| `description` | `string|nil` |  |
| `id` | `string` |  |
| `language` | `string` |  |
| `name` | `string` |  |
| `seeAlso` | `table|nil` | Related entry names. |
| `sense` | `string|nil` | For a concept with a lowercase name: "special" when the papers coin the word or use it in their own sense, "ordinary" when they use it in its everyday sense. |
| `type` | `string` |  |

#### Example: Load

```lua
local entity, err = client:Entity():load({ id = "entity_id" })
```

#### Example: List

```lua
local entitys, err = client:Entity():list()
```


### Feedback

Create an instance: `local feedback = client:Feedback(nil)`

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

```lua
local feedback, err = client:Feedback():create({
  category = "example_category", -- string
  message = "example_message", -- string
})
```


### Language

Create an instance: `local language = client:Language(nil)`

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

```lua
local languages, err = client:Language():list()
```


### Ogn

Create an instance: `local ogn = client:Ogn(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local ogn, err = client:Ogn():load({ ref = "ref" })
```


### Paper

Create an instance: `local paper = client:Paper(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `labels` | `table|nil` |  |
| `paper` | `table` |  |
| `paragraphs` | `table` |  |
| `partId` | `string` |  |
| `sortId` | `string` |  |
| `title` | `string` |  |
| `topEntities` | `table` |  |
| `video` | `table|nil` |  |

#### Example: Load

```lua
local paper, err = client:Paper():load({ id = "paper_id" })
```

#### Example: List

```lua
local papers, err = client:Paper():list()
```


### Paragraph

Create an instance: `local paragraph = client:Paragraph(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `id` | `string` |  |
| `navigation` | `table` |  |

#### Example: Load

```lua
local paragraph, err = client:Paragraph():load({ id = "paragraph_id" })
```


### Quote

Create an instance: `local quote = client:Quote(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local quote, err = client:Quote():create({
})
```


### Scripture

Create an instance: `local scripture = client:Scripture(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chunk` | `table` |  |
| `closest` | `table` |  |
| `consensus` | `number` | Mean percentile across the texts, 0 to 1 |
| `corpus` | `table` | Corpus id, slug, or ref prefix, e.g. |
| `data` | `table` |  |
| `distance` | `number` | 1 minus the highest percentile, 0 to 1 |
| `divisionLabel` | `string` |  |
| `divisions` | `table` |  |
| `gap` | `number` | How far this text's percentile is above the paragraph's mean across texts |
| `id` | `string` |  |
| `license` | `string` |  |
| `limit` | `number` |  |
| `meta` | `table` |  |
| `notes` | `string|nil` | How the text is numbered or selected |
| `page` | `number` |  |
| `pages` | `table` | The reading pages of the work, in order: one division, or one subdivision for a work with three reference levels. |
| `paragraph` | `table` |  |
| `passage` | `table` |  |
| `passageCount` | `number` |  |
| `passages` | `table` |  |
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
| `urantiaParallels` | `table` |  |
| `urantiaSection` | `string|nil` | The Paper 131 section headed with this religion, or null when Paper 131 has no such heading |
| `year` | `number` |  |

#### Example: Load

```lua
local scripture, err = client:Scripture():load({ id = "scripture_id" })
```

#### Example: List

```lua
local scriptures, err = client:Scripture():list()
```

#### Example: Create

```lua
local scripture, err = client:Scripture():create({
  q = "example_q", -- string
})
```


### Search

Create an instance: `local search = client:Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audio` | `table|nil` |  |
| `bibleParallels` | `table` |  |
| `data` | `table` |  |
| `entities` | `table` |  |
| `htmlText` | `string` |  |
| `id` | `string` |  |
| `include` | `string` |  |
| `labels` | `table|nil` |  |
| `language` | `string` |  |
| `limit` | `number` |  |
| `match` | `string` | How the paragraph matched: reference (the query named it), exact (the whole phrase), all (every word), near (every word after a typo fix, see meta.didYouMean), most (two thirds of the words or more; with type `or`, some of the words). |
| `meta` | `table` |  |
| `page` | `number` |  |
| `paperId` | `string` |  |
| `paperTitle` | `string` |  |
| `paragraphId` | `string` |  |
| `partId` | `string` |  |
| `q` | `string` |  |
| `rank` | `number` |  |
| `scriptureParallels` | `table` |  |
| `scriptureScores` | `table|nil` |  |
| `sectionId` | `string|nil` |  |
| `sectionTitle` | `string|nil` |  |
| `sortId` | `string` |  |
| `standardReferenceId` | `string` |  |
| `text` | `string` |  |
| `translation` | `table` | Present only when the text is a translation: a machine made it, and it is released as CC0. |
| `type` | `string` |  |
| `urantiaParallels` | `table` |  |

#### Example: List

```lua
local searchs, err = client:Search():list({ q = "example" })
```

#### Example: Create

```lua
local search, err = client:Search():create({
  q = "example_q", -- string
})
```


### TableOfContent

Create an instance: `local table_of_content = client:TableOfContent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `parts` | `table` |  |

#### Example: Load

```lua
local table_of_content, err = client:TableOfContent():load()
```


### Tool

Create an instance: `local tool = client:Tool(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |


### Work

Create an instance: `local work = client:Work(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `id` | `string` | The work id: "bible", or the slug of a text such as "dhammapada". |
| `kind` | `string` | "scripture": read as sacred by its tradition. |
| `limit` | `number` |  |
| `match` | `string` | Keyword search: how it matched. |
| `meta` | `table` |  |
| `page` | `number` |  |
| `q` | `string` |  |
| `refPrefix` | `string|nil` | The prefix of its references, such as "Dhp". |
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
| `urantiaParallels` | `table` | The nearest Urantia paragraphs (semantic parallels, not curated ones). |
| `urantiaSection` | `string|nil` |  |
| `url` | `string|nil` | The public page that holds the text, or null. |
| `work` | `string` | One work only: "bible" or a work id such as "dhammapada". |
| `year` | `number|nil` |  |

#### Example: Load

```lua
local work, err = client:Work():load({ ref = "ref", work = "work" })
```

#### Example: List

```lua
local works, err = client:Work():list()
```

#### Example: Create

```lua
local work, err = client:Work():create({
  q = "example_q", -- string
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── urantia-papers_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`urantia-papers_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local embedding = client:Embedding()
embedding:load({ id = "example_id" })

-- embedding:data_get() now returns the embedding data from the last load
-- embedding:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

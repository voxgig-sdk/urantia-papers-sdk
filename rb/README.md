# UrantiaPapers Ruby SDK



The Ruby SDK for the UrantiaPapers API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Audio` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/urantia-papers-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/urantia-papers-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-urantia-papers-sdk", path: "./urantia-papers-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "UrantiaPapers_sdk"

client = UrantiaPapersSDK.new
```

### 3. Load an audio

```ruby
begin
  # load returns the ENTITY — call data_get for the Audio record (raises on error).
  audio = client.Audio.load({ "id" => "example_id" })
  puts audio.data_get
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  embedding = client.Embedding.load({ "id" => "example_id" })
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = UrantiaPapersSDK.test({
  "entity" => { "embedding" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# data_get reads its mock record.
embedding = client.Embedding.load({ "id" => "test01" })
puts embedding.data_get
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = UrantiaPapersSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### UrantiaPapersSDK

```ruby
require_relative "UrantiaPapers_sdk"
client = UrantiaPapersSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = UrantiaPapersSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### UrantiaPapersSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`UrantiaPapersError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `audio = client.Audio`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audio` | `Object` |  |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Audio record (raises on error).
audio = client.Audio.load({ "id" => "audio_id" })
```


### Bible

Create an instance: `bible = client.Bible`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abbr` | `String` |  |
| `bookCode` | `String` |  |
| `bookName` | `String` |  |
| `bookOrder` | `Integer` |  |
| `canon` | `String` |  |
| `chapter` | `Integer` |  |
| `chapterCount` | `Integer` |  |
| `chunk` | `Hash` |  |
| `data` | `Array` |  |
| `fullName` | `String` |  |
| `id` | `String` |  |
| `limit` | `Integer` |  |
| `meta` | `Hash` |  |
| `page` | `Integer` |  |
| `q` | `String` |  |
| `reference` | `String` |  |
| `text` | `String` |  |
| `translation` | `String` |  |
| `urantiaParallelLimit` | `Integer` |  |
| `urantiaParallels` | `Array` |  |
| `verse` | `Integer` |  |
| `verseCount` | `Integer` |  |
| `verses` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Bible record (raises on error).
bible = client.Bible.load({ "id" => "bible_id" })
```

#### Example: List

```ruby
# list returns an Array of Bible entities, one per record (raises on error).
bibles = client.Bible.list
bibles.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
bible = client.Bible.create({
  "q" => "example_q", # String
})
```


### Citation

Create an instance: `citation = client.Citation`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `citation` | `String` |  |
| `ref` | `String` |  |
| `style` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Citation record (raises on error).
citation = client.Citation.load({ "ref" => "ref" })
```


### Embedding

Create an instance: `embedding = client.Embedding`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dimensions` | `Integer` |  |
| `embedding` | `Array` |  |
| `id` | `String` |  |
| `model` | `String` |  |
| `standardReferenceId` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Embedding record (raises on error).
embedding = client.Embedding.load({ "id" => "embedding_id" })
```


### Entity

Create an instance: `entity = client.Entity`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aliases` | `Object` |  |
| `citationCount` | `Integer` | Number of citations in the source index. |
| `description` | `Object` |  |
| `id` | `String` |  |
| `language` | `String` |  |
| `name` | `String` |  |
| `seeAlso` | `Object` | Related entry names. |
| `sense` | `Object` | For a concept with a lowercase name: "special" when the papers coin the word or use it in their own sense, "ordinary" when they use it in its everyday sense. |
| `type` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Entity record (raises on error).
entity = client.Entity.load({ "id" => "entity_id" })
```

#### Example: List

```ruby
# list returns an Array of Entity entities, one per record (raises on error).
entitys = client.Entity.list
entitys.each { |item| puts item.data_get }
```


### Feedback

Create an instance: `feedback = client.Feedback`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `String` |  |
| `client` | `String` |  |
| `contact` | `String` |  |
| `endpoint` | `String` |  |
| `message` | `String` |  |
| `pageUrl` | `String` |  |
| `ref` | `String` |  |
| `requestId` | `String` |  |

#### Example: Create

```ruby
feedback = client.Feedback.create({
  "category" => "example_category", # String
  "message" => "example_message", # String
})
```


### Language

Create an instance: `language = client.Language`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `String` |  |
| `entityCount` | `Integer` |  |
| `name` | `String` |  |
| `paragraphCount` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of Language entities, one per record (raises on error).
languages = client.Language.list
languages.each { |item| puts item.data_get }
```


### Ogn

Create an instance: `ogn = client.Ogn`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Ogn record (raises on error).
ogn = client.Ogn.load({ "ref" => "ref" })
```


### Paper

Create an instance: `paper = client.Paper`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `labels` | `Object` |  |
| `paper` | `Hash` |  |
| `paragraphs` | `Array` |  |
| `partId` | `String` |  |
| `sortId` | `String` |  |
| `title` | `String` |  |
| `topEntities` | `Array` |  |
| `video` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Paper record (raises on error).
paper = client.Paper.load({ "id" => "paper_id" })
```

#### Example: List

```ruby
# list returns an Array of Paper entities, one per record (raises on error).
papers = client.Paper.list
papers.each { |item| puts item.data_get }
```


### Paragraph

Create an instance: `paragraph = client.Paragraph`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Hash` |  |
| `id` | `String` |  |
| `navigation` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Paragraph record (raises on error).
paragraph = client.Paragraph.load({ "id" => "paragraph_id" })
```


### Quote

Create an instance: `quote = client.Quote`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
quote = client.Quote.create({
})
```


### Scripture

Create an instance: `scripture = client.Scripture`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chunk` | `Hash` |  |
| `closest` | `Array` |  |
| `consensus` | `Float` | Mean percentile across the texts, 0 to 1 |
| `corpus` | `Hash` | Corpus id, slug, or ref prefix, e.g. |
| `data` | `Array` |  |
| `distance` | `Float` | 1 minus the highest percentile, 0 to 1 |
| `divisionLabel` | `String` |  |
| `divisions` | `Array` |  |
| `gap` | `Float` | How far this text's percentile is above the paragraph's mean across texts |
| `id` | `String` |  |
| `license` | `String` |  |
| `limit` | `Integer` |  |
| `meta` | `Hash` |  |
| `notes` | `Object` | How the text is numbered or selected |
| `page` | `Integer` |  |
| `pages` | `Array` | The reading pages of the work, in order: one division, or one subdivision for a work with three reference levels. |
| `paragraph` | `Hash` |  |
| `passage` | `Hash` |  |
| `passageCount` | `Integer` |  |
| `passages` | `Array` |  |
| `percentile` | `Float` |  |
| `q` | `String` |  |
| `refLevels` | `Integer` | Numbers in a full ref: 1 for `Dhp 183`, 2 for `BG 2.47`, 3 for `Epictetus 3.22.5` |
| `refPrefix` | `String` |  |
| `religion` | `String` |  |
| `similarity` | `Float` | text-embedding-3-large cosine similarity |
| `similaritySmall` | `Float` | text-embedding-3-small cosine similarity |
| `slug` | `String` |  |
| `sourceUrl` | `String` |  |
| `textsClose` | `Integer` | Texts that have this paragraph in their top 10% |
| `title` | `String` |  |
| `translator` | `String` |  |
| `unitLabel` | `String` |  |
| `urantiaParallelLimit` | `Integer` |  |
| `urantiaParallels` | `Array` |  |
| `urantiaSection` | `Object` | The Paper 131 section headed with this religion, or null when Paper 131 has no such heading |
| `year` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Scripture record (raises on error).
scripture = client.Scripture.load({ "id" => "scripture_id" })
```

#### Example: List

```ruby
# list returns an Array of Scripture entities, one per record (raises on error).
scriptures = client.Scripture.list
scriptures.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
scripture = client.Scripture.create({
  "q" => "example_q", # String
})
```


### Search

Create an instance: `search = client.Search`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audio` | `Object` |  |
| `bibleParallels` | `Array` |  |
| `data` | `Array` |  |
| `entities` | `Array` |  |
| `htmlText` | `String` |  |
| `id` | `String` |  |
| `include` | `String` |  |
| `labels` | `Object` |  |
| `language` | `String` |  |
| `limit` | `Integer` |  |
| `match` | `String` | How the paragraph matched: reference (the query named it), exact (the whole phrase), all (every word), near (every word after a typo fix, see meta.didYouMean), most (two thirds of the words or more; with type `or`, some of the words). |
| `meta` | `Hash` |  |
| `page` | `Integer` |  |
| `paperId` | `String` |  |
| `paperTitle` | `String` |  |
| `paragraphId` | `String` |  |
| `partId` | `String` |  |
| `q` | `String` |  |
| `rank` | `Float` |  |
| `scriptureParallels` | `Array` |  |
| `scriptureScores` | `Object` |  |
| `sectionId` | `Object` |  |
| `sectionTitle` | `Object` |  |
| `sortId` | `String` |  |
| `standardReferenceId` | `String` |  |
| `text` | `String` |  |
| `translation` | `Hash` | Present only when the text is a translation: a machine made it, and it is released as CC0. |
| `type` | `String` |  |
| `urantiaParallels` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Search entities, one per record (raises on error).
searchs = client.Search.list({ "q" => "example" })
searchs.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
search = client.Search.create({
  "q" => "example_q", # String
})
```


### TableOfContent

Create an instance: `table_of_content = client.TableOfContent`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `parts` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the TableOfContent record (raises on error).
table_of_content = client.TableOfContent.load()
```


### Tool

Create an instance: `tool = client.Tool`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |


### Work

Create an instance: `work = client.Work`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Array` |  |
| `id` | `String` | The work id: "bible", or the slug of a text such as "dhammapada". |
| `kind` | `String` | "scripture": read as sacred by its tradition. |
| `limit` | `Integer` |  |
| `match` | `String` | Keyword search: how it matched. |
| `meta` | `Hash` |  |
| `page` | `Integer` |  |
| `q` | `String` |  |
| `refPrefix` | `Object` | The prefix of its references, such as "Dhp". |
| `reference` | `String` | "John 3:16", "Dhp 183", "BG 2.47-49" (a chunk in semantic search). |
| `religion` | `String` | The same as `tradition`, kept for older clients. |
| `similarity` | `Float` | Semantic search: cosine similarity. |
| `strength` | `String` | How close the result is: strong (most right answers score this), related, or weak (likely off the topic). |
| `summary` | `String` | One plain sentence on what the work is. |
| `text` | `String` |  |
| `title` | `String` |  |
| `tradition` | `String` | The people or the religion of the work: "Buddhist", "Norse", "Ancient Greek". |
| `translator` | `String` |  |
| `unitLabel` | `String` | The word for one unit of the work: "verse", "section", "pauri". |
| `units` | `Integer` |  |
| `urantiaParallelLimit` | `Integer` |  |
| `urantiaParallels` | `Array` | The nearest Urantia paragraphs (semantic parallels, not curated ones). |
| `urantiaSection` | `Object` |  |
| `url` | `Object` | The public page that holds the text, or null. |
| `work` | `String` | One work only: "bible" or a work id such as "dhammapada". |
| `year` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Work record (raises on error).
work = client.Work.load({ "ref" => "ref", "work" => "work" })
```

#### Example: List

```ruby
# list returns an Array of Work entities, one per record (raises on error).
works = client.Work.list
works.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
work = client.Work.create({
  "q" => "example_q", # String
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── UrantiaPapers_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`UrantiaPapers_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
embedding = client.Embedding
embedding.load({ "id" => "example_id" })

# embedding.data_get now returns the embedding data from the last load
# embedding.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

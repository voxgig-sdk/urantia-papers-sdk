# UrantiaPapers Ruby SDK Reference

Complete API reference for the UrantiaPapers Ruby SDK.


## UrantiaPapersSDK

### Constructor

```ruby
require_relative 'UrantiaPapers_sdk'

client = UrantiaPapersSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `UrantiaPapersSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = UrantiaPapersSDK.test
```


### Instance Methods

#### `Audio(data = nil)`

Create a new `Audio` entity instance. Pass `nil` for no initial data.

#### `Bible(data = nil)`

Create a new `Bible` entity instance. Pass `nil` for no initial data.

#### `Citation(data = nil)`

Create a new `Citation` entity instance. Pass `nil` for no initial data.

#### `Embedding(data = nil)`

Create a new `Embedding` entity instance. Pass `nil` for no initial data.

#### `Entity(data = nil)`

Create a new `Entity` entity instance. Pass `nil` for no initial data.

#### `Feedback(data = nil)`

Create a new `Feedback` entity instance. Pass `nil` for no initial data.

#### `Language(data = nil)`

Create a new `Language` entity instance. Pass `nil` for no initial data.

#### `Ogn(data = nil)`

Create a new `Ogn` entity instance. Pass `nil` for no initial data.

#### `Paper(data = nil)`

Create a new `Paper` entity instance. Pass `nil` for no initial data.

#### `Paragraph(data = nil)`

Create a new `Paragraph` entity instance. Pass `nil` for no initial data.

#### `Quote(data = nil)`

Create a new `Quote` entity instance. Pass `nil` for no initial data.

#### `Scripture(data = nil)`

Create a new `Scripture` entity instance. Pass `nil` for no initial data.

#### `Search(data = nil)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `TableOfContent(data = nil)`

Create a new `TableOfContent` entity instance. Pass `nil` for no initial data.

#### `Tool(data = nil)`

Create a new `Tool` entity instance. Pass `nil` for no initial data.

#### `Work(data = nil)`

Create a new `Work` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AudioEntity

```ruby
audio = client.Audio
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audio` | `Object` | Yes |  |
| `id` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Audio.load({ "id" => "audio_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AudioEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BibleEntity

```ruby
bible = client.Bible
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abbr` | `String` | Yes |  |
| `bookCode` | `String` | Yes |  |
| `bookName` | `String` | Yes |  |
| `bookOrder` | `Integer` | Yes |  |
| `canon` | `String` | Yes |  |
| `chapter` | `Integer` | Yes |  |
| `chapterCount` | `Integer` | Yes |  |
| `chunk` | `Hash` | Yes |  |
| `data` | `Array` | Yes |  |
| `fullName` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `limit` | `Integer` | No |  |
| `meta` | `Hash` | Yes |  |
| `page` | `Integer` | No |  |
| `q` | `String` | Yes |  |
| `reference` | `String` | Yes |  |
| `text` | `String` | Yes |  |
| `translation` | `String` | Yes |  |
| `urantiaParallelLimit` | `Integer` | No |  |
| `urantiaParallels` | `Array` | Yes |  |
| `verse` | `Integer` | Yes |  |
| `verseCount` | `Integer` | Yes |  |
| `verses` | `Array` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Bible.create({
  "q" => "example_q", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Bible.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Bible.load({ "id" => "bible_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BibleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CitationEntity

```ruby
citation = client.Citation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `citation` | `String` | Yes |  |
| `ref` | `String` | Yes |  |
| `style` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Citation.load({ "ref" => "ref" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CitationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EmbeddingEntity

```ruby
embedding = client.Embedding
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dimensions` | `Integer` | Yes |  |
| `embedding` | `Array` | Yes |  |
| `id` | `String` | No |  |
| `model` | `String` | Yes |  |
| `standardReferenceId` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Embedding.load({ "id" => "embedding_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EmbeddingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EntityEntity

```ruby
entity = client.Entity
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aliases` | `Object` | Yes |  |
| `citationCount` | `Integer` | Yes | Number of citations in the source index. |
| `description` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `language` | `String` | No |  |
| `name` | `String` | Yes |  |
| `seeAlso` | `Object` | Yes | Related entry names. |
| `sense` | `Object` | Yes | For a concept with a lowercase name: "special" when the papers coin the word or use it in their own sense, "ordinary" when they use it in its everyday sense. |
| `type` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Entity.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Entity.load({ "id" => "entity_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EntityEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FeedbackEntity

```ruby
feedback = client.Feedback
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `String` | Yes |  |
| `client` | `String` | No |  |
| `contact` | `String` | No |  |
| `endpoint` | `String` | No |  |
| `message` | `String` | Yes |  |
| `pageUrl` | `String` | No |  |
| `ref` | `String` | No |  |
| `requestId` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Feedback.create({
  "category" => "example_category", # String
  "message" => "example_message", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FeedbackEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LanguageEntity

```ruby
language = client.Language
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `String` | Yes |  |
| `entityCount` | `Integer` | Yes |  |
| `name` | `String` | Yes |  |
| `paragraphCount` | `Integer` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Language.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LanguageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OgnEntity

```ruby
ogn = client.Ogn
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Ogn.load({ "ref" => "ref" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OgnEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PaperEntity

```ruby
paper = client.Paper
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | Yes |  |
| `labels` | `Object` | Yes |  |
| `paper` | `Hash` | Yes |  |
| `paragraphs` | `Array` | Yes |  |
| `partId` | `String` | Yes |  |
| `sortId` | `String` | Yes |  |
| `title` | `String` | Yes |  |
| `topEntities` | `Array` | No |  |
| `video` | `Object` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Paper.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Paper.load({ "id" => "paper_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PaperEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ParagraphEntity

```ruby
paragraph = client.Paragraph
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Hash` | Yes |  |
| `id` | `String` | No |  |
| `navigation` | `Hash` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Paragraph.load({ "id" => "paragraph_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ParagraphEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## QuoteEntity

```ruby
quote = client.Quote
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Quote.create({
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `QuoteEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ScriptureEntity

```ruby
scripture = client.Scripture
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chunk` | `Hash` | Yes |  |
| `closest` | `Array` | Yes |  |
| `consensus` | `Float` | Yes | Mean percentile across the texts, 0 to 1 |
| `corpus` | `Hash` | Yes | Corpus id, slug, or ref prefix, e.g. |
| `data` | `Array` | Yes |  |
| `distance` | `Float` | Yes | 1 minus the highest percentile, 0 to 1 |
| `divisionLabel` | `String` | Yes |  |
| `divisions` | `Array` | Yes |  |
| `gap` | `Float` | Yes | How far this text's percentile is above the paragraph's mean across texts |
| `id` | `String` | Yes |  |
| `license` | `String` | Yes |  |
| `limit` | `Integer` | No |  |
| `meta` | `Hash` | Yes |  |
| `notes` | `Object` | Yes | How the text is numbered or selected |
| `page` | `Integer` | No |  |
| `pages` | `Array` | Yes | The reading pages of the work, in order: one division, or one subdivision for a work with three reference levels. |
| `paragraph` | `Hash` | Yes |  |
| `passage` | `Hash` | Yes |  |
| `passageCount` | `Integer` | Yes |  |
| `passages` | `Array` | Yes |  |
| `percentile` | `Float` | Yes |  |
| `q` | `String` | Yes |  |
| `refLevels` | `Integer` | Yes | Numbers in a full ref: 1 for `Dhp 183`, 2 for `BG 2.47`, 3 for `Epictetus 3.22.5` |
| `refPrefix` | `String` | Yes |  |
| `religion` | `String` | Yes |  |
| `similarity` | `Float` | Yes | text-embedding-3-large cosine similarity |
| `similaritySmall` | `Float` | Yes | text-embedding-3-small cosine similarity |
| `slug` | `String` | Yes |  |
| `sourceUrl` | `String` | Yes |  |
| `textsClose` | `Integer` | Yes | Texts that have this paragraph in their top 10% |
| `title` | `String` | Yes |  |
| `translator` | `String` | Yes |  |
| `unitLabel` | `String` | Yes |  |
| `urantiaParallelLimit` | `Integer` | No |  |
| `urantiaParallels` | `Array` | Yes |  |
| `urantiaSection` | `Object` | Yes | The Paper 131 section headed with this religion, or null when Paper 131 has no such heading |
| `year` | `Integer` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Scripture.create({
  "q" => "example_q", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Scripture.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Scripture.load({ "id" => "scripture_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ScriptureEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SearchEntity

```ruby
search = client.Search
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audio` | `Object` | Yes |  |
| `bibleParallels` | `Array` | No |  |
| `data` | `Array` | Yes |  |
| `entities` | `Array` | No |  |
| `htmlText` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `include` | `String` | No |  |
| `labels` | `Object` | Yes |  |
| `language` | `String` | No |  |
| `limit` | `Integer` | No |  |
| `match` | `String` | Yes | How the paragraph matched: reference (the query named it), exact (the whole phrase), all (every word), near (every word after a typo fix, see meta.didYouMean), most (two thirds of the words or more; with type `or`, some of the words). |
| `meta` | `Hash` | Yes |  |
| `page` | `Integer` | No |  |
| `paperId` | `String` | No |  |
| `paperTitle` | `String` | Yes |  |
| `paragraphId` | `String` | Yes |  |
| `partId` | `String` | No |  |
| `q` | `String` | Yes |  |
| `rank` | `Float` | Yes |  |
| `scriptureParallels` | `Array` | No |  |
| `scriptureScores` | `Object` | Yes |  |
| `sectionId` | `Object` | Yes |  |
| `sectionTitle` | `Object` | Yes |  |
| `sortId` | `String` | Yes |  |
| `standardReferenceId` | `String` | Yes |  |
| `text` | `String` | Yes |  |
| `translation` | `Hash` | Yes | Present only when the text is a translation: a machine made it, and it is released as CC0. |
| `type` | `String` | No |  |
| `urantiaParallels` | `Array` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Search.create({
  "q" => "example_q", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Search.list({ "q" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TableOfContentEntity

```ruby
table_of_content = client.TableOfContent
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `parts` | `Array` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.TableOfContent.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TableOfContentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ToolEntity

```ruby
tool = client.Tool
```

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ToolEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WorkEntity

```ruby
work = client.Work
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Array` | Yes |  |
| `id` | `String` | Yes | The work id: "bible", or the slug of a text such as "dhammapada". |
| `kind` | `String` | Yes | "scripture": read as sacred by its tradition. |
| `limit` | `Integer` | No |  |
| `match` | `String` | No | Keyword search: how it matched. |
| `meta` | `Hash` | Yes |  |
| `page` | `Integer` | No |  |
| `q` | `String` | Yes |  |
| `refPrefix` | `Object` | Yes | The prefix of its references, such as "Dhp". |
| `reference` | `String` | Yes | "John 3:16", "Dhp 183", "BG 2.47-49" (a chunk in semantic search). |
| `religion` | `String` | Yes | The same as `tradition`, kept for older clients. |
| `similarity` | `Float` | No | Semantic search: cosine similarity. |
| `strength` | `String` | No | How close the result is: strong (most right answers score this), related, or weak (likely off the topic). |
| `summary` | `String` | Yes | One plain sentence on what the work is. |
| `text` | `String` | Yes |  |
| `title` | `String` | Yes |  |
| `tradition` | `String` | Yes | The people or the religion of the work: "Buddhist", "Norse", "Ancient Greek". |
| `translator` | `String` | Yes |  |
| `unitLabel` | `String` | Yes | The word for one unit of the work: "verse", "section", "pauri". |
| `units` | `Integer` | Yes |  |
| `urantiaParallelLimit` | `Integer` | No |  |
| `urantiaParallels` | `Array` | Yes | The nearest Urantia paragraphs (semantic parallels, not curated ones). |
| `urantiaSection` | `Object` | Yes |  |
| `url` | `Object` | Yes | The public page that holds the text, or null. |
| `work` | `String` | No | One work only: "bible" or a work id such as "dhammapada". |
| `year` | `Object` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Work.create({
  "q" => "example_q", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Work.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Work.load({ "ref" => "ref", "work" => "work" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WorkEntity` instance with the same client and
options.

#### `get_name -> String`

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

```ruby
client = UrantiaPapersSDK.new({
  "feature" => {
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
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


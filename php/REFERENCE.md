# UrantiaPapers PHP SDK Reference

Complete API reference for the UrantiaPapers PHP SDK.


## UrantiaPapersSDK

### Constructor

```php
require_once __DIR__ . '/urantiapapers_sdk.php';

$client = new UrantiaPapersSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `UrantiaPapersSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = UrantiaPapersSDK::test();
```


### Instance Methods

#### `Audio($data = null)`

Create a new `AudioEntity` instance. Pass `null` for no initial data.

#### `Bible($data = null)`

Create a new `BibleEntity` instance. Pass `null` for no initial data.

#### `Citation($data = null)`

Create a new `CitationEntity` instance. Pass `null` for no initial data.

#### `Embedding($data = null)`

Create a new `EmbeddingEntity` instance. Pass `null` for no initial data.

#### `Entity($data = null)`

Create a new `EntityEntity` instance. Pass `null` for no initial data.

#### `Feedback($data = null)`

Create a new `FeedbackEntity` instance. Pass `null` for no initial data.

#### `Language($data = null)`

Create a new `LanguageEntity` instance. Pass `null` for no initial data.

#### `Ogn($data = null)`

Create a new `OgnEntity` instance. Pass `null` for no initial data.

#### `Paper($data = null)`

Create a new `PaperEntity` instance. Pass `null` for no initial data.

#### `Paragraph($data = null)`

Create a new `ParagraphEntity` instance. Pass `null` for no initial data.

#### `Quote($data = null)`

Create a new `QuoteEntity` instance. Pass `null` for no initial data.

#### `Scripture($data = null)`

Create a new `ScriptureEntity` instance. Pass `null` for no initial data.

#### `Search($data = null)`

Create a new `SearchEntity` instance. Pass `null` for no initial data.

#### `TableOfContent($data = null)`

Create a new `TableOfContentEntity` instance. Pass `null` for no initial data.

#### `Tool($data = null)`

Create a new `ToolEntity` instance. Pass `null` for no initial data.

#### `Work($data = null)`

Create a new `WorkEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): UrantiaPapersUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AudioEntity

```php
$audio = $client->Audio();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audio` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Audio()->load(["id" => "audio_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AudioEntity`

Create a new `AudioEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BibleEntity

```php
$bible = $client->Bible();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abbr` | `string` | Yes |  |
| `bookCode` | `string` | Yes |  |
| `bookName` | `string` | Yes |  |
| `bookOrder` | `int` | Yes |  |
| `canon` | `string` | Yes |  |
| `chapter` | `int` | Yes |  |
| `chapterCount` | `int` | Yes |  |
| `chunk` | `array` | Yes |  |
| `data` | `array` | Yes |  |
| `fullName` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `limit` | `int` | No |  |
| `meta` | `array` | Yes |  |
| `page` | `int` | No |  |
| `q` | `string` | Yes |  |
| `reference` | `string` | Yes |  |
| `text` | `string` | Yes |  |
| `translation` | `string` | Yes |  |
| `urantiaParallelLimit` | `int` | No |  |
| `urantiaParallels` | `array` | Yes |  |
| `verse` | `int` | Yes |  |
| `verseCount` | `int` | Yes |  |
| `verses` | `array` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Bible()->create([
  "q" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Bible()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Bible()->load(["id" => "bible_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BibleEntity`

Create a new `BibleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CitationEntity

```php
$citation = $client->Citation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `citation` | `string` | Yes |  |
| `ref` | `string` | Yes |  |
| `style` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Citation()->load(["ref" => "ref"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CitationEntity`

Create a new `CitationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EmbeddingEntity

```php
$embedding = $client->Embedding();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dimensions` | `int` | Yes |  |
| `embedding` | `array` | Yes |  |
| `id` | `string` | No |  |
| `model` | `string` | Yes |  |
| `standardReferenceId` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Embedding()->load(["id" => "embedding_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EmbeddingEntity`

Create a new `EmbeddingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EntityEntity

```php
$entity = $client->Entity();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aliases` | `mixed` | Yes |  |
| `citationCount` | `int` | Yes | Number of citations in the source index. |
| `description` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `language` | `string` | No |  |
| `name` | `string` | Yes |  |
| `seeAlso` | `mixed` | Yes | Related entry names. |
| `sense` | `mixed` | Yes | For a concept with a lowercase name: "special" when the papers coin the word or use it in their own sense, "ordinary" when they use it in its everyday sense. |
| `type` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Entity()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Entity()->load(["id" => "entity_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EntityEntity`

Create a new `EntityEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FeedbackEntity

```php
$feedback = $client->Feedback();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Feedback()->create([
  "category" => null, // string
  "message" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FeedbackEntity`

Create a new `FeedbackEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LanguageEntity

```php
$language = $client->Language();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | Yes |  |
| `entityCount` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `paragraphCount` | `int` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Language()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LanguageEntity`

Create a new `LanguageEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OgnEntity

```php
$ogn = $client->Ogn();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Ogn()->load(["ref" => "ref"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OgnEntity`

Create a new `OgnEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PaperEntity

```php
$paper = $client->Paper();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `labels` | `mixed` | Yes |  |
| `paper` | `array` | Yes |  |
| `paragraphs` | `array` | Yes |  |
| `partId` | `string` | Yes |  |
| `sortId` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `topEntities` | `array` | No |  |
| `video` | `mixed` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Paper()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Paper()->load(["id" => "paper_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PaperEntity`

Create a new `PaperEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ParagraphEntity

```php
$paragraph = $client->Paragraph();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `array` | Yes |  |
| `id` | `string` | No |  |
| `navigation` | `array` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Paragraph()->load(["id" => "paragraph_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ParagraphEntity`

Create a new `ParagraphEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## QuoteEntity

```php
$quote = $client->Quote();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Quote()->create([
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): QuoteEntity`

Create a new `QuoteEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ScriptureEntity

```php
$scripture = $client->Scripture();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chunk` | `array` | Yes |  |
| `closest` | `array` | Yes |  |
| `consensus` | `float` | Yes | Mean percentile across the texts, 0 to 1 |
| `corpus` | `array` | Yes | Corpus id, slug, or ref prefix, e.g. |
| `data` | `array` | Yes |  |
| `distance` | `float` | Yes | 1 minus the highest percentile, 0 to 1 |
| `divisionLabel` | `string` | Yes |  |
| `divisions` | `array` | Yes |  |
| `gap` | `float` | Yes | How far this text's percentile is above the paragraph's mean across texts |
| `id` | `string` | Yes |  |
| `license` | `string` | Yes |  |
| `limit` | `int` | No |  |
| `meta` | `array` | Yes |  |
| `notes` | `mixed` | Yes | How the text is numbered or selected |
| `page` | `int` | No |  |
| `pages` | `array` | Yes | The reading pages of the work, in order: one division, or one subdivision for a work with three reference levels. |
| `paragraph` | `array` | Yes |  |
| `passage` | `array` | Yes |  |
| `passageCount` | `int` | Yes |  |
| `passages` | `array` | Yes |  |
| `percentile` | `float` | Yes |  |
| `q` | `string` | Yes |  |
| `refLevels` | `int` | Yes | Numbers in a full ref: 1 for `Dhp 183`, 2 for `BG 2.47`, 3 for `Epictetus 3.22.5` |
| `refPrefix` | `string` | Yes |  |
| `religion` | `string` | Yes |  |
| `similarity` | `float` | Yes | text-embedding-3-large cosine similarity |
| `similaritySmall` | `float` | Yes | text-embedding-3-small cosine similarity |
| `slug` | `string` | Yes |  |
| `sourceUrl` | `string` | Yes |  |
| `textsClose` | `int` | Yes | Texts that have this paragraph in their top 10% |
| `title` | `string` | Yes |  |
| `translator` | `string` | Yes |  |
| `unitLabel` | `string` | Yes |  |
| `urantiaParallelLimit` | `int` | No |  |
| `urantiaParallels` | `array` | Yes |  |
| `urantiaSection` | `mixed` | Yes | The Paper 131 section headed with this religion, or null when Paper 131 has no such heading |
| `year` | `int` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Scripture()->create([
  "q" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Scripture()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Scripture()->load(["id" => "scripture_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ScriptureEntity`

Create a new `ScriptureEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SearchEntity

```php
$search = $client->Search();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audio` | `mixed` | Yes |  |
| `bibleParallels` | `array` | No |  |
| `data` | `array` | Yes |  |
| `entities` | `array` | No |  |
| `htmlText` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `include` | `string` | No |  |
| `labels` | `mixed` | Yes |  |
| `language` | `string` | No |  |
| `limit` | `int` | No |  |
| `match` | `string` | Yes | How the paragraph matched: reference (the query named it), exact (the whole phrase), all (every word), near (every word after a typo fix, see meta.didYouMean), most (two thirds of the words or more; with type `or`, some of the words). |
| `meta` | `array` | Yes |  |
| `page` | `int` | No |  |
| `paperId` | `string` | No |  |
| `paperTitle` | `string` | Yes |  |
| `paragraphId` | `string` | Yes |  |
| `partId` | `string` | No |  |
| `q` | `string` | Yes |  |
| `rank` | `float` | Yes |  |
| `scriptureParallels` | `array` | No |  |
| `scriptureScores` | `mixed` | Yes |  |
| `sectionId` | `mixed` | Yes |  |
| `sectionTitle` | `mixed` | Yes |  |
| `sortId` | `string` | Yes |  |
| `standardReferenceId` | `string` | Yes |  |
| `text` | `string` | Yes |  |
| `translation` | `array` | Yes | Present only when the text is a translation: a machine made it, and it is released as CC0. |
| `type` | `string` | No |  |
| `urantiaParallels` | `array` | No |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Search()->create([
  "q" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Search()->list(["q" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SearchEntity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TableOfContentEntity

```php
$table_of_content = $client->TableOfContent();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `parts` | `array` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->TableOfContent()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TableOfContentEntity`

Create a new `TableOfContentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ToolEntity

```php
$tool = $client->Tool();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ToolEntity`

Create a new `ToolEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WorkEntity

```php
$work = $client->Work();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `array` | Yes |  |
| `id` | `string` | Yes | The work id: "bible", or the slug of a text such as "dhammapada". |
| `kind` | `string` | Yes | "scripture": read as sacred by its tradition. |
| `limit` | `int` | No |  |
| `match` | `string` | No | Keyword search: how it matched. |
| `meta` | `array` | Yes |  |
| `page` | `int` | No |  |
| `q` | `string` | Yes |  |
| `refPrefix` | `mixed` | Yes | The prefix of its references, such as "Dhp". |
| `reference` | `string` | Yes | "John 3:16", "Dhp 183", "BG 2.47-49" (a chunk in semantic search). |
| `religion` | `string` | Yes | The same as `tradition`, kept for older clients. |
| `similarity` | `float` | No | Semantic search: cosine similarity. |
| `strength` | `string` | No | How close the result is: strong (most right answers score this), related, or weak (likely off the topic). |
| `summary` | `string` | Yes | One plain sentence on what the work is. |
| `text` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `tradition` | `string` | Yes | The people or the religion of the work: "Buddhist", "Norse", "Ancient Greek". |
| `translator` | `string` | Yes |  |
| `unitLabel` | `string` | Yes | The word for one unit of the work: "verse", "section", "pauri". |
| `units` | `int` | Yes |  |
| `urantiaParallelLimit` | `int` | No |  |
| `urantiaParallels` | `array` | Yes | The nearest Urantia paragraphs (semantic parallels, not curated ones). |
| `urantiaSection` | `mixed` | Yes |  |
| `url` | `mixed` | Yes | The public page that holds the text, or null. |
| `work` | `string` | No | One work only: "bible" or a work id such as "dhammapada". |
| `year` | `mixed` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Work()->create([
  "q" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Work()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Work()->load(["ref" => "ref", "work" => "work"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WorkEntity`

Create a new `WorkEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new UrantiaPapersSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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


# UrantiaPapers PHP SDK



The PHP SDK for the UrantiaPapers API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Audio()` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/urantia-papers-sdk/tags)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/urantia-papers-sdk
composer config repositories.urantia-papers-sdk path ./urantia-papers-sdk/php
composer require voxgig-sdk/urantia-papers-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'urantiapapers_sdk.php';

$client = new UrantiaPapersSDK();
```

### 3. Load an audio

```php
try {
    // load() returns the ENTITY — call data_get() for the Audio record (throws on error).
    $audio = $client->Audio()->load(["id" => "example_id"]);
    print_r($audio->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $embedding = $client->Embedding()->load(["id" => "example_id"]);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = UrantiaPapersSDK::test([
    "entity" => ["entity" => ["test01" => ["id" => "test01"]]],
]);

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$entity = $client->Entity()->list();
print_r(array_map(fn($item) => $item->data_get(), $entity));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new UrantiaPapersSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
URANTIA_PAPERS_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### UrantiaPapersSDK

```php
require_once 'urantiapapers_sdk.php';
$client = new UrantiaPapersSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = UrantiaPapersSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### UrantiaPapersSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Audio` | `($data): AudioEntity` | Create an Audio entity instance. |
| `Bible` | `($data): BibleEntity` | Create a Bible entity instance. |
| `Citation` | `($data): CitationEntity` | Create a Citation entity instance. |
| `Embedding` | `($data): EmbeddingEntity` | Create an Embedding entity instance. |
| `Entity` | `($data): EntityEntity` | Create an Entity entity instance. |
| `Feedback` | `($data): FeedbackEntity` | Create a Feedback entity instance. |
| `Language` | `($data): LanguageEntity` | Create a Language entity instance. |
| `Ogn` | `($data): OgnEntity` | Create an Ogn entity instance. |
| `Paper` | `($data): PaperEntity` | Create a Paper entity instance. |
| `Paragraph` | `($data): ParagraphEntity` | Create a Paragraph entity instance. |
| `Quote` | `($data): QuoteEntity` | Create a Quote entity instance. |
| `Scripture` | `($data): ScriptureEntity` | Create a Scripture entity instance. |
| `Search` | `($data): SearchEntity` | Create a Search entity instance. |
| `TableOfContent` | `($data): TableOfContentEntity` | Create a TableOfContent entity instance. |
| `Tool` | `($data): ToolEntity` | Create a Tool entity instance. |
| `Work` | `($data): WorkEntity` | Create a Work entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): mixed` | Load a single entity by match criteria, and return it. |
| `list` | `(?array $reqmatch = null, $ctrl): mixed` | List entities matching the criteria (call with no argument to list all), one per record. |
| `create` | `($reqdata, $ctrl): mixed` | Create a new entity, and return it. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `array` of entities, one
per record; an entity's `data_get()` reads its record (an `array`). They
throw on error, so wrap calls in `try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$audio = $client->Audio();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audio` | `mixed` |  |
| `id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Audio record (throws on error).
$audio = $client->Audio()->load(["id" => "audio_id"]);
```


### Bible

Create an instance: `$bible = $client->Bible();`

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
| `bookOrder` | `int` |  |
| `canon` | `string` |  |
| `chapter` | `int` |  |
| `chapterCount` | `int` |  |
| `chunk` | `array` |  |
| `data` | `array` |  |
| `fullName` | `string` |  |
| `id` | `string` |  |
| `limit` | `int` |  |
| `meta` | `array` |  |
| `page` | `int` |  |
| `q` | `string` |  |
| `reference` | `string` |  |
| `text` | `string` |  |
| `translation` | `string` |  |
| `urantiaParallelLimit` | `int` |  |
| `urantiaParallels` | `array` |  |
| `verse` | `int` |  |
| `verseCount` | `int` |  |
| `verses` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Bible record (throws on error).
$bible = $client->Bible()->load(["id" => "bible_id"]);
```

#### Example: List

```php
// list() returns an array of Bible entities, one per record (throws on error).
$bibles = $client->Bible()->list();
```

#### Example: Create

```php
$bible = $client->Bible()->create([
    "q" => null, // string
]);
```


### Citation

Create an instance: `$citation = $client->Citation();`

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

```php
// load() returns the ENTITY — call data_get() for the Citation record (throws on error).
$citation = $client->Citation()->load(["ref" => "ref"]);
```


### Embedding

Create an instance: `$embedding = $client->Embedding();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dimensions` | `int` |  |
| `embedding` | `array` |  |
| `id` | `string` |  |
| `model` | `string` |  |
| `standardReferenceId` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Embedding record (throws on error).
$embedding = $client->Embedding()->load(["id" => "embedding_id"]);
```


### Entity

Create an instance: `$entity = $client->Entity();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aliases` | `mixed` |  |
| `citationCount` | `int` | Number of citations in the source index. |
| `description` | `mixed` |  |
| `id` | `string` |  |
| `language` | `string` |  |
| `name` | `string` |  |
| `seeAlso` | `mixed` | Related entry names. |
| `sense` | `mixed` | For a concept with a lowercase name: "special" when the papers coin the word or use it in their own sense, "ordinary" when they use it in its everyday sense. |
| `type` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Entity record (throws on error).
$entity = $client->Entity()->load(["id" => "entity_id"]);
```

#### Example: List

```php
// list() returns an array of Entity entities, one per record (throws on error).
$entitys = $client->Entity()->list();
```


### Feedback

Create an instance: `$feedback = $client->Feedback();`

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

```php
$feedback = $client->Feedback()->create([
    "category" => null, // string
    "message" => null, // string
]);
```


### Language

Create an instance: `$language = $client->Language();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` |  |
| `entityCount` | `int` |  |
| `name` | `string` |  |
| `paragraphCount` | `int` |  |

#### Example: List

```php
// list() returns an array of Language entities, one per record (throws on error).
$languages = $client->Language()->list();
```


### Ogn

Create an instance: `$ogn = $client->Ogn();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Ogn record (throws on error).
$ogn = $client->Ogn()->load(["ref" => "ref"]);
```


### Paper

Create an instance: `$paper = $client->Paper();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `labels` | `mixed` |  |
| `paper` | `array` |  |
| `paragraphs` | `array` |  |
| `partId` | `string` |  |
| `sortId` | `string` |  |
| `title` | `string` |  |
| `topEntities` | `array` |  |
| `video` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Paper record (throws on error).
$paper = $client->Paper()->load(["id" => "paper_id"]);
```

#### Example: List

```php
// list() returns an array of Paper entities, one per record (throws on error).
$papers = $client->Paper()->list();
```


### Paragraph

Create an instance: `$paragraph = $client->Paragraph();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `id` | `string` |  |
| `navigation` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Paragraph record (throws on error).
$paragraph = $client->Paragraph()->load(["id" => "paragraph_id"]);
```


### Quote

Create an instance: `$quote = $client->Quote();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$quote = $client->Quote()->create([
]);
```


### Scripture

Create an instance: `$scripture = $client->Scripture();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chunk` | `array` |  |
| `closest` | `array` |  |
| `consensus` | `float` | Mean percentile across the texts, 0 to 1 |
| `corpus` | `array` | Corpus id, slug, or ref prefix, e.g. |
| `data` | `array` |  |
| `distance` | `float` | 1 minus the highest percentile, 0 to 1 |
| `divisionLabel` | `string` |  |
| `divisions` | `array` |  |
| `gap` | `float` | How far this text's percentile is above the paragraph's mean across texts |
| `id` | `string` |  |
| `license` | `string` |  |
| `limit` | `int` |  |
| `meta` | `array` |  |
| `notes` | `mixed` | How the text is numbered or selected |
| `page` | `int` |  |
| `pages` | `array` | The reading pages of the work, in order: one division, or one subdivision for a work with three reference levels. |
| `paragraph` | `array` |  |
| `passage` | `array` |  |
| `passageCount` | `int` |  |
| `passages` | `array` |  |
| `percentile` | `float` |  |
| `q` | `string` |  |
| `refLevels` | `int` | Numbers in a full ref: 1 for `Dhp 183`, 2 for `BG 2.47`, 3 for `Epictetus 3.22.5` |
| `refPrefix` | `string` |  |
| `religion` | `string` |  |
| `similarity` | `float` | text-embedding-3-large cosine similarity |
| `similaritySmall` | `float` | text-embedding-3-small cosine similarity |
| `slug` | `string` |  |
| `sourceUrl` | `string` |  |
| `textsClose` | `int` | Texts that have this paragraph in their top 10% |
| `title` | `string` |  |
| `translator` | `string` |  |
| `unitLabel` | `string` |  |
| `urantiaParallelLimit` | `int` |  |
| `urantiaParallels` | `array` |  |
| `urantiaSection` | `mixed` | The Paper 131 section headed with this religion, or null when Paper 131 has no such heading |
| `year` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Scripture record (throws on error).
$scripture = $client->Scripture()->load(["id" => "scripture_id"]);
```

#### Example: List

```php
// list() returns an array of Scripture entities, one per record (throws on error).
$scriptures = $client->Scripture()->list();
```

#### Example: Create

```php
$scripture = $client->Scripture()->create([
    "q" => null, // string
]);
```


### Search

Create an instance: `$search = $client->Search();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audio` | `mixed` |  |
| `bibleParallels` | `array` |  |
| `data` | `array` |  |
| `entities` | `array` |  |
| `htmlText` | `string` |  |
| `id` | `string` |  |
| `include` | `string` |  |
| `labels` | `mixed` |  |
| `language` | `string` |  |
| `limit` | `int` |  |
| `match` | `string` | How the paragraph matched: reference (the query named it), exact (the whole phrase), all (every word), near (every word after a typo fix, see meta.didYouMean), most (two thirds of the words or more; with type `or`, some of the words). |
| `meta` | `array` |  |
| `page` | `int` |  |
| `paperId` | `string` |  |
| `paperTitle` | `string` |  |
| `paragraphId` | `string` |  |
| `partId` | `string` |  |
| `q` | `string` |  |
| `rank` | `float` |  |
| `scriptureParallels` | `array` |  |
| `scriptureScores` | `mixed` |  |
| `sectionId` | `mixed` |  |
| `sectionTitle` | `mixed` |  |
| `sortId` | `string` |  |
| `standardReferenceId` | `string` |  |
| `text` | `string` |  |
| `translation` | `array` | Present only when the text is a translation: a machine made it, and it is released as CC0. |
| `type` | `string` |  |
| `urantiaParallels` | `array` |  |

#### Example: List

```php
// list() returns an array of Search entities, one per record (throws on error).
$searchs = $client->Search()->list(["q" => "example"]);
```

#### Example: Create

```php
$search = $client->Search()->create([
    "q" => null, // string
]);
```


### TableOfContent

Create an instance: `$table_of_content = $client->TableOfContent();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `parts` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the TableOfContent record (throws on error).
$table_of_content = $client->TableOfContent()->load();
```


### Tool

Create an instance: `$tool = $client->Tool();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |


### Work

Create an instance: `$work = $client->Work();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `id` | `string` | The work id: "bible", or the slug of a text such as "dhammapada". |
| `kind` | `string` | "scripture": read as sacred by its tradition. |
| `limit` | `int` |  |
| `match` | `string` | Keyword search: how it matched. |
| `meta` | `array` |  |
| `page` | `int` |  |
| `q` | `string` |  |
| `refPrefix` | `mixed` | The prefix of its references, such as "Dhp". |
| `reference` | `string` | "John 3:16", "Dhp 183", "BG 2.47-49" (a chunk in semantic search). |
| `religion` | `string` | The same as `tradition`, kept for older clients. |
| `similarity` | `float` | Semantic search: cosine similarity. |
| `strength` | `string` | How close the result is: strong (most right answers score this), related, or weak (likely off the topic). |
| `summary` | `string` | One plain sentence on what the work is. |
| `text` | `string` |  |
| `title` | `string` |  |
| `tradition` | `string` | The people or the religion of the work: "Buddhist", "Norse", "Ancient Greek". |
| `translator` | `string` |  |
| `unitLabel` | `string` | The word for one unit of the work: "verse", "section", "pauri". |
| `units` | `int` |  |
| `urantiaParallelLimit` | `int` |  |
| `urantiaParallels` | `array` | The nearest Urantia paragraphs (semantic parallels, not curated ones). |
| `urantiaSection` | `mixed` |  |
| `url` | `mixed` | The public page that holds the text, or null. |
| `work` | `string` | One work only: "bible" or a work id such as "dhammapada". |
| `year` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Work record (throws on error).
$work = $client->Work()->load(["ref" => "ref", "work" => "work"]);
```

#### Example: List

```php
// list() returns an array of Work entities, one per record (throws on error).
$works = $client->Work()->list();
```

#### Example: Create

```php
$work = $client->Work()->create([
    "q" => null, // string
]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── urantiapapers_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`urantiapapers_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$embedding = $client->Embedding();
$embedding->load(["id" => "example_id"]);

// $embedding->data_get() now returns the embedding data from the last load
// $embedding->match_get() returns the last match criteria
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

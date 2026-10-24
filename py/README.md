# UrantiaPapers Python SDK



The Python SDK for the UrantiaPapers API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Audio()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/urantia-papers-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from urantiapapers_sdk import UrantiaPapersSDK

client = UrantiaPapersSDK()
```

### 3. Load an audio

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    audio = client.Audio().load({"id": "example_id"})
    print(audio.data_get())
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    embedding = client.Embedding().load({"id": "example_id"})
    print(embedding.data_get())
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = UrantiaPapersSDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
embedding = client.Embedding().load({"id": "test01"})
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = UrantiaPapersSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### UrantiaPapersSDK

```python
from urantiapapers_sdk import UrantiaPapersSDK

client = UrantiaPapersSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = UrantiaPapersSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### UrantiaPapersSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `audio = client.Audio()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audio` | `dict | None` |  |
| `id` | `str` |  |

#### Example: Load

```python
audio = client.Audio().load({"id": "audio_id"})
```


### Bible

Create an instance: `bible = client.Bible()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abbr` | `str` |  |
| `bookCode` | `str` |  |
| `bookName` | `str` |  |
| `bookOrder` | `int` |  |
| `canon` | `str` |  |
| `chapter` | `int` |  |
| `chapterCount` | `int` |  |
| `chunk` | `dict` |  |
| `data` | `list` |  |
| `fullName` | `str` |  |
| `id` | `str` |  |
| `limit` | `int` |  |
| `meta` | `dict` |  |
| `page` | `int` |  |
| `q` | `str` |  |
| `reference` | `str` |  |
| `text` | `str` |  |
| `translation` | `str` |  |
| `urantiaParallelLimit` | `int` |  |
| `urantiaParallels` | `list` |  |
| `verse` | `int` |  |
| `verseCount` | `int` |  |
| `verses` | `list` |  |

#### Example: Load

```python
bible = client.Bible().load({"id": "bible_id"})
```

#### Example: List

```python
bibles = client.Bible().list()
```

#### Example: Create

```python
bible = client.Bible().create({
    "q": "example_q",  # str
})
```


### Citation

Create an instance: `citation = client.Citation()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `citation` | `str` |  |
| `ref` | `str` |  |
| `style` | `str` |  |

#### Example: Load

```python
citation = client.Citation().load({"ref": "ref"})
```


### Embedding

Create an instance: `embedding = client.Embedding()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dimensions` | `int` |  |
| `embedding` | `list` |  |
| `id` | `str` |  |
| `model` | `str` |  |
| `standardReferenceId` | `str` |  |

#### Example: Load

```python
embedding = client.Embedding().load({"id": "embedding_id"})
```


### Entity

Create an instance: `entity = client.Entity()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aliases` | `list | None` |  |
| `citationCount` | `int` | Number of citations in the source index. |
| `description` | `str | None` |  |
| `id` | `str` |  |
| `language` | `str` |  |
| `name` | `str` |  |
| `seeAlso` | `list | None` | Related entry names. |
| `sense` | `str | None` | For a concept with a lowercase name: "special" when the papers coin the word or use it in their own sense, "ordinary" when they use it in its everyday sense. |
| `type` | `str` |  |

#### Example: Load

```python
entity = client.Entity().load({"id": "entity_id"})
```

#### Example: List

```python
entitys = client.Entity().list()
```


### Feedback

Create an instance: `feedback = client.Feedback()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `str` |  |
| `client` | `str` |  |
| `contact` | `str` |  |
| `endpoint` | `str` |  |
| `message` | `str` |  |
| `pageUrl` | `str` |  |
| `ref` | `str` |  |
| `requestId` | `str` |  |

#### Example: Create

```python
feedback = client.Feedback().create({
    "category": "example_category",  # str
    "message": "example_message",  # str
})
```


### Language

Create an instance: `language = client.Language()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `str` |  |
| `entityCount` | `int` |  |
| `name` | `str` |  |
| `paragraphCount` | `int` |  |

#### Example: List

```python
languages = client.Language().list()
```


### Ogn

Create an instance: `ogn = client.Ogn()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
ogn = client.Ogn().load({"ref": "ref"})
```


### Paper

Create an instance: `paper = client.Paper()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `labels` | `list | None` |  |
| `paper` | `dict` |  |
| `paragraphs` | `list` |  |
| `partId` | `str` |  |
| `sortId` | `str` |  |
| `title` | `str` |  |
| `topEntities` | `list` |  |
| `video` | `dict | None` |  |

#### Example: Load

```python
paper = client.Paper().load({"id": "paper_id"})
```

#### Example: List

```python
papers = client.Paper().list()
```


### Paragraph

Create an instance: `paragraph = client.Paragraph()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `dict` |  |
| `id` | `str` |  |
| `navigation` | `dict` |  |

#### Example: Load

```python
paragraph = client.Paragraph().load({"id": "paragraph_id"})
```


### Quote

Create an instance: `quote = client.Quote()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```python
quote = client.Quote().create({
})
```


### Scripture

Create an instance: `scripture = client.Scripture()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chunk` | `dict` |  |
| `closest` | `list` |  |
| `consensus` | `float` | Mean percentile across the texts, 0 to 1 |
| `corpus` | `dict` | Corpus id, slug, or ref prefix, e.g. |
| `data` | `list` |  |
| `distance` | `float` | 1 minus the highest percentile, 0 to 1 |
| `divisionLabel` | `str` |  |
| `divisions` | `list` |  |
| `gap` | `float` | How far this text's percentile is above the paragraph's mean across texts |
| `id` | `str` |  |
| `license` | `str` |  |
| `limit` | `int` |  |
| `meta` | `dict` |  |
| `notes` | `str | None` | How the text is numbered or selected |
| `page` | `int` |  |
| `pages` | `list` | The reading pages of the work, in order: one division, or one subdivision for a work with three reference levels. |
| `paragraph` | `dict` |  |
| `passage` | `dict` |  |
| `passageCount` | `int` |  |
| `passages` | `list` |  |
| `percentile` | `float` |  |
| `q` | `str` |  |
| `refLevels` | `int` | Numbers in a full ref: 1 for `Dhp 183`, 2 for `BG 2.47`, 3 for `Epictetus 3.22.5` |
| `refPrefix` | `str` |  |
| `religion` | `str` |  |
| `similarity` | `float` | text-embedding-3-large cosine similarity |
| `similaritySmall` | `float` | text-embedding-3-small cosine similarity |
| `slug` | `str` |  |
| `sourceUrl` | `str` |  |
| `textsClose` | `int` | Texts that have this paragraph in their top 10% |
| `title` | `str` |  |
| `translator` | `str` |  |
| `unitLabel` | `str` |  |
| `urantiaParallelLimit` | `int` |  |
| `urantiaParallels` | `list` |  |
| `urantiaSection` | `str | None` | The Paper 131 section headed with this religion, or null when Paper 131 has no such heading |
| `year` | `int` |  |

#### Example: Load

```python
scripture = client.Scripture().load({"id": "scripture_id"})
```

#### Example: List

```python
scriptures = client.Scripture().list()
```

#### Example: Create

```python
scripture = client.Scripture().create({
    "q": "example_q",  # str
})
```


### Search

Create an instance: `search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audio` | `dict | None` |  |
| `bibleParallels` | `list` |  |
| `data` | `list` |  |
| `entities` | `list` |  |
| `htmlText` | `str` |  |
| `id` | `str` |  |
| `include` | `str` |  |
| `labels` | `list | None` |  |
| `language` | `str` |  |
| `limit` | `int` |  |
| `match` | `str` | How the paragraph matched: reference (the query named it), exact (the whole phrase), all (every word), near (every word after a typo fix, see meta.didYouMean), most (two thirds of the words or more; with type `or`, some of the words). |
| `meta` | `dict` |  |
| `page` | `int` |  |
| `paperId` | `str` |  |
| `paperTitle` | `str` |  |
| `paragraphId` | `str` |  |
| `partId` | `str` |  |
| `q` | `str` |  |
| `rank` | `float` |  |
| `scriptureParallels` | `list` |  |
| `scriptureScores` | `dict | None` |  |
| `sectionId` | `str | None` |  |
| `sectionTitle` | `str | None` |  |
| `sortId` | `str` |  |
| `standardReferenceId` | `str` |  |
| `text` | `str` |  |
| `translation` | `dict` | Present only when the text is a translation: a machine made it, and it is released as CC0. |
| `type` | `str` |  |
| `urantiaParallels` | `list` |  |

#### Example: List

```python
searchs = client.Search().list({"q": "example"})
```

#### Example: Create

```python
search = client.Search().create({
    "q": "example_q",  # str
})
```


### TableOfContent

Create an instance: `table_of_content = client.TableOfContent()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `parts` | `list` |  |

#### Example: Load

```python
table_of_content = client.TableOfContent().load()
```


### Tool

Create an instance: `tool = client.Tool()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |


### Work

Create an instance: `work = client.Work()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `list` |  |
| `id` | `str` | The work id: "bible", or the slug of a text such as "dhammapada". |
| `kind` | `str` | "scripture": read as sacred by its tradition. |
| `limit` | `int` |  |
| `match` | `str` | Keyword search: how it matched. |
| `meta` | `dict` |  |
| `page` | `int` |  |
| `q` | `str` |  |
| `refPrefix` | `str | None` | The prefix of its references, such as "Dhp". |
| `reference` | `str` | "John 3:16", "Dhp 183", "BG 2.47-49" (a chunk in semantic search). |
| `religion` | `str` | The same as `tradition`, kept for older clients. |
| `similarity` | `float` | Semantic search: cosine similarity. |
| `strength` | `str` | How close the result is: strong (most right answers score this), related, or weak (likely off the topic). |
| `summary` | `str` | One plain sentence on what the work is. |
| `text` | `str` |  |
| `title` | `str` |  |
| `tradition` | `str` | The people or the religion of the work: "Buddhist", "Norse", "Ancient Greek". |
| `translator` | `str` |  |
| `unitLabel` | `str` | The word for one unit of the work: "verse", "section", "pauri". |
| `units` | `int` |  |
| `urantiaParallelLimit` | `int` |  |
| `urantiaParallels` | `list` | The nearest Urantia paragraphs (semantic parallels, not curated ones). |
| `urantiaSection` | `str | None` |  |
| `url` | `str | None` | The public page that holds the text, or null. |
| `work` | `str` | One work only: "bible" or a work id such as "dhammapada". |
| `year` | `int | None` |  |

#### Example: Load

```python
work = client.Work().load({"ref": "ref", "work": "work"})
```

#### Example: List

```python
works = client.Work().list()
```

#### Example: Create

```python
work = client.Work().create({
    "q": "example_q",  # str
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── urantiapapers_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`urantiapapers_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
embedding = client.Embedding()
embedding.load({"id": "example_id"})

# embedding.data_get() now returns the embedding data from the last load
# embedding.match_get() returns the last match criteria
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

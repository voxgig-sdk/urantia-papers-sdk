# UrantiaPapers Python SDK Reference

Complete API reference for the UrantiaPapers Python SDK.


## UrantiaPapersSDK

### Constructor

```python
from urantiapapers_sdk import UrantiaPapersSDK

client = UrantiaPapersSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `UrantiaPapersSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = UrantiaPapersSDK.test()
```


### Instance Methods

#### `Audio(data=None)`

Create a new `AudioEntity` instance. Pass `None` for no initial data.

#### `Bible(data=None)`

Create a new `BibleEntity` instance. Pass `None` for no initial data.

#### `Citation(data=None)`

Create a new `CitationEntity` instance. Pass `None` for no initial data.

#### `Embedding(data=None)`

Create a new `EmbeddingEntity` instance. Pass `None` for no initial data.

#### `Entity(data=None)`

Create a new `EntityEntity` instance. Pass `None` for no initial data.

#### `Feedback(data=None)`

Create a new `FeedbackEntity` instance. Pass `None` for no initial data.

#### `Language(data=None)`

Create a new `LanguageEntity` instance. Pass `None` for no initial data.

#### `Ogn(data=None)`

Create a new `OgnEntity` instance. Pass `None` for no initial data.

#### `Paper(data=None)`

Create a new `PaperEntity` instance. Pass `None` for no initial data.

#### `Paragraph(data=None)`

Create a new `ParagraphEntity` instance. Pass `None` for no initial data.

#### `Quote(data=None)`

Create a new `QuoteEntity` instance. Pass `None` for no initial data.

#### `Scripture(data=None)`

Create a new `ScriptureEntity` instance. Pass `None` for no initial data.

#### `Search(data=None)`

Create a new `SearchEntity` instance. Pass `None` for no initial data.

#### `TableOfContent(data=None)`

Create a new `TableOfContentEntity` instance. Pass `None` for no initial data.

#### `Tool(data=None)`

Create a new `ToolEntity` instance. Pass `None` for no initial data.

#### `Work(data=None)`

Create a new `WorkEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AudioEntity

```python
audio = client.Audio()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audio` | `dict | None` | Yes |  |
| `id` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> AudioEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Audio().load({"id": "audio_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AudioEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BibleEntity

```python
bible = client.Bible()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abbr` | `str` | Yes |  |
| `bookCode` | `str` | Yes |  |
| `bookName` | `str` | Yes |  |
| `bookOrder` | `int` | Yes |  |
| `canon` | `str` | Yes |  |
| `chapter` | `int` | Yes |  |
| `chapterCount` | `int` | Yes |  |
| `chunk` | `dict` | Yes |  |
| `data` | `list` | Yes |  |
| `fullName` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `limit` | `int` | No |  |
| `meta` | `dict` | Yes |  |
| `page` | `int` | No |  |
| `q` | `str` | Yes |  |
| `reference` | `str` | Yes |  |
| `text` | `str` | Yes |  |
| `translation` | `str` | Yes |  |
| `urantiaParallelLimit` | `int` | No |  |
| `urantiaParallels` | `list` | Yes |  |
| `verse` | `int` | Yes |  |
| `verseCount` | `int` | Yes |  |
| `verses` | `list` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> BibleEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Bible().create({
    "q": "example_q",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[BibleEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Bible().list()
for bible in results:
    print(bible.data_get())
```

#### `load(reqmatch, ctrl=None) -> BibleEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Bible().load({"id": "bible_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BibleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CitationEntity

```python
citation = client.Citation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `citation` | `str` | Yes |  |
| `ref` | `str` | Yes |  |
| `style` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> CitationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Citation().load({"ref": "ref"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CitationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EmbeddingEntity

```python
embedding = client.Embedding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dimensions` | `int` | Yes |  |
| `embedding` | `list` | Yes |  |
| `id` | `str` | No |  |
| `model` | `str` | Yes |  |
| `standardReferenceId` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> EmbeddingEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Embedding().load({"id": "embedding_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmbeddingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EntityEntity

```python
entity = client.Entity()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aliases` | `list | None` | Yes |  |
| `citationCount` | `int` | Yes | Number of citations in the source index. |
| `description` | `str | None` | Yes |  |
| `id` | `str` | Yes |  |
| `language` | `str` | No |  |
| `name` | `str` | Yes |  |
| `seeAlso` | `list | None` | Yes | Related entry names. |
| `sense` | `str | None` | Yes | For a concept with a lowercase name: "special" when the papers coin the word or use it in their own sense, "ordinary" when they use it in its everyday sense. |
| `type` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[EntityEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Entity().list()
for entity in results:
    print(entity.data_get())
```

#### `load(reqmatch, ctrl=None) -> EntityEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Entity().load({"id": "entity_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EntityEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FeedbackEntity

```python
feedback = client.Feedback()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `str` | Yes |  |
| `client` | `str` | No |  |
| `contact` | `str` | No |  |
| `endpoint` | `str` | No |  |
| `message` | `str` | Yes |  |
| `pageUrl` | `str` | No |  |
| `ref` | `str` | No |  |
| `requestId` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> FeedbackEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Feedback().create({
    "category": "example_category",  # str
    "message": "example_message",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FeedbackEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LanguageEntity

```python
language = client.Language()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `str` | Yes |  |
| `entityCount` | `int` | Yes |  |
| `name` | `str` | Yes |  |
| `paragraphCount` | `int` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[LanguageEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Language().list()
for language in results:
    print(language.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LanguageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OgnEntity

```python
ogn = client.Ogn()
```

### Operations

#### `load(reqmatch, ctrl=None) -> OgnEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Ogn().load({"ref": "ref"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OgnEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PaperEntity

```python
paper = client.Paper()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | Yes |  |
| `labels` | `list | None` | Yes |  |
| `paper` | `dict` | Yes |  |
| `paragraphs` | `list` | Yes |  |
| `partId` | `str` | Yes |  |
| `sortId` | `str` | Yes |  |
| `title` | `str` | Yes |  |
| `topEntities` | `list` | No |  |
| `video` | `dict | None` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PaperEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Paper().list()
for paper in results:
    print(paper.data_get())
```

#### `load(reqmatch, ctrl=None) -> PaperEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Paper().load({"id": "paper_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaperEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ParagraphEntity

```python
paragraph = client.Paragraph()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `dict` | Yes |  |
| `id` | `str` | No |  |
| `navigation` | `dict` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> ParagraphEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Paragraph().load({"id": "paragraph_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ParagraphEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## QuoteEntity

```python
quote = client.Quote()
```

### Operations

#### `create(reqdata, ctrl=None) -> QuoteEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Quote().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QuoteEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ScriptureEntity

```python
scripture = client.Scripture()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chunk` | `dict` | Yes |  |
| `closest` | `list` | Yes |  |
| `consensus` | `float` | Yes | Mean percentile across the texts, 0 to 1 |
| `corpus` | `dict` | Yes | Corpus id, slug, or ref prefix, e.g. |
| `data` | `list` | Yes |  |
| `distance` | `float` | Yes | 1 minus the highest percentile, 0 to 1 |
| `divisionLabel` | `str` | Yes |  |
| `divisions` | `list` | Yes |  |
| `gap` | `float` | Yes | How far this text's percentile is above the paragraph's mean across texts |
| `id` | `str` | Yes |  |
| `license` | `str` | Yes |  |
| `limit` | `int` | No |  |
| `meta` | `dict` | Yes |  |
| `notes` | `str | None` | Yes | How the text is numbered or selected |
| `page` | `int` | No |  |
| `pages` | `list` | Yes | The reading pages of the work, in order: one division, or one subdivision for a work with three reference levels. |
| `paragraph` | `dict` | Yes |  |
| `passage` | `dict` | Yes |  |
| `passageCount` | `int` | Yes |  |
| `passages` | `list` | Yes |  |
| `percentile` | `float` | Yes |  |
| `q` | `str` | Yes |  |
| `refLevels` | `int` | Yes | Numbers in a full ref: 1 for `Dhp 183`, 2 for `BG 2.47`, 3 for `Epictetus 3.22.5` |
| `refPrefix` | `str` | Yes |  |
| `religion` | `str` | Yes |  |
| `similarity` | `float` | Yes | text-embedding-3-large cosine similarity |
| `similaritySmall` | `float` | Yes | text-embedding-3-small cosine similarity |
| `slug` | `str` | Yes |  |
| `sourceUrl` | `str` | Yes |  |
| `textsClose` | `int` | Yes | Texts that have this paragraph in their top 10% |
| `title` | `str` | Yes |  |
| `translator` | `str` | Yes |  |
| `unitLabel` | `str` | Yes |  |
| `urantiaParallelLimit` | `int` | No |  |
| `urantiaParallels` | `list` | Yes |  |
| `urantiaSection` | `str | None` | Yes | The Paper 131 section headed with this religion, or null when Paper 131 has no such heading |
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

#### `create(reqdata, ctrl=None) -> ScriptureEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Scripture().create({
    "q": "example_q",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[ScriptureEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Scripture().list()
for scripture in results:
    print(scripture.data_get())
```

#### `load(reqmatch, ctrl=None) -> ScriptureEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Scripture().load({"id": "scripture_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScriptureEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SearchEntity

```python
search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audio` | `dict | None` | Yes |  |
| `bibleParallels` | `list` | No |  |
| `data` | `list` | Yes |  |
| `entities` | `list` | No |  |
| `htmlText` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `include` | `str` | No |  |
| `labels` | `list | None` | Yes |  |
| `language` | `str` | No |  |
| `limit` | `int` | No |  |
| `match` | `str` | Yes | How the paragraph matched: reference (the query named it), exact (the whole phrase), all (every word), near (every word after a typo fix, see meta.didYouMean), most (two thirds of the words or more; with type `or`, some of the words). |
| `meta` | `dict` | Yes |  |
| `page` | `int` | No |  |
| `paperId` | `str` | No |  |
| `paperTitle` | `str` | Yes |  |
| `paragraphId` | `str` | Yes |  |
| `partId` | `str` | No |  |
| `q` | `str` | Yes |  |
| `rank` | `float` | Yes |  |
| `scriptureParallels` | `list` | No |  |
| `scriptureScores` | `dict | None` | Yes |  |
| `sectionId` | `str | None` | Yes |  |
| `sectionTitle` | `str | None` | Yes |  |
| `sortId` | `str` | Yes |  |
| `standardReferenceId` | `str` | Yes |  |
| `text` | `str` | Yes |  |
| `translation` | `dict` | Yes | Present only when the text is a translation: a machine made it, and it is released as CC0. |
| `type` | `str` | No |  |
| `urantiaParallels` | `list` | No |  |

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

#### `create(reqdata, ctrl=None) -> SearchEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Search().create({
    "q": "example_q",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[SearchEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Search().list({"q": "example"})
for search in results:
    print(search.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TableOfContentEntity

```python
table_of_content = client.TableOfContent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `parts` | `list` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> TableOfContentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.TableOfContent().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TableOfContentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ToolEntity

```python
tool = client.Tool()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ToolEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ToolEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WorkEntity

```python
work = client.Work()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | Yes |  |
| `id` | `str` | Yes | The work id: "bible", or the slug of a text such as "dhammapada". |
| `kind` | `str` | Yes | "scripture": read as sacred by its tradition. |
| `limit` | `int` | No |  |
| `match` | `str` | No | Keyword search: how it matched. |
| `meta` | `dict` | Yes |  |
| `page` | `int` | No |  |
| `q` | `str` | Yes |  |
| `refPrefix` | `str | None` | Yes | The prefix of its references, such as "Dhp". |
| `reference` | `str` | Yes | "John 3:16", "Dhp 183", "BG 2.47-49" (a chunk in semantic search). |
| `religion` | `str` | Yes | The same as `tradition`, kept for older clients. |
| `similarity` | `float` | No | Semantic search: cosine similarity. |
| `strength` | `str` | No | How close the result is: strong (most right answers score this), related, or weak (likely off the topic). |
| `summary` | `str` | Yes | One plain sentence on what the work is. |
| `text` | `str` | Yes |  |
| `title` | `str` | Yes |  |
| `tradition` | `str` | Yes | The people or the religion of the work: "Buddhist", "Norse", "Ancient Greek". |
| `translator` | `str` | Yes |  |
| `unitLabel` | `str` | Yes | The word for one unit of the work: "verse", "section", "pauri". |
| `units` | `int` | Yes |  |
| `urantiaParallelLimit` | `int` | No |  |
| `urantiaParallels` | `list` | Yes | The nearest Urantia paragraphs (semantic parallels, not curated ones). |
| `urantiaSection` | `str | None` | Yes |  |
| `url` | `str | None` | Yes | The public page that holds the text, or null. |
| `work` | `str` | No | One work only: "bible" or a work id such as "dhammapada". |
| `year` | `int | None` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> WorkEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Work().create({
    "q": "example_q",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[WorkEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Work().list()
for work in results:
    print(work.data_get())
```

#### `load(reqmatch, ctrl=None) -> WorkEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Work().load({"ref": "ref", "work": "work"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorkEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = UrantiaPapersSDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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


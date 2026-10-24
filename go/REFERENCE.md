# UrantiaPapers Golang SDK Reference

Complete API reference for the UrantiaPapers Golang SDK.


## UrantiaPapersSDK

### Constructor

```go
func NewUrantiaPapersSDK(options map[string]any) *UrantiaPapersSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *UrantiaPapersSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *UrantiaPapersSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Audio(data map[string]any) UrantiaPapersEntity`

Create a new `Audio` entity instance. Pass `nil` for no initial data.

#### `Bible(data map[string]any) UrantiaPapersEntity`

Create a new `Bible` entity instance. Pass `nil` for no initial data.

#### `Citation(data map[string]any) UrantiaPapersEntity`

Create a new `Citation` entity instance. Pass `nil` for no initial data.

#### `Embedding(data map[string]any) UrantiaPapersEntity`

Create a new `Embedding` entity instance. Pass `nil` for no initial data.

#### `Entity(data map[string]any) UrantiaPapersEntity`

Create a new `Entity` entity instance. Pass `nil` for no initial data.

#### `Feedback(data map[string]any) UrantiaPapersEntity`

Create a new `Feedback` entity instance. Pass `nil` for no initial data.

#### `Language(data map[string]any) UrantiaPapersEntity`

Create a new `Language` entity instance. Pass `nil` for no initial data.

#### `Ogn(data map[string]any) UrantiaPapersEntity`

Create a new `Ogn` entity instance. Pass `nil` for no initial data.

#### `Paper(data map[string]any) UrantiaPapersEntity`

Create a new `Paper` entity instance. Pass `nil` for no initial data.

#### `Paragraph(data map[string]any) UrantiaPapersEntity`

Create a new `Paragraph` entity instance. Pass `nil` for no initial data.

#### `Quote(data map[string]any) UrantiaPapersEntity`

Create a new `Quote` entity instance. Pass `nil` for no initial data.

#### `Scripture(data map[string]any) UrantiaPapersEntity`

Create a new `Scripture` entity instance. Pass `nil` for no initial data.

#### `Search(data map[string]any) UrantiaPapersEntity`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `TableOfContent(data map[string]any) UrantiaPapersEntity`

Create a new `TableOfContent` entity instance. Pass `nil` for no initial data.

#### `Tool(data map[string]any) UrantiaPapersEntity`

Create a new `Tool` entity instance. Pass `nil` for no initial data.

#### `Work(data map[string]any) UrantiaPapersEntity`

Create a new `Work` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AudioEntity

```go
audio := client.Audio(nil)
fmt.Println(audio.GetName()) // "audio"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audio` | `any` | Yes |  |
| `id` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Audio(nil).Load(map[string]any{"id": "audio_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AudioEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BibleEntity

```go
bible := client.Bible(nil)
fmt.Println(bible.GetName()) // "bible"
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
| `chunk` | `map[string]any` | Yes |  |
| `data` | `[]any` | Yes |  |
| `fullName` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `limit` | `int` | No |  |
| `meta` | `map[string]any` | Yes |  |
| `page` | `int` | No |  |
| `q` | `string` | Yes |  |
| `reference` | `string` | Yes |  |
| `text` | `string` | Yes |  |
| `translation` | `string` | Yes |  |
| `urantiaParallelLimit` | `int` | No |  |
| `urantiaParallels` | `[]any` | Yes |  |
| `verse` | `int` | Yes |  |
| `verseCount` | `int` | Yes |  |
| `verses` | `[]any` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Bible(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Bible(nil).Load(map[string]any{"id": "bible_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Bible(nil).Create(map[string]any{
    "q": "example_q",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BibleEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CitationEntity

```go
citation := client.Citation(nil)
fmt.Println(citation.GetName()) // "citation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `citation` | `string` | Yes |  |
| `ref` | `string` | Yes |  |
| `style` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Citation(nil).Load(map[string]any{"ref": "ref"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CitationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EmbeddingEntity

```go
embedding := client.Embedding(nil)
fmt.Println(embedding.GetName()) // "embedding"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dimensions` | `int` | Yes |  |
| `embedding` | `[]any` | Yes |  |
| `id` | `string` | No |  |
| `model` | `string` | Yes |  |
| `standardReferenceId` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Embedding(nil).Load(map[string]any{"id": "embedding_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EmbeddingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EntityEntity

```go
entity := client.Entity(nil)
fmt.Println(entity.GetName()) // "entity"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aliases` | `any` | Yes |  |
| `citationCount` | `int` | Yes | Number of citations in the source index. |
| `description` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `language` | `string` | No |  |
| `name` | `string` | Yes |  |
| `seeAlso` | `any` | Yes | Related entry names. |
| `sense` | `any` | Yes | For a concept with a lowercase name: "special" when the papers coin the word or use it in their own sense, "ordinary" when they use it in its everyday sense. |
| `type` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Entity(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Entity(nil).Load(map[string]any{"id": "entity_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EntityEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## FeedbackEntity

```go
feedback := client.Feedback(nil)
fmt.Println(feedback.GetName()) // "feedback"
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Feedback(nil).Create(map[string]any{
    "category": "example_category",
    "message": "example_message",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FeedbackEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LanguageEntity

```go
language := client.Language(nil)
fmt.Println(language.GetName()) // "language"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | Yes |  |
| `entityCount` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `paragraphCount` | `int` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Language(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LanguageEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## OgnEntity

```go
ogn := client.Ogn(nil)
fmt.Println(ogn.GetName()) // "ogn"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Ogn(nil).Load(map[string]any{"ref": "ref"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OgnEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PaperEntity

```go
paper := client.Paper(nil)
fmt.Println(paper.GetName()) // "paper"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `labels` | `any` | Yes |  |
| `paper` | `map[string]any` | Yes |  |
| `paragraphs` | `[]any` | Yes |  |
| `partId` | `string` | Yes |  |
| `sortId` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `topEntities` | `[]any` | No |  |
| `video` | `any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Paper(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Paper(nil).Load(map[string]any{"id": "paper_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PaperEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ParagraphEntity

```go
paragraph := client.Paragraph(nil)
fmt.Println(paragraph.GetName()) // "paragraph"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `map[string]any` | Yes |  |
| `id` | `string` | No |  |
| `navigation` | `map[string]any` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Paragraph(nil).Load(map[string]any{"id": "paragraph_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ParagraphEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## QuoteEntity

```go
quote := client.Quote(nil)
fmt.Println(quote.GetName()) // "quote"
```

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Quote(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `QuoteEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ScriptureEntity

```go
scripture := client.Scripture(nil)
fmt.Println(scripture.GetName()) // "scripture"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chunk` | `map[string]any` | Yes |  |
| `closest` | `[]any` | Yes |  |
| `consensus` | `float64` | Yes | Mean percentile across the texts, 0 to 1 |
| `corpus` | `map[string]any` | Yes | Corpus id, slug, or ref prefix, e.g. |
| `data` | `[]any` | Yes |  |
| `distance` | `float64` | Yes | 1 minus the highest percentile, 0 to 1 |
| `divisionLabel` | `string` | Yes |  |
| `divisions` | `[]any` | Yes |  |
| `gap` | `float64` | Yes | How far this text's percentile is above the paragraph's mean across texts |
| `id` | `string` | Yes |  |
| `license` | `string` | Yes |  |
| `limit` | `int` | No |  |
| `meta` | `map[string]any` | Yes |  |
| `notes` | `any` | Yes | How the text is numbered or selected |
| `page` | `int` | No |  |
| `pages` | `[]any` | Yes | The reading pages of the work, in order: one division, or one subdivision for a work with three reference levels. |
| `paragraph` | `map[string]any` | Yes |  |
| `passage` | `map[string]any` | Yes |  |
| `passageCount` | `int` | Yes |  |
| `passages` | `[]any` | Yes |  |
| `percentile` | `float64` | Yes |  |
| `q` | `string` | Yes |  |
| `refLevels` | `int` | Yes | Numbers in a full ref: 1 for `Dhp 183`, 2 for `BG 2.47`, 3 for `Epictetus 3.22.5` |
| `refPrefix` | `string` | Yes |  |
| `religion` | `string` | Yes |  |
| `similarity` | `float64` | Yes | text-embedding-3-large cosine similarity |
| `similaritySmall` | `float64` | Yes | text-embedding-3-small cosine similarity |
| `slug` | `string` | Yes |  |
| `sourceUrl` | `string` | Yes |  |
| `textsClose` | `int` | Yes | Texts that have this paragraph in their top 10% |
| `title` | `string` | Yes |  |
| `translator` | `string` | Yes |  |
| `unitLabel` | `string` | Yes |  |
| `urantiaParallelLimit` | `int` | No |  |
| `urantiaParallels` | `[]any` | Yes |  |
| `urantiaSection` | `any` | Yes | The Paper 131 section headed with this religion, or null when Paper 131 has no such heading |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Scripture(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Scripture(nil).Load(map[string]any{"id": "scripture_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Scripture(nil).Create(map[string]any{
    "q": "example_q",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ScriptureEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SearchEntity

```go
search := client.Search(nil)
fmt.Println(search.GetName()) // "search"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audio` | `any` | Yes |  |
| `bibleParallels` | `[]any` | No |  |
| `data` | `[]any` | Yes |  |
| `entities` | `[]any` | No |  |
| `htmlText` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `include` | `string` | No |  |
| `labels` | `any` | Yes |  |
| `language` | `string` | No |  |
| `limit` | `int` | No |  |
| `match` | `string` | Yes | How the paragraph matched: reference (the query named it), exact (the whole phrase), all (every word), near (every word after a typo fix, see meta.didYouMean), most (two thirds of the words or more; with type `or`, some of the words). |
| `meta` | `map[string]any` | Yes |  |
| `page` | `int` | No |  |
| `paperId` | `string` | No |  |
| `paperTitle` | `string` | Yes |  |
| `paragraphId` | `string` | Yes |  |
| `partId` | `string` | No |  |
| `q` | `string` | Yes |  |
| `rank` | `float64` | Yes |  |
| `scriptureParallels` | `[]any` | No |  |
| `scriptureScores` | `any` | Yes |  |
| `sectionId` | `any` | Yes |  |
| `sectionTitle` | `any` | Yes |  |
| `sortId` | `string` | Yes |  |
| `standardReferenceId` | `string` | Yes |  |
| `text` | `string` | Yes |  |
| `translation` | `map[string]any` | Yes | Present only when the text is a translation: a machine made it, and it is released as CC0. |
| `type` | `string` | No |  |
| `urantiaParallels` | `[]any` | No |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Search(nil).List(map[string]any{"q": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Search(nil).Create(map[string]any{
    "q": "example_q",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## TableOfContentEntity

```go
tableOfContent := client.TableOfContent(nil)
fmt.Println(tableOfContent.GetName()) // "table_of_content"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `parts` | `[]any` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.TableOfContent(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TableOfContentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ToolEntity

```go
tool := client.Tool(nil)
fmt.Println(tool.GetName()) // "tool"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ToolEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## WorkEntity

```go
work := client.Work(nil)
fmt.Println(work.GetName()) // "work"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `[]any` | Yes |  |
| `id` | `string` | Yes | The work id: "bible", or the slug of a text such as "dhammapada". |
| `kind` | `string` | Yes | "scripture": read as sacred by its tradition. |
| `limit` | `int` | No |  |
| `match` | `string` | No | Keyword search: how it matched. |
| `meta` | `map[string]any` | Yes |  |
| `page` | `int` | No |  |
| `q` | `string` | Yes |  |
| `refPrefix` | `any` | Yes | The prefix of its references, such as "Dhp". |
| `reference` | `string` | Yes | "John 3:16", "Dhp 183", "BG 2.47-49" (a chunk in semantic search). |
| `religion` | `string` | Yes | The same as `tradition`, kept for older clients. |
| `similarity` | `float64` | No | Semantic search: cosine similarity. |
| `strength` | `string` | No | How close the result is: strong (most right answers score this), related, or weak (likely off the topic). |
| `summary` | `string` | Yes | One plain sentence on what the work is. |
| `text` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `tradition` | `string` | Yes | The people or the religion of the work: "Buddhist", "Norse", "Ancient Greek". |
| `translator` | `string` | Yes |  |
| `unitLabel` | `string` | Yes | The word for one unit of the work: "verse", "section", "pauri". |
| `units` | `int` | Yes |  |
| `urantiaParallelLimit` | `int` | No |  |
| `urantiaParallels` | `[]any` | Yes | The nearest Urantia paragraphs (semantic parallels, not curated ones). |
| `urantiaSection` | `any` | Yes |  |
| `url` | `any` | Yes | The public page that holds the text, or null. |
| `work` | `string` | No | One work only: "bible" or a work id such as "dhammapada". |
| `year` | `any` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Work(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Work(nil).Load(map[string]any{"ref": "ref", "work": "work"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Work(nil).Create(map[string]any{
    "q": "example_q",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WorkEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

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

```go
client := sdk.NewUrantiaPapersSDK(map[string]any{
    "feature": map[string]any{
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
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


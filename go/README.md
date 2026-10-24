# UrantiaPapers Golang SDK



The Golang SDK for the UrantiaPapers API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Audio(nil)` — each with the same small set of operations (`List`, `Load`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/urantia-papers-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/urantia-papers-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/urantia-papers-sdk/go=../urantia-papers-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/urantia-papers-sdk/go"
)

func main() {
    client := sdk.New()

    // Load a single audio — the value is the entity; Data() reads its record.
    audio, err := client.Audio(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(audio.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
embedding, err := client.Embedding(nil).Load(map[string]any{"id": "example_id"}, nil)
if err != nil {
    // handle err
    return
}
_ = embedding
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

embedding, err := client.Embedding(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(embedding.(sdk.Entity).Data()) // the entity's mock record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewUrantiaPapersSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewUrantiaPapersSDK

```go
func NewUrantiaPapersSDK(options map[string]any) *UrantiaPapersSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *UrantiaPapersSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### UrantiaPapersSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Audio` | `(data map[string]any) UrantiaPapersEntity` | Create an Audio entity instance. |
| `Bible` | `(data map[string]any) UrantiaPapersEntity` | Create a Bible entity instance. |
| `Citation` | `(data map[string]any) UrantiaPapersEntity` | Create a Citation entity instance. |
| `Embedding` | `(data map[string]any) UrantiaPapersEntity` | Create an Embedding entity instance. |
| `Entity` | `(data map[string]any) UrantiaPapersEntity` | Create an Entity entity instance. |
| `Feedback` | `(data map[string]any) UrantiaPapersEntity` | Create a Feedback entity instance. |
| `Language` | `(data map[string]any) UrantiaPapersEntity` | Create a Language entity instance. |
| `Ogn` | `(data map[string]any) UrantiaPapersEntity` | Create an Ogn entity instance. |
| `Paper` | `(data map[string]any) UrantiaPapersEntity` | Create a Paper entity instance. |
| `Paragraph` | `(data map[string]any) UrantiaPapersEntity` | Create a Paragraph entity instance. |
| `Quote` | `(data map[string]any) UrantiaPapersEntity` | Create a Quote entity instance. |
| `Scripture` | `(data map[string]any) UrantiaPapersEntity` | Create a Scripture entity instance. |
| `Search` | `(data map[string]any) UrantiaPapersEntity` | Create a Search entity instance. |
| `TableOfContent` | `(data map[string]any) UrantiaPapersEntity` | Create a TableOfContent entity instance. |
| `Tool` | `(data map[string]any) UrantiaPapersEntity` | Create a Tool entity instance. |
| `Work` | `(data map[string]any) UrantiaPapersEntity` | Create a Work entity instance. |

### Entity interface (UrantiaPapersEntity)

All entities implement the `UrantiaPapersEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity, and return it. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    audio, err := client.Audio(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // audio is the entity; audio.(sdk.Entity).Data() reads its record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Audio

| Field | Description |
| --- | --- |
| `"audio"` |  |
| `"id"` |  |

Operations: Load.

API path: `/audio/{ref}`

#### Bible

| Field | Description |
| --- | --- |
| `"abbr"` |  |
| `"bookCode"` |  |
| `"bookName"` |  |
| `"bookOrder"` |  |
| `"canon"` |  |
| `"chapter"` |  |
| `"chapterCount"` |  |
| `"chunk"` |  |
| `"data"` |  |
| `"fullName"` |  |
| `"id"` |  |
| `"limit"` |  |
| `"meta"` |  |
| `"page"` |  |
| `"q"` |  |
| `"reference"` |  |
| `"text"` |  |
| `"translation"` |  |
| `"urantiaParallelLimit"` |  |
| `"urantiaParallels"` |  |
| `"verse"` |  |
| `"verseCount"` |  |
| `"verses"` |  |

Operations: Create, List, Load.

API path: `/bible/search/semantic`

#### Citation

| Field | Description |
| --- | --- |
| `"citation"` |  |
| `"ref"` |  |
| `"style"` |  |

Operations: Load.

API path: `/cite`

#### Embedding

| Field | Description |
| --- | --- |
| `"dimensions"` |  |
| `"embedding"` |  |
| `"id"` |  |
| `"model"` |  |
| `"standardReferenceId"` |  |

Operations: Load.

API path: `/embeddings/{ref}`

#### Entity

| Field | Description |
| --- | --- |
| `"aliases"` |  |
| `"citationCount"` | Number of citations in the source index. |
| `"description"` |  |
| `"id"` |  |
| `"language"` |  |
| `"name"` |  |
| `"seeAlso"` | Related entry names. |
| `"sense"` | For a concept with a lowercase name: "special" when the papers coin the word or use it in their own sense, "ordinary" when they use it in its everyday sense. |
| `"type"` |  |

Operations: List, Load.

API path: `/entities/{id}/paragraphs`

#### Feedback

| Field | Description |
| --- | --- |
| `"category"` |  |
| `"client"` |  |
| `"contact"` |  |
| `"endpoint"` |  |
| `"message"` |  |
| `"pageUrl"` |  |
| `"ref"` |  |
| `"requestId"` |  |

Operations: Create.

API path: `/feedback`

#### Language

| Field | Description |
| --- | --- |
| `"code"` |  |
| `"entityCount"` |  |
| `"name"` |  |
| `"paragraphCount"` |  |

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
| `"id"` |  |
| `"labels"` |  |
| `"paper"` |  |
| `"paragraphs"` |  |
| `"partId"` |  |
| `"sortId"` |  |
| `"title"` |  |
| `"topEntities"` |  |
| `"video"` |  |

Operations: List, Load.

API path: `/papers/{id}/sections`

#### Paragraph

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"id"` |  |
| `"navigation"` |  |

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
| `"chunk"` |  |
| `"closest"` |  |
| `"consensus"` | Mean percentile across the texts, 0 to 1 |
| `"corpus"` | Corpus id, slug, or ref prefix, e.g. |
| `"data"` |  |
| `"distance"` | 1 minus the highest percentile, 0 to 1 |
| `"divisionLabel"` |  |
| `"divisions"` |  |
| `"gap"` | How far this text's percentile is above the paragraph's mean across texts |
| `"id"` |  |
| `"license"` |  |
| `"limit"` |  |
| `"meta"` |  |
| `"notes"` | How the text is numbered or selected |
| `"page"` |  |
| `"pages"` | The reading pages of the work, in order: one division, or one subdivision for a work with three reference levels. |
| `"paragraph"` |  |
| `"passage"` |  |
| `"passageCount"` |  |
| `"passages"` |  |
| `"percentile"` |  |
| `"q"` |  |
| `"refLevels"` | Numbers in a full ref: 1 for `Dhp 183`, 2 for `BG 2.47`, 3 for `Epictetus 3.22.5` |
| `"refPrefix"` |  |
| `"religion"` |  |
| `"similarity"` | text-embedding-3-large cosine similarity |
| `"similaritySmall"` | text-embedding-3-small cosine similarity |
| `"slug"` |  |
| `"sourceUrl"` |  |
| `"textsClose"` | Texts that have this paragraph in their top 10% |
| `"title"` |  |
| `"translator"` |  |
| `"unitLabel"` |  |
| `"urantiaParallelLimit"` |  |
| `"urantiaParallels"` |  |
| `"urantiaSection"` | The Paper 131 section headed with this religion, or null when Paper 131 has no such heading |
| `"year"` |  |

Operations: Create, List, Load.

API path: `/scriptures/search/semantic`

#### Search

| Field | Description |
| --- | --- |
| `"audio"` |  |
| `"bibleParallels"` |  |
| `"data"` |  |
| `"entities"` |  |
| `"htmlText"` |  |
| `"id"` |  |
| `"include"` |  |
| `"labels"` |  |
| `"language"` |  |
| `"limit"` |  |
| `"match"` | How the paragraph matched: reference (the query named it), exact (the whole phrase), all (every word), near (every word after a typo fix, see meta.didYouMean), most (two thirds of the words or more; with type `or`, some of the words). |
| `"meta"` |  |
| `"page"` |  |
| `"paperId"` |  |
| `"paperTitle"` |  |
| `"paragraphId"` |  |
| `"partId"` |  |
| `"q"` |  |
| `"rank"` |  |
| `"scriptureParallels"` |  |
| `"scriptureScores"` |  |
| `"sectionId"` |  |
| `"sectionTitle"` |  |
| `"sortId"` |  |
| `"standardReferenceId"` |  |
| `"text"` |  |
| `"translation"` | Present only when the text is a translation: a machine made it, and it is released as CC0. |
| `"type"` |  |
| `"urantiaParallels"` |  |

Operations: Create, List.

API path: `/search`

#### TableOfContent

| Field | Description |
| --- | --- |
| `"parts"` |  |

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
| `"data"` |  |
| `"id"` | The work id: "bible", or the slug of a text such as "dhammapada". |
| `"kind"` | "scripture": read as sacred by its tradition. |
| `"limit"` |  |
| `"match"` | Keyword search: how it matched. |
| `"meta"` |  |
| `"page"` |  |
| `"q"` |  |
| `"refPrefix"` | The prefix of its references, such as "Dhp". |
| `"reference"` | "John 3:16", "Dhp 183", "BG 2.47-49" (a chunk in semantic search). |
| `"religion"` | The same as `tradition`, kept for older clients. |
| `"similarity"` | Semantic search: cosine similarity. |
| `"strength"` | How close the result is: strong (most right answers score this), related, or weak (likely off the topic). |
| `"summary"` | One plain sentence on what the work is. |
| `"text"` |  |
| `"title"` |  |
| `"tradition"` | The people or the religion of the work: "Buddhist", "Norse", "Ancient Greek". |
| `"translator"` |  |
| `"unitLabel"` | The word for one unit of the work: "verse", "section", "pauri". |
| `"units"` |  |
| `"urantiaParallelLimit"` |  |
| `"urantiaParallels"` | The nearest Urantia paragraphs (semantic parallels, not curated ones). |
| `"urantiaSection"` |  |
| `"url"` | The public page that holds the text, or null. |
| `"work"` | One work only: "bible" or a work id such as "dhammapada". |
| `"year"` |  |

Operations: Create, List, Load.

API path: `/works/search`



## Entities


### Audio

Create an instance: `audio := client.Audio(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audio` | `any` |  |
| `id` | `string` |  |

#### Example: Load

```go
audio, err := client.Audio(nil).Load(map[string]any{"id": "audio_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(audio.(sdk.Entity).Data()) // the loaded entity's record
```


### Bible

Create an instance: `bible := client.Bible(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

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
| `chunk` | `map[string]any` |  |
| `data` | `[]any` |  |
| `fullName` | `string` |  |
| `id` | `string` |  |
| `limit` | `int` |  |
| `meta` | `map[string]any` |  |
| `page` | `int` |  |
| `q` | `string` |  |
| `reference` | `string` |  |
| `text` | `string` |  |
| `translation` | `string` |  |
| `urantiaParallelLimit` | `int` |  |
| `urantiaParallels` | `[]any` |  |
| `verse` | `int` |  |
| `verseCount` | `int` |  |
| `verses` | `[]any` |  |

#### Example: Load

```go
bible, err := client.Bible(nil).Load(map[string]any{"id": "bible_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(bible.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
bibles, err := client.Bible(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range bibles.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Bible(nil).Create(map[string]any{
    "q": "example_q",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Citation

Create an instance: `citation := client.Citation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `citation` | `string` |  |
| `ref` | `string` |  |
| `style` | `string` |  |

#### Example: Load

```go
citation, err := client.Citation(nil).Load(map[string]any{"ref": "ref"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(citation.(sdk.Entity).Data()) // the loaded entity's record
```


### Embedding

Create an instance: `embedding := client.Embedding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dimensions` | `int` |  |
| `embedding` | `[]any` |  |
| `id` | `string` |  |
| `model` | `string` |  |
| `standardReferenceId` | `string` |  |

#### Example: Load

```go
embedding, err := client.Embedding(nil).Load(map[string]any{"id": "embedding_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(embedding.(sdk.Entity).Data()) // the loaded entity's record
```


### Entity

Create an instance: `entity := client.Entity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aliases` | `any` |  |
| `citationCount` | `int` | Number of citations in the source index. |
| `description` | `any` |  |
| `id` | `string` |  |
| `language` | `string` |  |
| `name` | `string` |  |
| `seeAlso` | `any` | Related entry names. |
| `sense` | `any` | For a concept with a lowercase name: "special" when the papers coin the word or use it in their own sense, "ordinary" when they use it in its everyday sense. |
| `type` | `string` |  |

#### Example: Load

```go
entity, err := client.Entity(nil).Load(map[string]any{"id": "entity_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(entity.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
entitys, err := client.Entity(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range entitys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Feedback

Create an instance: `feedback := client.Feedback(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

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

```go
result, err := client.Feedback(nil).Create(map[string]any{
    "category": "example_category",
    "message": "example_message",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Language

Create an instance: `language := client.Language(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` |  |
| `entityCount` | `int` |  |
| `name` | `string` |  |
| `paragraphCount` | `int` |  |

#### Example: List

```go
languages, err := client.Language(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range languages.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Ogn

Create an instance: `ogn := client.Ogn(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
ogn, err := client.Ogn(nil).Load(map[string]any{"ref": "ref"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(ogn.(sdk.Entity).Data()) // the loaded entity's record
```


### Paper

Create an instance: `paper := client.Paper(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `labels` | `any` |  |
| `paper` | `map[string]any` |  |
| `paragraphs` | `[]any` |  |
| `partId` | `string` |  |
| `sortId` | `string` |  |
| `title` | `string` |  |
| `topEntities` | `[]any` |  |
| `video` | `any` |  |

#### Example: Load

```go
paper, err := client.Paper(nil).Load(map[string]any{"id": "paper_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(paper.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
papers, err := client.Paper(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range papers.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Paragraph

Create an instance: `paragraph := client.Paragraph(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `id` | `string` |  |
| `navigation` | `map[string]any` |  |

#### Example: Load

```go
paragraph, err := client.Paragraph(nil).Load(map[string]any{"id": "paragraph_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(paragraph.(sdk.Entity).Data()) // the loaded entity's record
```


### Quote

Create an instance: `quote := client.Quote(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.Quote(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Scripture

Create an instance: `scripture := client.Scripture(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chunk` | `map[string]any` |  |
| `closest` | `[]any` |  |
| `consensus` | `float64` | Mean percentile across the texts, 0 to 1 |
| `corpus` | `map[string]any` | Corpus id, slug, or ref prefix, e.g. |
| `data` | `[]any` |  |
| `distance` | `float64` | 1 minus the highest percentile, 0 to 1 |
| `divisionLabel` | `string` |  |
| `divisions` | `[]any` |  |
| `gap` | `float64` | How far this text's percentile is above the paragraph's mean across texts |
| `id` | `string` |  |
| `license` | `string` |  |
| `limit` | `int` |  |
| `meta` | `map[string]any` |  |
| `notes` | `any` | How the text is numbered or selected |
| `page` | `int` |  |
| `pages` | `[]any` | The reading pages of the work, in order: one division, or one subdivision for a work with three reference levels. |
| `paragraph` | `map[string]any` |  |
| `passage` | `map[string]any` |  |
| `passageCount` | `int` |  |
| `passages` | `[]any` |  |
| `percentile` | `float64` |  |
| `q` | `string` |  |
| `refLevels` | `int` | Numbers in a full ref: 1 for `Dhp 183`, 2 for `BG 2.47`, 3 for `Epictetus 3.22.5` |
| `refPrefix` | `string` |  |
| `religion` | `string` |  |
| `similarity` | `float64` | text-embedding-3-large cosine similarity |
| `similaritySmall` | `float64` | text-embedding-3-small cosine similarity |
| `slug` | `string` |  |
| `sourceUrl` | `string` |  |
| `textsClose` | `int` | Texts that have this paragraph in their top 10% |
| `title` | `string` |  |
| `translator` | `string` |  |
| `unitLabel` | `string` |  |
| `urantiaParallelLimit` | `int` |  |
| `urantiaParallels` | `[]any` |  |
| `urantiaSection` | `any` | The Paper 131 section headed with this religion, or null when Paper 131 has no such heading |
| `year` | `int` |  |

#### Example: Load

```go
scripture, err := client.Scripture(nil).Load(map[string]any{"id": "scripture_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(scripture.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
scriptures, err := client.Scripture(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range scriptures.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Scripture(nil).Create(map[string]any{
    "q": "example_q",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Search

Create an instance: `search := client.Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audio` | `any` |  |
| `bibleParallels` | `[]any` |  |
| `data` | `[]any` |  |
| `entities` | `[]any` |  |
| `htmlText` | `string` |  |
| `id` | `string` |  |
| `include` | `string` |  |
| `labels` | `any` |  |
| `language` | `string` |  |
| `limit` | `int` |  |
| `match` | `string` | How the paragraph matched: reference (the query named it), exact (the whole phrase), all (every word), near (every word after a typo fix, see meta.didYouMean), most (two thirds of the words or more; with type `or`, some of the words). |
| `meta` | `map[string]any` |  |
| `page` | `int` |  |
| `paperId` | `string` |  |
| `paperTitle` | `string` |  |
| `paragraphId` | `string` |  |
| `partId` | `string` |  |
| `q` | `string` |  |
| `rank` | `float64` |  |
| `scriptureParallels` | `[]any` |  |
| `scriptureScores` | `any` |  |
| `sectionId` | `any` |  |
| `sectionTitle` | `any` |  |
| `sortId` | `string` |  |
| `standardReferenceId` | `string` |  |
| `text` | `string` |  |
| `translation` | `map[string]any` | Present only when the text is a translation: a machine made it, and it is released as CC0. |
| `type` | `string` |  |
| `urantiaParallels` | `[]any` |  |

#### Example: List

```go
searchs, err := client.Search(nil).List(map[string]any{"q": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range searchs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Search(nil).Create(map[string]any{
    "q": "example_q",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### TableOfContent

Create an instance: `tableOfContent := client.TableOfContent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `parts` | `[]any` |  |

#### Example: Load

```go
tableOfContent, err := client.TableOfContent(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(tableOfContent.(sdk.Entity).Data()) // the loaded entity's record
```


### Tool

Create an instance: `tool := client.Tool(nil)`


### Work

Create an instance: `work := client.Work(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `[]any` |  |
| `id` | `string` | The work id: "bible", or the slug of a text such as "dhammapada". |
| `kind` | `string` | "scripture": read as sacred by its tradition. |
| `limit` | `int` |  |
| `match` | `string` | Keyword search: how it matched. |
| `meta` | `map[string]any` |  |
| `page` | `int` |  |
| `q` | `string` |  |
| `refPrefix` | `any` | The prefix of its references, such as "Dhp". |
| `reference` | `string` | "John 3:16", "Dhp 183", "BG 2.47-49" (a chunk in semantic search). |
| `religion` | `string` | The same as `tradition`, kept for older clients. |
| `similarity` | `float64` | Semantic search: cosine similarity. |
| `strength` | `string` | How close the result is: strong (most right answers score this), related, or weak (likely off the topic). |
| `summary` | `string` | One plain sentence on what the work is. |
| `text` | `string` |  |
| `title` | `string` |  |
| `tradition` | `string` | The people or the religion of the work: "Buddhist", "Norse", "Ancient Greek". |
| `translator` | `string` |  |
| `unitLabel` | `string` | The word for one unit of the work: "verse", "section", "pauri". |
| `units` | `int` |  |
| `urantiaParallelLimit` | `int` |  |
| `urantiaParallels` | `[]any` | The nearest Urantia paragraphs (semantic parallels, not curated ones). |
| `urantiaSection` | `any` |  |
| `url` | `any` | The public page that holds the text, or null. |
| `work` | `string` | One work only: "bible" or a work id such as "dhammapada". |
| `year` | `any` |  |

#### Example: Load

```go
work, err := client.Work(nil).Load(map[string]any{"ref": "ref", "work": "work"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(work.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
works, err := client.Work(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range works.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Work(nil).Create(map[string]any{
    "q": "example_q",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/urantia-papers-sdk/go/
├── urantia-papers.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/urantia-papers-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
embedding := client.Embedding(nil)
embedding.Load(map[string]any{"id": "example_id"}, nil)

// embedding.Data() now returns the embedding data from the last load
// embedding.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

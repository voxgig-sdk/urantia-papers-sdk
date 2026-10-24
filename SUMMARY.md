# Urantia Papers API

An API and MCP server for the Urantia Papers. Structured access to all 197 papers and more than 14,500 paragraphs, with full-text and semantic search, named entities, cross-references to public domain texts of the world&#39;s religions, and audio. No key needed. Docs: https://docs.urantia.dev

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 16 entities and 47 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Audio

Results: Audio information.

SDK operations: `load`.

### Bible

Results: Bible semantic search results; List of all Bible books; Single verse; Bible verse with top-10 UB paragraphs; Chapter with all verses; Book metadata.

SDK operations: `create`, `list`, `load`.

### Citation

Results: Formatted citation.

SDK operations: `load`.

### Embedding

Results: Embedding vector; Embedding vectors (JSONL or JSON).

SDK operations: `load`.

### Entity

Results: Paginated paragraphs mentioning the entity; Paginated list of entities; The entity.

SDK operations: `list`, `load`.

Key fields to recognise:

- `citationCount`: Number of citations in the source index. A citation of a whole section counts once, so the entity&#39;s paragraph total can be higher.
- `seeAlso`: Related entry names. An entity with citationCount 0 is a cross-reference stub: follow seeAlso to the entry that has the paragraphs.
- `sense`: For a concept with a lowercase name: &quot;special&quot; when the papers coin the word or use it in their own sense, &quot;ordinary&quot; when they use it in its everyday sense. A reader app can leave ordinary words out of a list of terms. Null for other entries.
- `type`: A URI that names the error type.

### Feedback

Results: Feedback received.

SDK operations: `create`.

### Language

Results: Available languages with translation counts.

SDK operations: `list`.

### Ogn

Results: PNG image.

SDK operations: `load`.

### Paper

Results: List of sections; List of all papers; Paper with paragraphs.

SDK operations: `list`, `load`.

Key fields to recognise:

- `title`: The short name of the status.

### Paragraph

Results: The paragraph; Paragraph with context; A random paragraph.

SDK operations: `load`.

### Quote

Results: The result.

SDK operations: `create`.

### Scripture

Results: Search results; The corpora; Paragraphs far from every text; Leans; Mutual pairs; Paragraphs close to many texts; The passages; The passage with its top 10 Urantia paragraphs; The corpus.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `consensus`: Mean percentile across the texts, 0 to 1
- `corpus`: Corpus id, slug, or ref prefix, for example
- `distance`: 1 minus the highest percentile, 0 to 1
- `gap`: How far this text&#39;s percentile is above the paragraph&#39;s mean across texts
- `notes`: How the text is numbered or selected

### Search

Results: Search results with pagination; Semantic search results with pagination.

SDK operations: `create`, `list`.

Key fields to recognise:

- `match`: How the paragraph matched: reference (the query named it), exact (the whole phrase), all (every word), near (every word after a typo fix, see meta.didYouMean), most (two thirds of the words or more; with type `or`, some of the words).
- `translation`: Present only when the text is a translation: a machine made it, and it is released as CC0. No person has reviewed it.
- `type`: A URI that names the error type.

### TableOfContent

Results: Table of contents.

SDK operations: `load`.

### Tool

Results: Anthropic tool definitions; OpenAI tool definitions.

SDK operations: `list`.

### Work

Results: Search results; The works; The unit with its top 10 Urantia paragraphs; The unit, its chunk, and the nearest chunks of the other works; The units.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `id`: The work id: &quot;bible&quot;, or the slug of a text such as &quot;dhammapada&quot;.
- `kind`: &quot;scripture&quot;: read as sacred by its tradition. &quot;classic&quot;: a story, history, or teaching that is not read as scripture. &quot;recorded&quot;: an oral tradition that an outside observer wrote down.
- `match`: Keyword search: how it matched.
- `refPrefix`: The prefix of its references, such as &quot;Dhp&quot;. Null for the Bible (a book name).
- `reference`: &quot;John 3:16&quot;, &quot;Dhp 183&quot;, &quot;BG 2.47-49&quot; (a chunk in semantic search).

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Audio | `load` | `GET /audio/{ref}` | Not required |
| Bible | `create` | `POST /bible/search/semantic` | Not required |
| Bible | `list` | `GET /bible/books` | Not required |
| Bible | `load` | `GET /bible/{bookCode}/{chapter}/{verse}` | Not required |
| Bible | `load` | `GET /bible/{bookCode}/{chapter}/{verse}/urantia-parallels` | Not required |
| Bible | `load` | `GET /bible/{bookCode}/{chapter}` | Not required |
| Bible | `load` | `GET /bible/{bookCode}` | Not required |
| Citation | `load` | `GET /cite` | Not required |
| Embedding | `load` | `GET /embeddings/{ref}` | Not required |
| Embedding | `load` | `GET /embeddings/export` | Not required |
| Entity | `list` | `GET /entities/{id}/paragraphs` | Not required |
| Entity | `list` | `GET /entities` | Not required |
| Entity | `load` | `GET /entities/{id}` | Not required |
| Feedback | `create` | `POST /feedback` | Not required |
| Language | `list` | `GET /languages` | Not required |
| Ogn | `load` | `GET /og/{ref}` | Not required |
| Paper | `list` | `GET /papers/{id}/sections` | Not required |
| Paper | `list` | `GET /papers` | Not required |
| Paper | `load` | `GET /papers/{id}` | Not required |
| Paragraph | `load` | `GET /paragraphs/{ref}` | Not required |
| Paragraph | `load` | `GET /paragraphs/{ref}/context` | Not required |
| Paragraph | `load` | `GET /paragraphs/random` | Not required |
| Quote | `create` | `POST /quotes/verify` | Not required |
| Scripture | `create` | `POST /scriptures/search/semantic` | Not required |
| Scripture | `list` | `GET /scriptures` | Not required |
| Scripture | `list` | `GET /scriptures/insights/far` | Not required |
| Scripture | `list` | `GET /scriptures/insights/leans` | Not required |
| Scripture | `list` | `GET /scriptures/insights/pairs` | Not required |
| Scripture | `list` | `GET /scriptures/insights/shared-currents` | Not required |
| Scripture | `load` | `GET /scriptures/{corpus}/{ref}` | Not required |
| Scripture | `load` | `GET /scriptures/{corpus}/{ref}/urantia-parallels` | Not required |
| Scripture | `load` | `GET /scriptures/{corpus}` | Not required |
| Search | `create` | `POST /search` | Not required |
| Search | `create` | `POST /search/semantic` | Not required |
| Search | `list` | `GET /search` | Not required |
| Search | `list` | `GET /search/semantic` | Not required |
| TableOfContent | `load` | `GET /toc` | Not required |
| Tool | `list` | `GET /tools/anthropic` | Not required |
| Tool | `list` | `GET /tools/openai` | Not required |
| Work | `create` | `POST /works/search` | Not required |
| Work | `create` | `POST /works/search/semantic` | Not required |
| Work | `list` | `GET /works/search` | Not required |
| Work | `list` | `GET /works/search/semantic` | Not required |
| Work | `list` | `GET /works` | Not required |
| Work | `load` | `GET /works/{work}/{ref}/urantia-parallels` | Not required |
| Work | `load` | `GET /works/{work}/{ref}/work-parallels` | Not required |
| Work | `load` | `GET /works/{work}/{ref}` | Not required |

## Connect to the API

- Production: `https://api.urantia.dev`
- Local development: `http://localhost:3000`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

A read request without required parameters or authentication is `GET /bible/books`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://api.urantia.dev/bible/books'
```

Inspect the response using the Bible reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `urantia-papers_list`: List records for an entity. Supported entities: `bible`, `entity`, `language`, `paper`, `scripture`, `search`, `tool`, `work`.
- `urantia-papers_load`: Load one record for an entity. Supported entities: `audio`, `bible`, `citation`, `embedding`, `entity`, `ogn`, `paper`, `paragraph`, `scripture`, `table_of_content`, `work`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.


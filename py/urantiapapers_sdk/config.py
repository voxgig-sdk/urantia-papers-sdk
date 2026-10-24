# UrantiaPapers SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "UrantiaPapers",
            "slug": "urantia-papers",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.urantia.dev",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "audio": {},
                "bible": {},
                "citation": {},
                "embedding": {},
                "entity": {},
                "feedback": {},
                "language": {},
                "ogn": {},
                "paper": {},
                "paragraph": {},
                "quote": {},
                "scripture": {},
                "search": {},
                "table_of_content": {},
                "tool": {},
                "work": {},
            },
        },
        "entity": {
      "audio": {
        "fields": [
          {
            "name": "audio",
            "title": "Audio",
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "audio",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/audio/{ref}",
                "segments": [
                  {
                    "lit": "audio",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "audio",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ref": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "ref",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "2:5.1",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "bible": {
        "fields": [
          {
            "name": "abbr",
            "title": "Abbr",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "bookCode",
            "title": "Book Code",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "create": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "bookName",
            "title": "Book Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "bookOrder",
            "title": "Book Order",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "canon",
            "title": "Canon",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "create": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "chapter",
            "title": "Chapter",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "chapterCount",
            "title": "Chapter Count",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "chunk",
            "title": "Chunk",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "data",
            "title": "Data",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "fullName",
            "title": "Full Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "limit",
            "title": "Limit",
            "type": "`$INTEGER`",
          },
          {
            "name": "meta",
            "title": "Meta",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "page",
            "title": "Page",
            "type": "`$INTEGER`",
          },
          {
            "name": "q",
            "title": "Q",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "reference",
            "title": "Reference",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "text",
            "title": "Text",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "translation",
            "title": "Translation",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "urantiaParallelLimit",
            "title": "Urantia Parallel Limit",
            "type": "`$INTEGER`",
          },
          {
            "name": "urantiaParallels",
            "title": "Urantia Parallels",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "verse",
            "title": "Verse",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "verseCount",
            "title": "Verse Count",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "verses",
            "title": "Verses",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "bible",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/bible/search/semantic",
                "segments": [
                  {
                    "lit": "bible",
                  },
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "semantic",
                  },
                ],
                "parts": [
                  "bible",
                  "search",
                  "semantic",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/bible/books",
                "segments": [
                  {
                    "lit": "bible",
                  },
                  {
                    "lit": "books",
                  },
                ],
                "parts": [
                  "bible",
                  "books",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {},
                "select": {
                  "$action": "book",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/bible/{bookCode}/{chapter}/{verse}",
                "segments": [
                  {
                    "lit": "bible",
                  },
                  {
                    "var": "book_code",
                  },
                  {
                    "var": "chapter",
                  },
                  {
                    "var": "verse",
                  },
                ],
                "parts": [
                  "bible",
                  "{book_code}",
                  "{chapter}",
                  "{verse}",
                ],
                "rename": {
                  "param": {
                    "bookCode": "book_code",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "book_code",
                      "orig": "bookCode",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "MAT",
                    },
                    {
                      "name": "chapter",
                      "orig": "chapter",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 5,
                    },
                    {
                      "name": "verse",
                      "orig": "verse",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 3,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "book_code",
                    "chapter",
                    "verse",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/bible/{bookCode}/{chapter}/{verse}/urantia-parallels",
                "segments": [
                  {
                    "lit": "bible",
                  },
                  {
                    "var": "book_code",
                  },
                  {
                    "var": "chapter",
                  },
                  {
                    "var": "verse",
                  },
                  {
                    "lit": "urantia-parallels",
                  },
                ],
                "parts": [
                  "bible",
                  "{book_code}",
                  "{chapter}",
                  "{verse}",
                  "urantia-parallels",
                ],
                "rename": {
                  "param": {
                    "bookCode": "book_code",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "book_code",
                      "orig": "bookCode",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "MAT",
                    },
                    {
                      "name": "chapter",
                      "orig": "chapter",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 5,
                    },
                    {
                      "name": "verse",
                      "orig": "verse",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 3,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "book_code",
                    "chapter",
                    "verse",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/bible/{bookCode}/{chapter}",
                "segments": [
                  {
                    "lit": "bible",
                  },
                  {
                    "var": "book_code",
                  },
                  {
                    "var": "chapter",
                  },
                ],
                "parts": [
                  "bible",
                  "{book_code}",
                  "{chapter}",
                ],
                "rename": {
                  "param": {
                    "bookCode": "book_code",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "book_code",
                      "orig": "bookCode",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "MAT",
                    },
                    {
                      "name": "chapter",
                      "orig": "chapter",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 5,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "book_code",
                    "chapter",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/bible/{bookCode}",
                "segments": [
                  {
                    "lit": "bible",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "bible",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "bookCode": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "bookCode",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "MAT",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "citation": {
        "fields": [
          {
            "name": "citation",
            "title": "Citation",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "ref",
            "title": "Ref",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "style",
            "title": "Style",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "citation",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/cite",
                "segments": [
                  {
                    "lit": "cite",
                  },
                ],
                "parts": [
                  "cite",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "ref",
                      "orig": "ref",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "2:5.1",
                      "field": True,
                    },
                    {
                      "name": "style",
                      "orig": "style",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "apa",
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "ref",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "embedding": {
        "fields": [
          {
            "name": "dimensions",
            "title": "Dimensions",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "embedding",
            "title": "Embedding",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "model",
            "title": "Model",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "standardReferenceId",
            "title": "Standard Reference Id",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "embedding",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/embeddings/{ref}",
                "segments": [
                  {
                    "lit": "embeddings",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "embeddings",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ref": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "ref",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "2:5.1",
                    },
                  ],
                  "query": [
                    {
                      "name": "model",
                      "orig": "model",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "large",
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/embeddings/export",
                "segments": [
                  {
                    "lit": "embeddings",
                  },
                  {
                    "lit": "export",
                  },
                ],
                "parts": [
                  "embeddings",
                  "export",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "jsonl",
                    },
                    {
                      "name": "model",
                      "orig": "model",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "large",
                      "field": True,
                    },
                    {
                      "name": "paper_id",
                      "orig": "paperId",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "2",
                    },
                  ],
                },
                "select": {
                  "$action": "export",
                  "exist": [
                    "paper_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "entity": {
        "fields": [
          {
            "name": "aliases",
            "title": "Aliases",
            "type": [
              "`$ONE`",
              [
                "`$ARRAY`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "citationCount",
            "title": "Citation Count",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Number of citations in the source index.",
          },
          {
            "name": "description",
            "title": "Description",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "language",
            "title": "Language",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "seeAlso",
            "title": "See Also",
            "type": [
              "`$ONE`",
              [
                "`$ARRAY`",
                "`$NULL`",
              ],
            ],
            "req": True,
            "short": "Related entry names.",
          },
          {
            "name": "sense",
            "title": "Sense",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
            "short": "For a concept with a lowercase name: \"special\" when the papers coin the word or use it in their own sense, \"ordinary\" when they use it in its everyday sense.",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "entity",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/entities/{id}/paragraphs",
                "segments": [
                  {
                    "lit": "entities",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "paragraphs",
                  },
                ],
                "parts": [
                  "entities",
                  "{id}",
                  "paragraphs",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "michael-of-nebadon",
                    },
                  ],
                  "query": [
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "eng",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": [
                        "`$ONE`",
                        [
                          "`$INTEGER`",
                          "`$NULL`",
                        ],
                      ],
                      "kind": "query",
                      "example": 0,
                    },
                  ],
                },
                "select": {
                  "$action": "paragraph",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/entities",
                "segments": [
                  {
                    "lit": "entities",
                  },
                ],
                "parts": [
                  "entities",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "eng",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": [
                        "`$ONE`",
                        [
                          "`$INTEGER`",
                          "`$NULL`",
                        ],
                      ],
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/entities/{id}",
                "segments": [
                  {
                    "lit": "entities",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "entities",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "michael-of-nebadon",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "feedback": {
        "fields": [
          {
            "name": "category",
            "title": "Category",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "client",
            "title": "Client",
            "type": "`$STRING`",
          },
          {
            "name": "contact",
            "title": "Contact",
            "type": "`$STRING`",
          },
          {
            "name": "endpoint",
            "title": "Endpoint",
            "type": "`$STRING`",
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "pageUrl",
            "title": "Page Url",
            "type": "`$STRING`",
            "format": "uri",
          },
          {
            "name": "ref",
            "title": "Ref",
            "type": "`$STRING`",
          },
          {
            "name": "requestId",
            "title": "Request Id",
            "type": "`$STRING`",
          },
        ],
        "name": "feedback",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/feedback",
                "segments": [
                  {
                    "lit": "feedback",
                  },
                ],
                "parts": [
                  "feedback",
                ],
                "rename": {},
                "transform": {
                  "req": {
                    "category": "`reqdata.category`",
                    "client": "`reqdata.client`",
                    "contact": "`reqdata.contact`",
                    "endpoint": "`reqdata.endpoint`",
                    "message": "`reqdata.message`",
                    "pageUrl": "`reqdata.page_url`",
                    "ref": "`reqdata.ref`",
                    "requestId": "`reqdata.request_id`",
                  },
                  "res": "`body.data`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "language": {
        "fields": [
          {
            "name": "code",
            "title": "Code",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "entityCount",
            "title": "Entity Count",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "paragraphCount",
            "title": "Paragraph Count",
            "type": "`$INTEGER`",
            "req": True,
          },
        ],
        "name": "language",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/languages",
                "segments": [
                  {
                    "lit": "languages",
                  },
                ],
                "parts": [
                  "languages",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "ogn": {
        "fields": [],
        "name": "ogn",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/og/{ref}",
                "segments": [
                  {
                    "lit": "og",
                  },
                  {
                    "var": "ref",
                  },
                ],
                "parts": [
                  "og",
                  "{ref}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "ref",
                      "orig": "ref",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "2:5.1",
                    },
                  ],
                  "query": [
                    {
                      "name": "theme",
                      "orig": "theme",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "default",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "ref",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "paper": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "labels",
            "title": "Labels",
            "type": [
              "`$ONE`",
              [
                "`$ARRAY`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "paper",
            "title": "Paper",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "paragraphs",
            "title": "Paragraphs",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "partId",
            "title": "Part Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "sortId",
            "title": "Sort Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "topEntities",
            "title": "Top Entities",
            "type": "`$ARRAY`",
          },
          {
            "name": "video",
            "title": "Video",
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "paper",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/papers/{id}/sections",
                "segments": [
                  {
                    "lit": "papers",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "sections",
                  },
                ],
                "parts": [
                  "papers",
                  "{id}",
                  "sections",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "1",
                    },
                  ],
                  "query": [
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "eng",
                    },
                  ],
                },
                "select": {
                  "$action": "section",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/papers",
                "segments": [
                  {
                    "lit": "papers",
                  },
                ],
                "parts": [
                  "papers",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "default",
                    },
                    {
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "eng",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/papers/{id}",
                "segments": [
                  {
                    "lit": "papers",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "papers",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "1",
                    },
                  ],
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "default",
                    },
                    {
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "eng",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "paragraph": {
        "fields": [
          {
            "name": "data",
            "title": "Data",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "navigation",
            "title": "Navigation",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "paragraph",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/paragraphs/{ref}",
                "segments": [
                  {
                    "lit": "paragraphs",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "paragraphs",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ref": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "ref",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "2:5.1",
                    },
                  ],
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "default",
                    },
                    {
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "eng",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/paragraphs/{ref}/context",
                "segments": [
                  {
                    "lit": "paragraphs",
                  },
                  {
                    "var": "ref",
                  },
                  {
                    "lit": "context",
                  },
                ],
                "parts": [
                  "paragraphs",
                  "{ref}",
                  "context",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "ref",
                      "orig": "ref",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "2:5.1",
                    },
                  ],
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "default",
                    },
                    {
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "eng",
                    },
                    {
                      "name": "window",
                      "orig": "window",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 2,
                    },
                  ],
                },
                "select": {
                  "$action": "context",
                  "exist": [
                    "ref",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/paragraphs/random",
                "segments": [
                  {
                    "lit": "paragraphs",
                  },
                  {
                    "lit": "random",
                  },
                ],
                "parts": [
                  "paragraphs",
                  "random",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "default",
                    },
                    {
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "eng",
                    },
                    {
                      "name": "max_length",
                      "orig": "maxLength",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "min_length",
                      "orig": "minLength",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "random",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "quote": {
        "fields": [],
        "name": "quote",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/quotes/verify",
                "segments": [
                  {
                    "lit": "quotes",
                  },
                  {
                    "lit": "verify",
                  },
                ],
                "parts": [
                  "quotes",
                  "verify",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {},
                "select": {
                  "$action": "verify",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "scripture": {
        "fields": [
          {
            "name": "chunk",
            "title": "Chunk",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "closest",
            "title": "Closest",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "consensus",
            "title": "Consensus",
            "type": "`$NUMBER`",
            "req": True,
            "short": "Mean percentile across the texts, 0 to 1",
          },
          {
            "name": "corpus",
            "title": "Corpus",
            "type": "`$OBJECT`",
            "req": True,
            "op": {
              "create": {
                "type": "`$STRING`",
              },
            },
            "short": "Corpus id, slug, or ref prefix, e.g.",
          },
          {
            "name": "data",
            "title": "Data",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "distance",
            "title": "Distance",
            "type": "`$NUMBER`",
            "req": True,
            "short": "1 minus the highest percentile, 0 to 1",
          },
          {
            "name": "divisionLabel",
            "title": "Division Label",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "divisions",
            "title": "Divisions",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "gap",
            "title": "Gap",
            "type": "`$NUMBER`",
            "req": True,
            "short": "How far this text's percentile is above the paragraph's mean across texts",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "license",
            "title": "License",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "limit",
            "title": "Limit",
            "type": "`$INTEGER`",
          },
          {
            "name": "meta",
            "title": "Meta",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "notes",
            "title": "Notes",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
            "short": "How the text is numbered or selected",
          },
          {
            "name": "page",
            "title": "Page",
            "type": "`$INTEGER`",
          },
          {
            "name": "pages",
            "title": "Pages",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The reading pages of the work, in order: one division, or one subdivision for a work with three reference levels.",
          },
          {
            "name": "paragraph",
            "title": "Paragraph",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "passage",
            "title": "Passage",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "passageCount",
            "title": "Passage Count",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "passages",
            "title": "Passages",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "percentile",
            "title": "Percentile",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "q",
            "title": "Q",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "refLevels",
            "title": "Ref Levels",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Numbers in a full ref: 1 for `Dhp 183`, 2 for `BG 2.47`, 3 for `Epictetus 3.22.5`",
          },
          {
            "name": "refPrefix",
            "title": "Ref Prefix",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "religion",
            "title": "Religion",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "similarity",
            "title": "Similarity",
            "type": "`$NUMBER`",
            "req": True,
            "short": "text-embedding-3-large cosine similarity",
          },
          {
            "name": "similaritySmall",
            "title": "Similarity Small",
            "type": "`$NUMBER`",
            "req": True,
            "short": "text-embedding-3-small cosine similarity",
          },
          {
            "name": "slug",
            "title": "Slug",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "sourceUrl",
            "title": "Source Url",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "textsClose",
            "title": "Texts Close",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Texts that have this paragraph in their top 10%",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "translator",
            "title": "Translator",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "unitLabel",
            "title": "Unit Label",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "urantiaParallelLimit",
            "title": "Urantia Parallel Limit",
            "type": "`$INTEGER`",
          },
          {
            "name": "urantiaParallels",
            "title": "Urantia Parallels",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "urantiaSection",
            "title": "Urantia Section",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
            "short": "The Paper 131 section headed with this religion, or null when Paper 131 has no such heading",
          },
          {
            "name": "year",
            "title": "Year",
            "type": "`$INTEGER`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "scripture",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/scriptures/search/semantic",
                "segments": [
                  {
                    "lit": "scriptures",
                  },
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "semantic",
                  },
                ],
                "parts": [
                  "scriptures",
                  "search",
                  "semantic",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/scriptures",
                "segments": [
                  {
                    "lit": "scriptures",
                  },
                ],
                "parts": [
                  "scriptures",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/scriptures/insights/far",
                "segments": [
                  {
                    "lit": "scriptures",
                  },
                  {
                    "lit": "insights",
                  },
                  {
                    "lit": "far",
                  },
                ],
                "parts": [
                  "scriptures",
                  "insights",
                  "far",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                      "field": True,
                    },
                    {
                      "name": "min_length",
                      "orig": "minLength",
                      "type": [
                        "`$ONE`",
                        [
                          "`$INTEGER`",
                          "`$NULL`",
                        ],
                      ],
                      "kind": "query",
                      "example": 200,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": [
                        "`$ONE`",
                        [
                          "`$INTEGER`",
                          "`$NULL`",
                        ],
                      ],
                      "kind": "query",
                      "example": 0,
                      "field": True,
                    },
                    {
                      "name": "paper_id",
                      "orig": "paperId",
                      "type": [
                        "`$ONE`",
                        [
                          "`$INTEGER`",
                          "`$NULL`",
                        ],
                      ],
                      "kind": "query",
                      "example": "2",
                    },
                    {
                      "name": "part_id",
                      "orig": "partId",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/scriptures/insights/leans",
                "segments": [
                  {
                    "lit": "scriptures",
                  },
                  {
                    "lit": "insights",
                  },
                  {
                    "lit": "leans",
                  },
                ],
                "parts": [
                  "scriptures",
                  "insights",
                  "leans",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "corpus",
                      "orig": "corpus",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "exclude_bible",
                      "orig": "excludeBible",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                      "field": True,
                    },
                    {
                      "name": "min_length",
                      "orig": "minLength",
                      "type": [
                        "`$ONE`",
                        [
                          "`$INTEGER`",
                          "`$NULL`",
                        ],
                      ],
                      "kind": "query",
                      "example": 200,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": [
                        "`$ONE`",
                        [
                          "`$INTEGER`",
                          "`$NULL`",
                        ],
                      ],
                      "kind": "query",
                      "example": 0,
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/scriptures/insights/pairs",
                "segments": [
                  {
                    "lit": "scriptures",
                  },
                  {
                    "lit": "insights",
                  },
                  {
                    "lit": "pairs",
                  },
                ],
                "parts": [
                  "scriptures",
                  "insights",
                  "pairs",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "corpus",
                      "orig": "corpus",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "exclude_bible",
                      "orig": "excludeBible",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                      "field": True,
                    },
                    {
                      "name": "min_length",
                      "orig": "minLength",
                      "type": [
                        "`$ONE`",
                        [
                          "`$INTEGER`",
                          "`$NULL`",
                        ],
                      ],
                      "kind": "query",
                      "example": 200,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": [
                        "`$ONE`",
                        [
                          "`$INTEGER`",
                          "`$NULL`",
                        ],
                      ],
                      "kind": "query",
                      "example": 0,
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/scriptures/insights/shared-currents",
                "segments": [
                  {
                    "lit": "scriptures",
                  },
                  {
                    "lit": "insights",
                  },
                  {
                    "lit": "shared-currents",
                  },
                ],
                "parts": [
                  "scriptures",
                  "insights",
                  "shared-currents",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                      "field": True,
                    },
                    {
                      "name": "min_length",
                      "orig": "minLength",
                      "type": [
                        "`$ONE`",
                        [
                          "`$INTEGER`",
                          "`$NULL`",
                        ],
                      ],
                      "kind": "query",
                      "example": 200,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": [
                        "`$ONE`",
                        [
                          "`$INTEGER`",
                          "`$NULL`",
                        ],
                      ],
                      "kind": "query",
                      "example": 0,
                      "field": True,
                    },
                    {
                      "name": "paper_id",
                      "orig": "paperId",
                      "type": [
                        "`$ONE`",
                        [
                          "`$INTEGER`",
                          "`$NULL`",
                        ],
                      ],
                      "kind": "query",
                      "example": "2",
                    },
                    {
                      "name": "part_id",
                      "orig": "partId",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/scriptures/{corpus}/{ref}",
                "segments": [
                  {
                    "lit": "scriptures",
                  },
                  {
                    "var": "corpus",
                  },
                  {
                    "var": "ref",
                  },
                ],
                "parts": [
                  "scriptures",
                  "{corpus}",
                  "{ref}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "corpus",
                      "orig": "corpus",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "bhagavad-gita",
                    },
                    {
                      "name": "ref",
                      "orig": "ref",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "2.47",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "corpus",
                    "ref",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/scriptures/{corpus}/{ref}/urantia-parallels",
                "segments": [
                  {
                    "lit": "scriptures",
                  },
                  {
                    "var": "corpus",
                  },
                  {
                    "var": "ref",
                  },
                  {
                    "lit": "urantia-parallels",
                  },
                ],
                "parts": [
                  "scriptures",
                  "{corpus}",
                  "{ref}",
                  "urantia-parallels",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "corpus",
                      "orig": "corpus",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "bhagavad-gita",
                    },
                    {
                      "name": "ref",
                      "orig": "ref",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "2.47",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "corpus",
                    "ref",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/scriptures/{corpus}",
                "segments": [
                  {
                    "lit": "scriptures",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "scriptures",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "corpus": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "corpus",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "bhagavad-gita",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "search": {
        "fields": [
          {
            "name": "audio",
            "title": "Audio",
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "bibleParallels",
            "title": "Bible Parallels",
            "type": "`$ARRAY`",
          },
          {
            "name": "data",
            "title": "Data",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "entities",
            "title": "Entities",
            "type": "`$ARRAY`",
          },
          {
            "name": "htmlText",
            "title": "Html Text",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "include",
            "title": "Include",
            "type": "`$STRING`",
          },
          {
            "name": "labels",
            "title": "Labels",
            "type": [
              "`$ONE`",
              [
                "`$ARRAY`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "language",
            "title": "Language",
            "type": "`$STRING`",
          },
          {
            "name": "limit",
            "title": "Limit",
            "type": "`$INTEGER`",
          },
          {
            "name": "match",
            "title": "Match",
            "type": "`$STRING`",
            "req": True,
            "short": "How the paragraph matched: reference (the query named it), exact (the whole phrase), all (every word), near (every word after a typo fix, see meta.didYouMean), most (two thirds of the words or more; with type `or`, some of the words).",
          },
          {
            "name": "meta",
            "title": "Meta",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "page",
            "title": "Page",
            "type": "`$INTEGER`",
          },
          {
            "name": "paperId",
            "title": "Paper Id",
            "type": "`$STRING`",
            "op": {
              "list": {
                "req": True,
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "paperTitle",
            "title": "Paper Title",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "paragraphId",
            "title": "Paragraph Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "partId",
            "title": "Part Id",
            "type": "`$STRING`",
            "op": {
              "list": {
                "req": True,
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "q",
            "title": "Q",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "rank",
            "title": "Rank",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "scriptureParallels",
            "title": "Scripture Parallels",
            "type": "`$ARRAY`",
          },
          {
            "name": "scriptureScores",
            "title": "Scripture Scores",
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "sectionId",
            "title": "Section Id",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "sectionTitle",
            "title": "Section Title",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "sortId",
            "title": "Sort Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "standardReferenceId",
            "title": "Standard Reference Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "text",
            "title": "Text",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "translation",
            "title": "Translation",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Present only when the text is a translation: a machine made it, and it is released as CC0.",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
          },
          {
            "name": "urantiaParallels",
            "title": "Urantia Parallels",
            "type": "`$ARRAY`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "search",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/search",
                "segments": [
                  {
                    "lit": "search",
                  },
                ],
                "parts": [
                  "search",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/search/semantic",
                "segments": [
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "semantic",
                  },
                ],
                "parts": [
                  "search",
                  "semantic",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {
                  "$action": "semantic",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/search",
                "segments": [
                  {
                    "lit": "search",
                  },
                ],
                "parts": [
                  "search",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": [
                        "`$ONE`",
                        [
                          "`$INTEGER`",
                          "`$NULL`",
                        ],
                      ],
                      "kind": "query",
                      "example": 0,
                      "field": True,
                    },
                    {
                      "name": "paper_id",
                      "orig": "paperId",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "2",
                    },
                    {
                      "name": "part_id",
                      "orig": "partId",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "love",
                      "field": True,
                    },
                    {
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "auto",
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "q",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/search/semantic",
                "segments": [
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "semantic",
                  },
                ],
                "parts": [
                  "search",
                  "semantic",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": [
                        "`$ONE`",
                        [
                          "`$INTEGER`",
                          "`$NULL`",
                        ],
                      ],
                      "kind": "query",
                      "example": 0,
                      "field": True,
                    },
                    {
                      "name": "paper_id",
                      "orig": "paperId",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "2",
                    },
                    {
                      "name": "part_id",
                      "orig": "partId",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "love",
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "$action": "semantic",
                  "exist": [
                    "q",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "table_of_content": {
        "fields": [
          {
            "name": "parts",
            "title": "Parts",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "name": "table_of_content",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/toc",
                "segments": [
                  {
                    "lit": "toc",
                  },
                ],
                "parts": [
                  "toc",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "eng",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "tool": {
        "fields": [],
        "name": "tool",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/tools/anthropic",
                "segments": [
                  {
                    "lit": "tools",
                  },
                  {
                    "lit": "anthropic",
                  },
                ],
                "parts": [
                  "tools",
                  "anthropic",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.tools`",
                },
                "args": {},
                "select": {
                  "$action": "anthropic",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/tools/openai",
                "segments": [
                  {
                    "lit": "tools",
                  },
                  {
                    "lit": "openai",
                  },
                ],
                "parts": [
                  "tools",
                  "openai",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.tools`",
                },
                "args": {},
                "select": {
                  "$action": "openai",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "work": {
        "fields": [
          {
            "name": "data",
            "title": "Data",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The work id: \"bible\", or the slug of a text such as \"dhammapada\".",
          },
          {
            "name": "kind",
            "title": "Kind",
            "type": "`$STRING`",
            "req": True,
            "short": "\"scripture\": read as sacred by its tradition.",
          },
          {
            "name": "limit",
            "title": "Limit",
            "type": "`$INTEGER`",
          },
          {
            "name": "match",
            "title": "Match",
            "type": "`$STRING`",
            "short": "Keyword search: how it matched.",
          },
          {
            "name": "meta",
            "title": "Meta",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "page",
            "title": "Page",
            "type": "`$INTEGER`",
          },
          {
            "name": "q",
            "title": "Q",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "refPrefix",
            "title": "Ref Prefix",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
            "short": "The prefix of its references, such as \"Dhp\".",
          },
          {
            "name": "reference",
            "title": "Reference",
            "type": "`$STRING`",
            "req": True,
            "short": "\"John 3:16\", \"Dhp 183\", \"BG 2.47-49\" (a chunk in semantic search).",
          },
          {
            "name": "religion",
            "title": "Religion",
            "type": "`$STRING`",
            "req": True,
            "short": "The same as `tradition`, kept for older clients.",
          },
          {
            "name": "similarity",
            "title": "Similarity",
            "type": "`$NUMBER`",
            "short": "Semantic search: cosine similarity.",
          },
          {
            "name": "strength",
            "title": "Strength",
            "type": "`$STRING`",
            "short": "How close the result is: strong (most right answers score this), related, or weak (likely off the topic).",
          },
          {
            "name": "summary",
            "title": "Summary",
            "type": "`$STRING`",
            "req": True,
            "short": "One plain sentence on what the work is.",
          },
          {
            "name": "text",
            "title": "Text",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "tradition",
            "title": "Tradition",
            "type": "`$STRING`",
            "req": True,
            "short": "The people or the religion of the work: \"Buddhist\", \"Norse\", \"Ancient Greek\".",
          },
          {
            "name": "translator",
            "title": "Translator",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "unitLabel",
            "title": "Unit Label",
            "type": "`$STRING`",
            "req": True,
            "short": "The word for one unit of the work: \"verse\", \"section\", \"pauri\".",
          },
          {
            "name": "units",
            "title": "Units",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "urantiaParallelLimit",
            "title": "Urantia Parallel Limit",
            "type": "`$INTEGER`",
          },
          {
            "name": "urantiaParallels",
            "title": "Urantia Parallels",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The nearest Urantia paragraphs (semantic parallels, not curated ones).",
          },
          {
            "name": "urantiaSection",
            "title": "Urantia Section",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "url",
            "title": "Url",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
            "short": "The public page that holds the text, or null.",
          },
          {
            "name": "work",
            "title": "Work",
            "type": "`$STRING`",
            "op": {
              "list": {
                "req": True,
                "type": "`$OBJECT`",
              },
            },
            "short": "One work only: \"bible\" or a work id such as \"dhammapada\".",
          },
          {
            "name": "year",
            "title": "Year",
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "work": "work.id",
          },
          "name": "id",
          "parts": [
            "work",
            "ref",
          ],
          "sep": "/",
        },
        "name": "work",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/works/search",
                "segments": [
                  {
                    "lit": "works",
                  },
                  {
                    "lit": "search",
                  },
                ],
                "parts": [
                  "works",
                  "search",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {
                  "$action": "search",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/works/search/semantic",
                "segments": [
                  {
                    "lit": "works",
                  },
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "semantic",
                  },
                ],
                "parts": [
                  "works",
                  "search",
                  "semantic",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/works/search",
                "segments": [
                  {
                    "lit": "works",
                  },
                  {
                    "lit": "search",
                  },
                ],
                "parts": [
                  "works",
                  "search",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": [
                        "`$ONE`",
                        [
                          "`$INTEGER`",
                          "`$NULL`",
                        ],
                      ],
                      "kind": "query",
                      "example": 0,
                      "field": True,
                    },
                    {
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "love",
                      "field": True,
                    },
                    {
                      "name": "urantia_parallel_limit",
                      "orig": "urantiaParallelLimit",
                      "type": [
                        "`$ONE`",
                        [
                          "`$INTEGER`",
                          "`$NULL`",
                        ],
                      ],
                      "kind": "query",
                      "example": 3,
                    },
                    {
                      "name": "work",
                      "orig": "work",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "$action": "search",
                  "exist": [
                    "q",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/works/search/semantic",
                "segments": [
                  {
                    "lit": "works",
                  },
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "semantic",
                  },
                ],
                "parts": [
                  "works",
                  "search",
                  "semantic",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": [
                        "`$ONE`",
                        [
                          "`$INTEGER`",
                          "`$NULL`",
                        ],
                      ],
                      "kind": "query",
                      "example": 0,
                      "field": True,
                    },
                    {
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "love",
                      "field": True,
                    },
                    {
                      "name": "urantia_parallel_limit",
                      "orig": "urantiaParallelLimit",
                      "type": [
                        "`$ONE`",
                        [
                          "`$INTEGER`",
                          "`$NULL`",
                        ],
                      ],
                      "kind": "query",
                      "example": 3,
                    },
                    {
                      "name": "work",
                      "orig": "work",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "q",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/works",
                "segments": [
                  {
                    "lit": "works",
                  },
                ],
                "parts": [
                  "works",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/works/{work}/{ref}/urantia-parallels",
                "segments": [
                  {
                    "lit": "works",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "var": "ref",
                  },
                  {
                    "lit": "urantia-parallels",
                  },
                ],
                "parts": [
                  "works",
                  "{id}",
                  "{ref}",
                  "urantia-parallels",
                ],
                "rename": {
                  "param": {
                    "work": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "work",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "bhagavad-gita",
                    },
                    {
                      "name": "ref",
                      "orig": "ref",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "2.47",
                    },
                  ],
                },
                "select": {
                  "$action": "urantia_parallel",
                  "exist": [
                    "id",
                    "ref",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/works/{work}/{ref}/work-parallels",
                "segments": [
                  {
                    "lit": "works",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "var": "ref",
                  },
                  {
                    "lit": "work-parallels",
                  },
                ],
                "parts": [
                  "works",
                  "{id}",
                  "{ref}",
                  "work-parallels",
                ],
                "rename": {
                  "param": {
                    "work": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "work",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "bhagavad-gita",
                    },
                    {
                      "name": "ref",
                      "orig": "ref",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "2.47",
                    },
                  ],
                },
                "select": {
                  "$action": "work_parallel",
                  "exist": [
                    "id",
                    "ref",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/works/{work}/{ref}",
                "segments": [
                  {
                    "lit": "works",
                  },
                  {
                    "var": "work",
                  },
                  {
                    "var": "ref",
                  },
                ],
                "parts": [
                  "works",
                  "{work}",
                  "{ref}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "ref",
                      "orig": "ref",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "2.47",
                    },
                    {
                      "name": "work",
                      "orig": "work",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "bhagavad-gita",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "ref",
                    "work",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }

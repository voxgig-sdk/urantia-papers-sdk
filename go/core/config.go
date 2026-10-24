package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "UrantiaPapers",
			"slug": "urantia-papers",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.urantia.dev",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"audio": map[string]any{},
				"bible": map[string]any{},
				"citation": map[string]any{},
				"embedding": map[string]any{},
				"entity": map[string]any{},
				"feedback": map[string]any{},
				"language": map[string]any{},
				"ogn": map[string]any{},
				"paper": map[string]any{},
				"paragraph": map[string]any{},
				"quote": map[string]any{},
				"scripture": map[string]any{},
				"search": map[string]any{},
				"table_of_content": map[string]any{},
				"tool": map[string]any{},
				"work": map[string]any{},
			},
		},
		"entity": map[string]any{
			"audio": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "audio",
						"title": "Audio",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "audio",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/audio/{ref}",
								"segments": []any{
									map[string]any{
										"lit": "audio",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"audio",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ref": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ref",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2:5.1",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"bible": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "abbr",
						"title": "Abbr",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "bookCode",
						"title": "Book Code",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "bookName",
						"title": "Book Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "bookOrder",
						"title": "Book Order",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "canon",
						"title": "Canon",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "chapter",
						"title": "Chapter",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "chapterCount",
						"title": "Chapter Count",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "chunk",
						"title": "Chunk",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "fullName",
						"title": "Full Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "limit",
						"title": "Limit",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "meta",
						"title": "Meta",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "page",
						"title": "Page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "q",
						"title": "Q",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "reference",
						"title": "Reference",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "translation",
						"title": "Translation",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "urantiaParallelLimit",
						"title": "Urantia Parallel Limit",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "urantiaParallels",
						"title": "Urantia Parallels",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "verse",
						"title": "Verse",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "verseCount",
						"title": "Verse Count",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "verses",
						"title": "Verses",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "bible",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/bible/search/semantic",
								"segments": []any{
									map[string]any{
										"lit": "bible",
									},
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "semantic",
									},
								},
								"parts": []any{
									"bible",
									"search",
									"semantic",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/bible/books",
								"segments": []any{
									map[string]any{
										"lit": "bible",
									},
									map[string]any{
										"lit": "books",
									},
								},
								"parts": []any{
									"bible",
									"books",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "book",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/bible/{bookCode}/{chapter}/{verse}",
								"segments": []any{
									map[string]any{
										"lit": "bible",
									},
									map[string]any{
										"var": "book_code",
									},
									map[string]any{
										"var": "chapter",
									},
									map[string]any{
										"var": "verse",
									},
								},
								"parts": []any{
									"bible",
									"{book_code}",
									"{chapter}",
									"{verse}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"bookCode": "book_code",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "book_code",
											"orig": "bookCode",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "MAT",
										},
										map[string]any{
											"name": "chapter",
											"orig": "chapter",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 5,
										},
										map[string]any{
											"name": "verse",
											"orig": "verse",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 3,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"book_code",
										"chapter",
										"verse",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/bible/{bookCode}/{chapter}/{verse}/urantia-parallels",
								"segments": []any{
									map[string]any{
										"lit": "bible",
									},
									map[string]any{
										"var": "book_code",
									},
									map[string]any{
										"var": "chapter",
									},
									map[string]any{
										"var": "verse",
									},
									map[string]any{
										"lit": "urantia-parallels",
									},
								},
								"parts": []any{
									"bible",
									"{book_code}",
									"{chapter}",
									"{verse}",
									"urantia-parallels",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"bookCode": "book_code",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "book_code",
											"orig": "bookCode",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "MAT",
										},
										map[string]any{
											"name": "chapter",
											"orig": "chapter",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 5,
										},
										map[string]any{
											"name": "verse",
											"orig": "verse",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 3,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"book_code",
										"chapter",
										"verse",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/bible/{bookCode}/{chapter}",
								"segments": []any{
									map[string]any{
										"lit": "bible",
									},
									map[string]any{
										"var": "book_code",
									},
									map[string]any{
										"var": "chapter",
									},
								},
								"parts": []any{
									"bible",
									"{book_code}",
									"{chapter}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"bookCode": "book_code",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "book_code",
											"orig": "bookCode",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "MAT",
										},
										map[string]any{
											"name": "chapter",
											"orig": "chapter",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 5,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"book_code",
										"chapter",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/bible/{bookCode}",
								"segments": []any{
									map[string]any{
										"lit": "bible",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"bible",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"bookCode": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "bookCode",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "MAT",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"citation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "citation",
						"title": "Citation",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "ref",
						"title": "Ref",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "style",
						"title": "Style",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "citation",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/cite",
								"segments": []any{
									map[string]any{
										"lit": "cite",
									},
								},
								"parts": []any{
									"cite",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "ref",
											"orig": "ref",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "2:5.1",
											"field": true,
										},
										map[string]any{
											"name": "style",
											"orig": "style",
											"type": "`$STRING`",
											"kind": "query",
											"example": "apa",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ref",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"embedding": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "dimensions",
						"title": "Dimensions",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "embedding",
						"title": "Embedding",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "model",
						"title": "Model",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "standardReferenceId",
						"title": "Standard Reference Id",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "embedding",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/embeddings/{ref}",
								"segments": []any{
									map[string]any{
										"lit": "embeddings",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"embeddings",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ref": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ref",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2:5.1",
										},
									},
									"query": []any{
										map[string]any{
											"name": "model",
											"orig": "model",
											"type": "`$STRING`",
											"kind": "query",
											"example": "large",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/embeddings/export",
								"segments": []any{
									map[string]any{
										"lit": "embeddings",
									},
									map[string]any{
										"lit": "export",
									},
								},
								"parts": []any{
									"embeddings",
									"export",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "jsonl",
										},
										map[string]any{
											"name": "model",
											"orig": "model",
											"type": "`$STRING`",
											"kind": "query",
											"example": "large",
											"field": true,
										},
										map[string]any{
											"name": "paper_id",
											"orig": "paperId",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "2",
										},
									},
								},
								"select": map[string]any{
									"$action": "export",
									"exist": []any{
										"paper_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"entity": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "aliases",
						"title": "Aliases",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$ARRAY`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "citationCount",
						"title": "Citation Count",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Number of citations in the source index.",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "language",
						"title": "Language",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "seeAlso",
						"title": "See Also",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$ARRAY`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Related entry names.",
					},
					map[string]any{
						"name": "sense",
						"title": "Sense",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "For a concept with a lowercase name: \"special\" when the papers coin the word or use it in their own sense, \"ordinary\" when they use it in its everyday sense.",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "entity",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/entities/{id}/paragraphs",
								"segments": []any{
									map[string]any{
										"lit": "entities",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "paragraphs",
									},
								},
								"parts": []any{
									"entities",
									"{id}",
									"paragraphs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "michael-of-nebadon",
										},
									},
									"query": []any{
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "eng",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": []any{
												"`$ONE`",
												[]any{
													"`$INTEGER`",
													"`$NULL`",
												},
											},
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"$action": "paragraph",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/entities",
								"segments": []any{
									map[string]any{
										"lit": "entities",
									},
								},
								"parts": []any{
									"entities",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "eng",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": []any{
												"`$ONE`",
												[]any{
													"`$INTEGER`",
													"`$NULL`",
												},
											},
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/entities/{id}",
								"segments": []any{
									map[string]any{
										"lit": "entities",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"entities",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "michael-of-nebadon",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"feedback": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "category",
						"title": "Category",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "client",
						"title": "Client",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "contact",
						"title": "Contact",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "endpoint",
						"title": "Endpoint",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "pageUrl",
						"title": "Page Url",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "ref",
						"title": "Ref",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "requestId",
						"title": "Request Id",
						"type": "`$STRING`",
					},
				},
				"name": "feedback",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/feedback",
								"segments": []any{
									map[string]any{
										"lit": "feedback",
									},
								},
								"parts": []any{
									"feedback",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
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
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"language": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "code",
						"title": "Code",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "entityCount",
						"title": "Entity Count",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "paragraphCount",
						"title": "Paragraph Count",
						"type": "`$INTEGER`",
						"req": true,
					},
				},
				"name": "language",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/languages",
								"segments": []any{
									map[string]any{
										"lit": "languages",
									},
								},
								"parts": []any{
									"languages",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ogn": map[string]any{
				"fields": []any{},
				"name": "ogn",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/og/{ref}",
								"segments": []any{
									map[string]any{
										"lit": "og",
									},
									map[string]any{
										"var": "ref",
									},
								},
								"parts": []any{
									"og",
									"{ref}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ref",
											"orig": "ref",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2:5.1",
										},
									},
									"query": []any{
										map[string]any{
											"name": "theme",
											"orig": "theme",
											"type": "`$STRING`",
											"kind": "query",
											"example": "default",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ref",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"paper": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "labels",
						"title": "Labels",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$ARRAY`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "paper",
						"title": "Paper",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "paragraphs",
						"title": "Paragraphs",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "partId",
						"title": "Part Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "sortId",
						"title": "Sort Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "topEntities",
						"title": "Top Entities",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "video",
						"title": "Video",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "paper",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/papers/{id}/sections",
								"segments": []any{
									map[string]any{
										"lit": "papers",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "sections",
									},
								},
								"parts": []any{
									"papers",
									"{id}",
									"sections",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "1",
										},
									},
									"query": []any{
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "eng",
										},
									},
								},
								"select": map[string]any{
									"$action": "section",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/papers",
								"segments": []any{
									map[string]any{
										"lit": "papers",
									},
								},
								"parts": []any{
									"papers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "default",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "eng",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/papers/{id}",
								"segments": []any{
									map[string]any{
										"lit": "papers",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"papers",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "1",
										},
									},
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "default",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "eng",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"paragraph": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "navigation",
						"title": "Navigation",
						"type": "`$OBJECT`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "paragraph",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/paragraphs/{ref}",
								"segments": []any{
									map[string]any{
										"lit": "paragraphs",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"paragraphs",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ref": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ref",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2:5.1",
										},
									},
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "default",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "eng",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/paragraphs/{ref}/context",
								"segments": []any{
									map[string]any{
										"lit": "paragraphs",
									},
									map[string]any{
										"var": "ref",
									},
									map[string]any{
										"lit": "context",
									},
								},
								"parts": []any{
									"paragraphs",
									"{ref}",
									"context",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ref",
											"orig": "ref",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2:5.1",
										},
									},
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "default",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "eng",
										},
										map[string]any{
											"name": "window",
											"orig": "window",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2,
										},
									},
								},
								"select": map[string]any{
									"$action": "context",
									"exist": []any{
										"ref",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/paragraphs/random",
								"segments": []any{
									map[string]any{
										"lit": "paragraphs",
									},
									map[string]any{
										"lit": "random",
									},
								},
								"parts": []any{
									"paragraphs",
									"random",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "default",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "eng",
										},
										map[string]any{
											"name": "max_length",
											"orig": "maxLength",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "min_length",
											"orig": "minLength",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "random",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"quote": map[string]any{
				"fields": []any{},
				"name": "quote",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/quotes/verify",
								"segments": []any{
									map[string]any{
										"lit": "quotes",
									},
									map[string]any{
										"lit": "verify",
									},
								},
								"parts": []any{
									"quotes",
									"verify",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "verify",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"scripture": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "chunk",
						"title": "Chunk",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "closest",
						"title": "Closest",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "consensus",
						"title": "Consensus",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Mean percentile across the texts, 0 to 1",
					},
					map[string]any{
						"name": "corpus",
						"title": "Corpus",
						"type": "`$OBJECT`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Corpus id, slug, or ref prefix, e.g.",
					},
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "distance",
						"title": "Distance",
						"type": "`$NUMBER`",
						"req": true,
						"short": "1 minus the highest percentile, 0 to 1",
					},
					map[string]any{
						"name": "divisionLabel",
						"title": "Division Label",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "divisions",
						"title": "Divisions",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "gap",
						"title": "Gap",
						"type": "`$NUMBER`",
						"req": true,
						"short": "How far this text's percentile is above the paragraph's mean across texts",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "license",
						"title": "License",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "limit",
						"title": "Limit",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "meta",
						"title": "Meta",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "notes",
						"title": "Notes",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "How the text is numbered or selected",
					},
					map[string]any{
						"name": "page",
						"title": "Page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "pages",
						"title": "Pages",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The reading pages of the work, in order: one division, or one subdivision for a work with three reference levels.",
					},
					map[string]any{
						"name": "paragraph",
						"title": "Paragraph",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "passage",
						"title": "Passage",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "passageCount",
						"title": "Passage Count",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "passages",
						"title": "Passages",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "percentile",
						"title": "Percentile",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "q",
						"title": "Q",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "refLevels",
						"title": "Ref Levels",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Numbers in a full ref: 1 for `Dhp 183`, 2 for `BG 2.47`, 3 for `Epictetus 3.22.5`",
					},
					map[string]any{
						"name": "refPrefix",
						"title": "Ref Prefix",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "religion",
						"title": "Religion",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "similarity",
						"title": "Similarity",
						"type": "`$NUMBER`",
						"req": true,
						"short": "text-embedding-3-large cosine similarity",
					},
					map[string]any{
						"name": "similaritySmall",
						"title": "Similarity Small",
						"type": "`$NUMBER`",
						"req": true,
						"short": "text-embedding-3-small cosine similarity",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "sourceUrl",
						"title": "Source Url",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "textsClose",
						"title": "Texts Close",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Texts that have this paragraph in their top 10%",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "translator",
						"title": "Translator",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "unitLabel",
						"title": "Unit Label",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "urantiaParallelLimit",
						"title": "Urantia Parallel Limit",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "urantiaParallels",
						"title": "Urantia Parallels",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "urantiaSection",
						"title": "Urantia Section",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The Paper 131 section headed with this religion, or null when Paper 131 has no such heading",
					},
					map[string]any{
						"name": "year",
						"title": "Year",
						"type": "`$INTEGER`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "scripture",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/scriptures/search/semantic",
								"segments": []any{
									map[string]any{
										"lit": "scriptures",
									},
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "semantic",
									},
								},
								"parts": []any{
									"scriptures",
									"search",
									"semantic",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/scriptures",
								"segments": []any{
									map[string]any{
										"lit": "scriptures",
									},
								},
								"parts": []any{
									"scriptures",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/scriptures/insights/far",
								"segments": []any{
									map[string]any{
										"lit": "scriptures",
									},
									map[string]any{
										"lit": "insights",
									},
									map[string]any{
										"lit": "far",
									},
								},
								"parts": []any{
									"scriptures",
									"insights",
									"far",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
											"field": true,
										},
										map[string]any{
											"name": "min_length",
											"orig": "minLength",
											"type": []any{
												"`$ONE`",
												[]any{
													"`$INTEGER`",
													"`$NULL`",
												},
											},
											"kind": "query",
											"example": 200,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": []any{
												"`$ONE`",
												[]any{
													"`$INTEGER`",
													"`$NULL`",
												},
											},
											"kind": "query",
											"example": 0,
											"field": true,
										},
										map[string]any{
											"name": "paper_id",
											"orig": "paperId",
											"type": []any{
												"`$ONE`",
												[]any{
													"`$INTEGER`",
													"`$NULL`",
												},
											},
											"kind": "query",
											"example": "2",
										},
										map[string]any{
											"name": "part_id",
											"orig": "partId",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/scriptures/insights/leans",
								"segments": []any{
									map[string]any{
										"lit": "scriptures",
									},
									map[string]any{
										"lit": "insights",
									},
									map[string]any{
										"lit": "leans",
									},
								},
								"parts": []any{
									"scriptures",
									"insights",
									"leans",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "corpus",
											"orig": "corpus",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "exclude_bible",
											"orig": "excludeBible",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
											"field": true,
										},
										map[string]any{
											"name": "min_length",
											"orig": "minLength",
											"type": []any{
												"`$ONE`",
												[]any{
													"`$INTEGER`",
													"`$NULL`",
												},
											},
											"kind": "query",
											"example": 200,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": []any{
												"`$ONE`",
												[]any{
													"`$INTEGER`",
													"`$NULL`",
												},
											},
											"kind": "query",
											"example": 0,
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/scriptures/insights/pairs",
								"segments": []any{
									map[string]any{
										"lit": "scriptures",
									},
									map[string]any{
										"lit": "insights",
									},
									map[string]any{
										"lit": "pairs",
									},
								},
								"parts": []any{
									"scriptures",
									"insights",
									"pairs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "corpus",
											"orig": "corpus",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "exclude_bible",
											"orig": "excludeBible",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
											"field": true,
										},
										map[string]any{
											"name": "min_length",
											"orig": "minLength",
											"type": []any{
												"`$ONE`",
												[]any{
													"`$INTEGER`",
													"`$NULL`",
												},
											},
											"kind": "query",
											"example": 200,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": []any{
												"`$ONE`",
												[]any{
													"`$INTEGER`",
													"`$NULL`",
												},
											},
											"kind": "query",
											"example": 0,
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/scriptures/insights/shared-currents",
								"segments": []any{
									map[string]any{
										"lit": "scriptures",
									},
									map[string]any{
										"lit": "insights",
									},
									map[string]any{
										"lit": "shared-currents",
									},
								},
								"parts": []any{
									"scriptures",
									"insights",
									"shared-currents",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
											"field": true,
										},
										map[string]any{
											"name": "min_length",
											"orig": "minLength",
											"type": []any{
												"`$ONE`",
												[]any{
													"`$INTEGER`",
													"`$NULL`",
												},
											},
											"kind": "query",
											"example": 200,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": []any{
												"`$ONE`",
												[]any{
													"`$INTEGER`",
													"`$NULL`",
												},
											},
											"kind": "query",
											"example": 0,
											"field": true,
										},
										map[string]any{
											"name": "paper_id",
											"orig": "paperId",
											"type": []any{
												"`$ONE`",
												[]any{
													"`$INTEGER`",
													"`$NULL`",
												},
											},
											"kind": "query",
											"example": "2",
										},
										map[string]any{
											"name": "part_id",
											"orig": "partId",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/scriptures/{corpus}/{ref}",
								"segments": []any{
									map[string]any{
										"lit": "scriptures",
									},
									map[string]any{
										"var": "corpus",
									},
									map[string]any{
										"var": "ref",
									},
								},
								"parts": []any{
									"scriptures",
									"{corpus}",
									"{ref}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "corpus",
											"orig": "corpus",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "bhagavad-gita",
										},
										map[string]any{
											"name": "ref",
											"orig": "ref",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2.47",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"corpus",
										"ref",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/scriptures/{corpus}/{ref}/urantia-parallels",
								"segments": []any{
									map[string]any{
										"lit": "scriptures",
									},
									map[string]any{
										"var": "corpus",
									},
									map[string]any{
										"var": "ref",
									},
									map[string]any{
										"lit": "urantia-parallels",
									},
								},
								"parts": []any{
									"scriptures",
									"{corpus}",
									"{ref}",
									"urantia-parallels",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "corpus",
											"orig": "corpus",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "bhagavad-gita",
										},
										map[string]any{
											"name": "ref",
											"orig": "ref",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2.47",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"corpus",
										"ref",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/scriptures/{corpus}",
								"segments": []any{
									map[string]any{
										"lit": "scriptures",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"scriptures",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"corpus": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "corpus",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "bhagavad-gita",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "audio",
						"title": "Audio",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "bibleParallels",
						"title": "Bible Parallels",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "entities",
						"title": "Entities",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "htmlText",
						"title": "Html Text",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "include",
						"title": "Include",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "labels",
						"title": "Labels",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$ARRAY`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "language",
						"title": "Language",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "limit",
						"title": "Limit",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "match",
						"title": "Match",
						"type": "`$STRING`",
						"req": true,
						"short": "How the paragraph matched: reference (the query named it), exact (the whole phrase), all (every word), near (every word after a typo fix, see meta.didYouMean), most (two thirds of the words or more; with type `or`, some of the words).",
					},
					map[string]any{
						"name": "meta",
						"title": "Meta",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "page",
						"title": "Page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "paperId",
						"title": "Paper Id",
						"type": "`$STRING`",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "paperTitle",
						"title": "Paper Title",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "paragraphId",
						"title": "Paragraph Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "partId",
						"title": "Part Id",
						"type": "`$STRING`",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "q",
						"title": "Q",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "rank",
						"title": "Rank",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "scriptureParallels",
						"title": "Scripture Parallels",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "scriptureScores",
						"title": "Scripture Scores",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "sectionId",
						"title": "Section Id",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "sectionTitle",
						"title": "Section Title",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "sortId",
						"title": "Sort Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "standardReferenceId",
						"title": "Standard Reference Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "translation",
						"title": "Translation",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Present only when the text is a translation: a machine made it, and it is released as CC0.",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "urantiaParallels",
						"title": "Urantia Parallels",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "search",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/search",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/search/semantic",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "semantic",
									},
								},
								"parts": []any{
									"search",
									"semantic",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "semantic",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/search",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": []any{
												"`$ONE`",
												[]any{
													"`$INTEGER`",
													"`$NULL`",
												},
											},
											"kind": "query",
											"example": 0,
											"field": true,
										},
										map[string]any{
											"name": "paper_id",
											"orig": "paperId",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2",
										},
										map[string]any{
											"name": "part_id",
											"orig": "partId",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "love",
											"field": true,
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "auto",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"q",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/search/semantic",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "semantic",
									},
								},
								"parts": []any{
									"search",
									"semantic",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": []any{
												"`$ONE`",
												[]any{
													"`$INTEGER`",
													"`$NULL`",
												},
											},
											"kind": "query",
											"example": 0,
											"field": true,
										},
										map[string]any{
											"name": "paper_id",
											"orig": "paperId",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2",
										},
										map[string]any{
											"name": "part_id",
											"orig": "partId",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "love",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "semantic",
									"exist": []any{
										"q",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"table_of_content": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "parts",
						"title": "Parts",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "table_of_content",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/toc",
								"segments": []any{
									map[string]any{
										"lit": "toc",
									},
								},
								"parts": []any{
									"toc",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "eng",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"tool": map[string]any{
				"fields": []any{},
				"name": "tool",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/tools/anthropic",
								"segments": []any{
									map[string]any{
										"lit": "tools",
									},
									map[string]any{
										"lit": "anthropic",
									},
								},
								"parts": []any{
									"tools",
									"anthropic",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.tools`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "anthropic",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/tools/openai",
								"segments": []any{
									map[string]any{
										"lit": "tools",
									},
									map[string]any{
										"lit": "openai",
									},
								},
								"parts": []any{
									"tools",
									"openai",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.tools`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "openai",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"work": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The work id: \"bible\", or the slug of a text such as \"dhammapada\".",
					},
					map[string]any{
						"name": "kind",
						"title": "Kind",
						"type": "`$STRING`",
						"req": true,
						"short": "\"scripture\": read as sacred by its tradition.",
					},
					map[string]any{
						"name": "limit",
						"title": "Limit",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "match",
						"title": "Match",
						"type": "`$STRING`",
						"short": "Keyword search: how it matched.",
					},
					map[string]any{
						"name": "meta",
						"title": "Meta",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "page",
						"title": "Page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "q",
						"title": "Q",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "refPrefix",
						"title": "Ref Prefix",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The prefix of its references, such as \"Dhp\".",
					},
					map[string]any{
						"name": "reference",
						"title": "Reference",
						"type": "`$STRING`",
						"req": true,
						"short": "\"John 3:16\", \"Dhp 183\", \"BG 2.47-49\" (a chunk in semantic search).",
					},
					map[string]any{
						"name": "religion",
						"title": "Religion",
						"type": "`$STRING`",
						"req": true,
						"short": "The same as `tradition`, kept for older clients.",
					},
					map[string]any{
						"name": "similarity",
						"title": "Similarity",
						"type": "`$NUMBER`",
						"short": "Semantic search: cosine similarity.",
					},
					map[string]any{
						"name": "strength",
						"title": "Strength",
						"type": "`$STRING`",
						"short": "How close the result is: strong (most right answers score this), related, or weak (likely off the topic).",
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": "`$STRING`",
						"req": true,
						"short": "One plain sentence on what the work is.",
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "tradition",
						"title": "Tradition",
						"type": "`$STRING`",
						"req": true,
						"short": "The people or the religion of the work: \"Buddhist\", \"Norse\", \"Ancient Greek\".",
					},
					map[string]any{
						"name": "translator",
						"title": "Translator",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "unitLabel",
						"title": "Unit Label",
						"type": "`$STRING`",
						"req": true,
						"short": "The word for one unit of the work: \"verse\", \"section\", \"pauri\".",
					},
					map[string]any{
						"name": "units",
						"title": "Units",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "urantiaParallelLimit",
						"title": "Urantia Parallel Limit",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "urantiaParallels",
						"title": "Urantia Parallels",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The nearest Urantia paragraphs (semantic parallels, not curated ones).",
					},
					map[string]any{
						"name": "urantiaSection",
						"title": "Urantia Section",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The public page that holds the text, or null.",
					},
					map[string]any{
						"name": "work",
						"title": "Work",
						"type": "`$STRING`",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$OBJECT`",
							},
						},
						"short": "One work only: \"bible\" or a work id such as \"dhammapada\".",
					},
					map[string]any{
						"name": "year",
						"title": "Year",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"work": "work.id",
					},
					"name": "id",
					"parts": []any{
						"work",
						"ref",
					},
					"sep": "/",
				},
				"name": "work",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/works/search",
								"segments": []any{
									map[string]any{
										"lit": "works",
									},
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"works",
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "search",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/works/search/semantic",
								"segments": []any{
									map[string]any{
										"lit": "works",
									},
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "semantic",
									},
								},
								"parts": []any{
									"works",
									"search",
									"semantic",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/works/search",
								"segments": []any{
									map[string]any{
										"lit": "works",
									},
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"works",
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": []any{
												"`$ONE`",
												[]any{
													"`$INTEGER`",
													"`$NULL`",
												},
											},
											"kind": "query",
											"example": 0,
											"field": true,
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "love",
											"field": true,
										},
										map[string]any{
											"name": "urantia_parallel_limit",
											"orig": "urantiaParallelLimit",
											"type": []any{
												"`$ONE`",
												[]any{
													"`$INTEGER`",
													"`$NULL`",
												},
											},
											"kind": "query",
											"example": 3,
										},
										map[string]any{
											"name": "work",
											"orig": "work",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "search",
									"exist": []any{
										"q",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/works/search/semantic",
								"segments": []any{
									map[string]any{
										"lit": "works",
									},
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "semantic",
									},
								},
								"parts": []any{
									"works",
									"search",
									"semantic",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": []any{
												"`$ONE`",
												[]any{
													"`$INTEGER`",
													"`$NULL`",
												},
											},
											"kind": "query",
											"example": 0,
											"field": true,
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "love",
											"field": true,
										},
										map[string]any{
											"name": "urantia_parallel_limit",
											"orig": "urantiaParallelLimit",
											"type": []any{
												"`$ONE`",
												[]any{
													"`$INTEGER`",
													"`$NULL`",
												},
											},
											"kind": "query",
											"example": 3,
										},
										map[string]any{
											"name": "work",
											"orig": "work",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"q",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/works",
								"segments": []any{
									map[string]any{
										"lit": "works",
									},
								},
								"parts": []any{
									"works",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/works/{work}/{ref}/urantia-parallels",
								"segments": []any{
									map[string]any{
										"lit": "works",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"var": "ref",
									},
									map[string]any{
										"lit": "urantia-parallels",
									},
								},
								"parts": []any{
									"works",
									"{id}",
									"{ref}",
									"urantia-parallels",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"work": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "work",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "bhagavad-gita",
										},
										map[string]any{
											"name": "ref",
											"orig": "ref",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2.47",
										},
									},
								},
								"select": map[string]any{
									"$action": "urantia_parallel",
									"exist": []any{
										"id",
										"ref",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/works/{work}/{ref}/work-parallels",
								"segments": []any{
									map[string]any{
										"lit": "works",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"var": "ref",
									},
									map[string]any{
										"lit": "work-parallels",
									},
								},
								"parts": []any{
									"works",
									"{id}",
									"{ref}",
									"work-parallels",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"work": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "work",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "bhagavad-gita",
										},
										map[string]any{
											"name": "ref",
											"orig": "ref",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2.47",
										},
									},
								},
								"select": map[string]any{
									"$action": "work_parallel",
									"exist": []any{
										"id",
										"ref",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/works/{work}/{ref}",
								"segments": []any{
									map[string]any{
										"lit": "works",
									},
									map[string]any{
										"var": "work",
									},
									map[string]any{
										"var": "ref",
									},
								},
								"parts": []any{
									"works",
									"{work}",
									"{ref}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ref",
											"orig": "ref",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2.47",
										},
										map[string]any{
											"name": "work",
											"orig": "work",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "bhagavad-gita",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ref",
										"work",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}

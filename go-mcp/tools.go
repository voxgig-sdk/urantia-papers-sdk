package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/jsonschema-go/jsonschema"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/urantia-papers-sdk/go"
)

// ListArgs is what an agent sends to urantia-papers_list.
type ListArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: bible | entity | language | paper | scripture | search | work"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional filter map; omit it for the first page"`
}

// LoadArgs is what an agent sends to urantia-papers_load.
type LoadArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: audio | bible | citation | embedding | entity | ogn | paper | paragraph | scripture | table_of_content | work"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

func registerTools(server *mcp.Server, client *sdk.UrantiaPapersSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name:        "urantia-papers_list",
		Description: "List records from UrantiaPapers. Args: entity, query (optional filter map; omit it for the first page). Returns the first page of records as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[ListArgs]("bible", "entity", "language", "paper", "scripture", "search", "work"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args ListArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "list", args.Entity, args.Query)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "urantia-papers_load",
		Description: "Load one record from UrantiaPapers. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the record as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[LoadArgs]("audio", "bible", "citation", "embedding", "entity", "ogn", "paper", "paragraph", "scripture", "table_of_content", "work"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args LoadArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "load", args.Entity, args.Query)
	})
}

// entitySchema is the schema inferred from In, its entity limited to the
// entities the tool serves.
func entitySchema[In any](names ...string) *jsonschema.Schema {
	schema, err := jsonschema.For[In](nil)
	if err != nil {
		panic(err)
	}
	enum := make([]any, len(names))
	for i, name := range names {
		enum[i] = name
	}
	schema.Properties["entity"].Enum = enum
	return schema
}

func runOp(_ context.Context, client *sdk.UrantiaPapersSDK, op string, entity string, input map[string]any) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(input, nil)
	case "load":
		result, err = ent.Load(input, nil)
	case "create":
		result, err = ent.Create(input, nil)
	case "update":
		result, err = ent.Update(input, nil)
	case "patch":
		result, err = ent.Patch(input, nil)
	case "remove":
		result, err = ent.Remove(input, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.UrantiaPapersSDK, name string) (sdk.UrantiaPapersEntity, error) {
	switch strings.ToLower(name) {
	case "audio":
		return client.Audio(nil), nil
	case "bible":
		return client.Bible(nil), nil
	case "citation":
		return client.Citation(nil), nil
	case "embedding":
		return client.Embedding(nil), nil
	case "entity":
		return client.Entity(nil), nil
	case "feedback":
		return client.Feedback(nil), nil
	case "language":
		return client.Language(nil), nil
	case "ogn":
		return client.Ogn(nil), nil
	case "paper":
		return client.Paper(nil), nil
	case "paragraph":
		return client.Paragraph(nil), nil
	case "quote":
		return client.Quote(nil), nil
	case "scripture":
		return client.Scripture(nil), nil
	case "search":
		return client.Search(nil), nil
	case "table_of_content":
		return client.TableOfContent(nil), nil
	case "tool":
		return client.Tool(nil), nil
	case "work":
		return client.Work(nil), nil
	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}

// hint is an MCP annotation that defaults to true unless stated.
func hint(b bool) *bool {
	return &b
}

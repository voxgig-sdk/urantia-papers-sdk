// Typed models for the UrantiaPapers SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/urantia-papers-sdk/go/core"
)

// Audio is the typed data model for the audio entity.
type Audio struct {
}

// AudioLoadMatch is the typed request payload for Audio.LoadTyped.
type AudioLoadMatch struct {
	Id string `json:"id"`
}

// Bible is the typed data model for the bible entity.
type Bible struct {
}

// BibleLoadMatch is the typed request payload for Bible.LoadTyped.
type BibleLoadMatch struct {
	Id string `json:"id"`
}

// BibleListMatch is the typed request payload for Bible.ListTyped.
type BibleListMatch struct {
	Abbr *string `json:"abbr,omitempty"`
	BookCode *string `json:"bookCode,omitempty"`
	BookName *string `json:"bookName,omitempty"`
	BookOrder *int `json:"bookOrder,omitempty"`
	Canon *string `json:"canon,omitempty"`
	Chapter *int `json:"chapter,omitempty"`
	ChapterCount *int `json:"chapterCount,omitempty"`
	Chunk *map[string]any `json:"chunk,omitempty"`
	Data *[]any `json:"data,omitempty"`
	FullName *string `json:"fullName,omitempty"`
	Id *string `json:"id,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Meta *map[string]any `json:"meta,omitempty"`
	Page *int `json:"page,omitempty"`
	Q *string `json:"q,omitempty"`
	Reference *string `json:"reference,omitempty"`
	Text *string `json:"text,omitempty"`
	Translation *string `json:"translation,omitempty"`
	UrantiaParallelLimit *int `json:"urantiaParallelLimit,omitempty"`
	UrantiaParallels *[]any `json:"urantiaParallels,omitempty"`
	Verse *int `json:"verse,omitempty"`
	VerseCount *int `json:"verseCount,omitempty"`
	Verses *[]any `json:"verses,omitempty"`
}

// BibleCreateData is the typed request payload for Bible.CreateTyped.
type BibleCreateData struct {
	BookCode *string `json:"bookCode,omitempty"`
	Canon *string `json:"canon,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Page *int `json:"page,omitempty"`
	Q string `json:"q"`
	UrantiaParallelLimit *int `json:"urantiaParallelLimit,omitempty"`
}

// Citation is the typed data model for the citation entity.
type Citation struct {
}

// CitationLoadMatch is the typed request payload for Citation.LoadTyped.
type CitationLoadMatch struct {
	Ref string `json:"ref"`
	Style *string `json:"style,omitempty"`
}

// Embedding is the typed data model for the embedding entity.
type Embedding struct {
}

// EmbeddingLoadMatch is the typed request payload for Embedding.LoadTyped.
type EmbeddingLoadMatch struct {
	Id string `json:"id"`
	Model *string `json:"model,omitempty"`
}

// Entity is the typed data model for the entity entity.
type Entity struct {
}

// EntityLoadMatch is the typed request payload for Entity.LoadTyped.
type EntityLoadMatch struct {
	Id string `json:"id"`
}

// EntityListMatch is the typed request payload for Entity.ListTyped.
type EntityListMatch struct {
	Lang *string `json:"lang,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Page *any `json:"page,omitempty"`
	Q *string `json:"q,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Feedback is the typed data model for the feedback entity.
type Feedback struct {
}

// FeedbackCreateData is the typed request payload for Feedback.CreateTyped.
type FeedbackCreateData struct {
	Category string `json:"category"`
	Client *string `json:"client,omitempty"`
	Contact *string `json:"contact,omitempty"`
	Endpoint *string `json:"endpoint,omitempty"`
	Message string `json:"message"`
	PageUrl *string `json:"pageUrl,omitempty"`
	Ref *string `json:"ref,omitempty"`
	RequestId *string `json:"requestId,omitempty"`
}

// Language is the typed data model for the language entity.
type Language struct {
}

// LanguageListMatch is the typed request payload for Language.ListTyped.
type LanguageListMatch struct {
	Code *string `json:"code,omitempty"`
	EntityCount *int `json:"entityCount,omitempty"`
	Name *string `json:"name,omitempty"`
	ParagraphCount *int `json:"paragraphCount,omitempty"`
}

// Ogn is the typed data model for the ogn entity.
type Ogn struct {
}

// OgnLoadMatch is the typed request payload for Ogn.LoadTyped.
type OgnLoadMatch struct {
	Ref string `json:"ref"`
	Theme *string `json:"theme,omitempty"`
}

// Paper is the typed data model for the paper entity.
type Paper struct {
}

// PaperLoadMatch is the typed request payload for Paper.LoadTyped.
type PaperLoadMatch struct {
	Id string `json:"id"`
	Format *string `json:"format,omitempty"`
	Include *string `json:"include,omitempty"`
	Lang *string `json:"lang,omitempty"`
}

// PaperListMatch is the typed request payload for Paper.ListTyped.
type PaperListMatch struct {
	Format *string `json:"format,omitempty"`
	Include *string `json:"include,omitempty"`
	Lang *string `json:"lang,omitempty"`
}

// Paragraph is the typed data model for the paragraph entity.
type Paragraph struct {
}

// ParagraphLoadMatch is the typed request payload for Paragraph.LoadTyped.
type ParagraphLoadMatch struct {
	Id string `json:"id"`
	Format *string `json:"format,omitempty"`
	Include *string `json:"include,omitempty"`
	Lang *string `json:"lang,omitempty"`
}

// Quote is the typed data model for the quote entity.
type Quote struct {
}

// QuoteCreateData is the typed request payload for Quote.CreateTyped.
type QuoteCreateData struct {
	Ref *any `json:"ref,omitempty"`
	Text *any `json:"text,omitempty"`
}

// Scripture is the typed data model for the scripture entity.
type Scripture struct {
}

// ScriptureLoadMatch is the typed request payload for Scripture.LoadTyped.
type ScriptureLoadMatch struct {
	Id string `json:"id"`
}

// ScriptureListMatch is the typed request payload for Scripture.ListTyped.
type ScriptureListMatch struct {
	Chunk *map[string]any `json:"chunk,omitempty"`
	Closest *[]any `json:"closest,omitempty"`
	Consensus *float64 `json:"consensus,omitempty"`
	Corpus *map[string]any `json:"corpus,omitempty"`
	Data *[]any `json:"data,omitempty"`
	Distance *float64 `json:"distance,omitempty"`
	DivisionLabel *string `json:"divisionLabel,omitempty"`
	Divisions *[]any `json:"divisions,omitempty"`
	Gap *float64 `json:"gap,omitempty"`
	Id *string `json:"id,omitempty"`
	License *string `json:"license,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Meta *map[string]any `json:"meta,omitempty"`
	Notes *any `json:"notes,omitempty"`
	Page *int `json:"page,omitempty"`
	Pages *[]any `json:"pages,omitempty"`
	Paragraph *map[string]any `json:"paragraph,omitempty"`
	Passage *map[string]any `json:"passage,omitempty"`
	PassageCount *int `json:"passageCount,omitempty"`
	Passages *[]any `json:"passages,omitempty"`
	Percentile *float64 `json:"percentile,omitempty"`
	Q *string `json:"q,omitempty"`
	RefLevels *int `json:"refLevels,omitempty"`
	RefPrefix *string `json:"refPrefix,omitempty"`
	Religion *string `json:"religion,omitempty"`
	Similarity *float64 `json:"similarity,omitempty"`
	SimilaritySmall *float64 `json:"similaritySmall,omitempty"`
	Slug *string `json:"slug,omitempty"`
	SourceUrl *string `json:"sourceUrl,omitempty"`
	TextsClose *int `json:"textsClose,omitempty"`
	Title *string `json:"title,omitempty"`
	Translator *string `json:"translator,omitempty"`
	UnitLabel *string `json:"unitLabel,omitempty"`
	UrantiaParallelLimit *int `json:"urantiaParallelLimit,omitempty"`
	UrantiaParallels *[]any `json:"urantiaParallels,omitempty"`
	UrantiaSection *any `json:"urantiaSection,omitempty"`
	Year *int `json:"year,omitempty"`
}

// ScriptureCreateData is the typed request payload for Scripture.CreateTyped.
type ScriptureCreateData struct {
	Corpus *map[string]any `json:"corpus,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Page *int `json:"page,omitempty"`
	Q string `json:"q"`
	UrantiaParallelLimit *int `json:"urantiaParallelLimit,omitempty"`
}

// Search is the typed data model for the search entity.
type Search struct {
}

// SearchListMatch is the typed request payload for Search.ListTyped.
type SearchListMatch struct {
	Include *string `json:"include,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Page *any `json:"page,omitempty"`
	PaperId *string `json:"paper_id,omitempty"`
	PartId *string `json:"part_id,omitempty"`
	Q string `json:"q"`
	Type *string `json:"type,omitempty"`
}

// SearchCreateData is the typed request payload for Search.CreateTyped.
type SearchCreateData struct {
	Include *string `json:"include,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Page *int `json:"page,omitempty"`
	PaperId *string `json:"paperId,omitempty"`
	PartId *string `json:"partId,omitempty"`
	Q string `json:"q"`
	Type *string `json:"type,omitempty"`
}

// TableOfContent is the typed data model for the table_of_content entity.
type TableOfContent struct {
}

// TableOfContentLoadMatch is the typed request payload for TableOfContent.LoadTyped.
type TableOfContentLoadMatch struct {
	Lang *string `json:"lang,omitempty"`
}

// Tool is the typed data model for the tool entity.
type Tool struct {
}

// ToolListMatch is the typed request payload for Tool.ListTyped.
type ToolListMatch struct {
}

// Work is the typed data model for the work entity.
type Work struct {
}

// WorkLoadMatch is the typed request payload for Work.LoadTyped.
type WorkLoadMatch struct {
	Ref string `json:"ref"`
	Work string `json:"work"`
}

// WorkListMatch is the typed request payload for Work.ListTyped.
type WorkListMatch struct {
	Data *[]any `json:"data,omitempty"`
	Id *string `json:"id,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Match *string `json:"match,omitempty"`
	Meta *map[string]any `json:"meta,omitempty"`
	Page *int `json:"page,omitempty"`
	Q *string `json:"q,omitempty"`
	RefPrefix *any `json:"refPrefix,omitempty"`
	Reference *string `json:"reference,omitempty"`
	Religion *string `json:"religion,omitempty"`
	Similarity *float64 `json:"similarity,omitempty"`
	Strength *string `json:"strength,omitempty"`
	Summary *string `json:"summary,omitempty"`
	Text *string `json:"text,omitempty"`
	Title *string `json:"title,omitempty"`
	Tradition *string `json:"tradition,omitempty"`
	Translator *string `json:"translator,omitempty"`
	UnitLabel *string `json:"unitLabel,omitempty"`
	Units *int `json:"units,omitempty"`
	UrantiaParallelLimit *int `json:"urantiaParallelLimit,omitempty"`
	UrantiaParallels *[]any `json:"urantiaParallels,omitempty"`
	UrantiaSection *any `json:"urantiaSection,omitempty"`
	Url *any `json:"url,omitempty"`
	Work *string `json:"work,omitempty"`
	Year *any `json:"year,omitempty"`
}

// WorkCreateData is the typed request payload for Work.CreateTyped.
type WorkCreateData struct {
	Limit *int `json:"limit,omitempty"`
	Page *int `json:"page,omitempty"`
	Q string `json:"q"`
	UrantiaParallelLimit *int `json:"urantiaParallelLimit,omitempty"`
	Work *string `json:"work,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

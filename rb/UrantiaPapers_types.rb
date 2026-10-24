# frozen_string_literal: true

# Typed models for the UrantiaPapers SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Audio entity data model.
#
# @!attribute [rw] audio
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
Audio = Struct.new(
  :audio,
  :id,
  keyword_init: true
)

# Request payload for Audio#load.
#
# @!attribute [rw] id
#   @return [String]
AudioLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Bible entity data model.
#
# @!attribute [rw] abbr
#   @return [String]
#
# @!attribute [rw] bookCode
#   @return [String]
#
# @!attribute [rw] bookName
#   @return [String]
#
# @!attribute [rw] bookOrder
#   @return [Integer]
#
# @!attribute [rw] canon
#   @return [String]
#
# @!attribute [rw] chapter
#   @return [Integer]
#
# @!attribute [rw] chapterCount
#   @return [Integer]
#
# @!attribute [rw] chunk
#   @return [Hash]
#
# @!attribute [rw] data
#   @return [Array]
#
# @!attribute [rw] fullName
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] meta
#   @return [Hash]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String]
#
# @!attribute [rw] reference
#   @return [String]
#
# @!attribute [rw] text
#   @return [String]
#
# @!attribute [rw] translation
#   @return [String]
#
# @!attribute [rw] urantiaParallelLimit
#   @return [Integer, nil]
#
# @!attribute [rw] urantiaParallels
#   @return [Array]
#
# @!attribute [rw] verse
#   @return [Integer]
#
# @!attribute [rw] verseCount
#   @return [Integer]
#
# @!attribute [rw] verses
#   @return [Array]
Bible = Struct.new(
  :abbr,
  :bookCode,
  :bookName,
  :bookOrder,
  :canon,
  :chapter,
  :chapterCount,
  :chunk,
  :data,
  :fullName,
  :id,
  :limit,
  :meta,
  :page,
  :q,
  :reference,
  :text,
  :translation,
  :urantiaParallelLimit,
  :urantiaParallels,
  :verse,
  :verseCount,
  :verses,
  keyword_init: true
)

# Request payload for Bible#load.
#
# @!attribute [rw] id
#   @return [String]
BibleLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Bible#list.
#
# @!attribute [rw] abbr
#   @return [String, nil]
#
# @!attribute [rw] bookCode
#   @return [String, nil]
#
# @!attribute [rw] bookName
#   @return [String, nil]
#
# @!attribute [rw] bookOrder
#   @return [Integer, nil]
#
# @!attribute [rw] canon
#   @return [String, nil]
#
# @!attribute [rw] chapter
#   @return [Integer, nil]
#
# @!attribute [rw] chapterCount
#   @return [Integer, nil]
#
# @!attribute [rw] chunk
#   @return [Hash, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] fullName
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] reference
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
#
# @!attribute [rw] translation
#   @return [String, nil]
#
# @!attribute [rw] urantiaParallelLimit
#   @return [Integer, nil]
#
# @!attribute [rw] urantiaParallels
#   @return [Array, nil]
#
# @!attribute [rw] verse
#   @return [Integer, nil]
#
# @!attribute [rw] verseCount
#   @return [Integer, nil]
#
# @!attribute [rw] verses
#   @return [Array, nil]
BibleListMatch = Struct.new(
  :abbr,
  :bookCode,
  :bookName,
  :bookOrder,
  :canon,
  :chapter,
  :chapterCount,
  :chunk,
  :data,
  :fullName,
  :id,
  :limit,
  :meta,
  :page,
  :q,
  :reference,
  :text,
  :translation,
  :urantiaParallelLimit,
  :urantiaParallels,
  :verse,
  :verseCount,
  :verses,
  keyword_init: true
)

# Request payload for Bible#create.
#
# @!attribute [rw] bookCode
#   @return [String, nil]
#
# @!attribute [rw] canon
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String]
#
# @!attribute [rw] urantiaParallelLimit
#   @return [Integer, nil]
BibleCreateData = Struct.new(
  :bookCode,
  :canon,
  :limit,
  :page,
  :q,
  :urantiaParallelLimit,
  keyword_init: true
)

# Citation entity data model.
#
# @!attribute [rw] citation
#   @return [String]
#
# @!attribute [rw] ref
#   @return [String]
#
# @!attribute [rw] style
#   @return [String]
Citation = Struct.new(
  :citation,
  :ref,
  :style,
  keyword_init: true
)

# Request payload for Citation#load.
#
# @!attribute [rw] ref
#   @return [String]
#
# @!attribute [rw] style
#   @return [String, nil]
CitationLoadMatch = Struct.new(
  :ref,
  :style,
  keyword_init: true
)

# Embedding entity data model.
#
# @!attribute [rw] dimensions
#   @return [Integer]
#
# @!attribute [rw] embedding
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] model
#   @return [String]
#
# @!attribute [rw] standardReferenceId
#   @return [String]
Embedding = Struct.new(
  :dimensions,
  :embedding,
  :id,
  :model,
  :standardReferenceId,
  keyword_init: true
)

# Request payload for Embedding#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] model
#   @return [String, nil]
EmbeddingLoadMatch = Struct.new(
  :id,
  :model,
  keyword_init: true
)

# Entity entity data model.
#
# @!attribute [rw] aliases
#   @return [Object]
#
# @!attribute [rw] citationCount
#   @return [Integer]
#
# @!attribute [rw] description
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] seeAlso
#   @return [Object]
#
# @!attribute [rw] sense
#   @return [Object]
#
# @!attribute [rw] type
#   @return [String]
Entity = Struct.new(
  :aliases,
  :citationCount,
  :description,
  :id,
  :language,
  :name,
  :seeAlso,
  :sense,
  :type,
  keyword_init: true
)

# Request payload for Entity#load.
#
# @!attribute [rw] id
#   @return [String]
EntityLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Entity#list.
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Object, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
EntityListMatch = Struct.new(
  :lang,
  :limit,
  :page,
  :q,
  :type,
  keyword_init: true
)

# Feedback entity data model.
#
# @!attribute [rw] category
#   @return [String]
#
# @!attribute [rw] client
#   @return [String, nil]
#
# @!attribute [rw] contact
#   @return [String, nil]
#
# @!attribute [rw] endpoint
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] pageUrl
#   @return [String, nil]
#
# @!attribute [rw] ref
#   @return [String, nil]
#
# @!attribute [rw] requestId
#   @return [String, nil]
Feedback = Struct.new(
  :category,
  :client,
  :contact,
  :endpoint,
  :message,
  :pageUrl,
  :ref,
  :requestId,
  keyword_init: true
)

# Request payload for Feedback#create.
#
# @!attribute [rw] category
#   @return [String]
#
# @!attribute [rw] client
#   @return [String, nil]
#
# @!attribute [rw] contact
#   @return [String, nil]
#
# @!attribute [rw] endpoint
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] pageUrl
#   @return [String, nil]
#
# @!attribute [rw] ref
#   @return [String, nil]
#
# @!attribute [rw] requestId
#   @return [String, nil]
FeedbackCreateData = Struct.new(
  :category,
  :client,
  :contact,
  :endpoint,
  :message,
  :pageUrl,
  :ref,
  :requestId,
  keyword_init: true
)

# Language entity data model.
#
# @!attribute [rw] code
#   @return [String]
#
# @!attribute [rw] entityCount
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] paragraphCount
#   @return [Integer]
Language = Struct.new(
  :code,
  :entityCount,
  :name,
  :paragraphCount,
  keyword_init: true
)

# Request payload for Language#list.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] entityCount
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] paragraphCount
#   @return [Integer, nil]
LanguageListMatch = Struct.new(
  :code,
  :entityCount,
  :name,
  :paragraphCount,
  keyword_init: true
)

# Ogn entity data model.
class Ogn
end

# Request payload for Ogn#load.
#
# @!attribute [rw] ref
#   @return [String]
#
# @!attribute [rw] theme
#   @return [String, nil]
OgnLoadMatch = Struct.new(
  :ref,
  :theme,
  keyword_init: true
)

# Paper entity data model.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] labels
#   @return [Object]
#
# @!attribute [rw] paper
#   @return [Hash]
#
# @!attribute [rw] paragraphs
#   @return [Array]
#
# @!attribute [rw] partId
#   @return [String]
#
# @!attribute [rw] sortId
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] topEntities
#   @return [Array, nil]
#
# @!attribute [rw] video
#   @return [Object]
Paper = Struct.new(
  :id,
  :labels,
  :paper,
  :paragraphs,
  :partId,
  :sortId,
  :title,
  :topEntities,
  :video,
  keyword_init: true
)

# Request payload for Paper#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] include
#   @return [String, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
PaperLoadMatch = Struct.new(
  :id,
  :format,
  :include,
  :lang,
  keyword_init: true
)

# Request payload for Paper#list.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] include
#   @return [String, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
PaperListMatch = Struct.new(
  :format,
  :include,
  :lang,
  keyword_init: true
)

# Paragraph entity data model.
#
# @!attribute [rw] data
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] navigation
#   @return [Hash]
Paragraph = Struct.new(
  :data,
  :id,
  :navigation,
  keyword_init: true
)

# Request payload for Paragraph#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] include
#   @return [String, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
ParagraphLoadMatch = Struct.new(
  :id,
  :format,
  :include,
  :lang,
  keyword_init: true
)

# Quote entity data model.
class Quote
end

# Request payload for Quote#create.
#
# @!attribute [rw] ref
#   @return [Object, nil]
#
# @!attribute [rw] text
#   @return [Object, nil]
QuoteCreateData = Struct.new(
  :ref,
  :text,
  keyword_init: true
)

# Scripture entity data model.
#
# @!attribute [rw] chunk
#   @return [Hash]
#
# @!attribute [rw] closest
#   @return [Array]
#
# @!attribute [rw] consensus
#   @return [Float]
#
# @!attribute [rw] corpus
#   @return [Hash]
#
# @!attribute [rw] data
#   @return [Array]
#
# @!attribute [rw] distance
#   @return [Float]
#
# @!attribute [rw] divisionLabel
#   @return [String]
#
# @!attribute [rw] divisions
#   @return [Array]
#
# @!attribute [rw] gap
#   @return [Float]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] license
#   @return [String]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] meta
#   @return [Hash]
#
# @!attribute [rw] notes
#   @return [Object]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] pages
#   @return [Array]
#
# @!attribute [rw] paragraph
#   @return [Hash]
#
# @!attribute [rw] passage
#   @return [Hash]
#
# @!attribute [rw] passageCount
#   @return [Integer]
#
# @!attribute [rw] passages
#   @return [Array]
#
# @!attribute [rw] percentile
#   @return [Float]
#
# @!attribute [rw] q
#   @return [String]
#
# @!attribute [rw] refLevels
#   @return [Integer]
#
# @!attribute [rw] refPrefix
#   @return [String]
#
# @!attribute [rw] religion
#   @return [String]
#
# @!attribute [rw] similarity
#   @return [Float]
#
# @!attribute [rw] similaritySmall
#   @return [Float]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] sourceUrl
#   @return [String]
#
# @!attribute [rw] textsClose
#   @return [Integer]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] translator
#   @return [String]
#
# @!attribute [rw] unitLabel
#   @return [String]
#
# @!attribute [rw] urantiaParallelLimit
#   @return [Integer, nil]
#
# @!attribute [rw] urantiaParallels
#   @return [Array]
#
# @!attribute [rw] urantiaSection
#   @return [Object]
#
# @!attribute [rw] year
#   @return [Integer]
Scripture = Struct.new(
  :chunk,
  :closest,
  :consensus,
  :corpus,
  :data,
  :distance,
  :divisionLabel,
  :divisions,
  :gap,
  :id,
  :license,
  :limit,
  :meta,
  :notes,
  :page,
  :pages,
  :paragraph,
  :passage,
  :passageCount,
  :passages,
  :percentile,
  :q,
  :refLevels,
  :refPrefix,
  :religion,
  :similarity,
  :similaritySmall,
  :slug,
  :sourceUrl,
  :textsClose,
  :title,
  :translator,
  :unitLabel,
  :urantiaParallelLimit,
  :urantiaParallels,
  :urantiaSection,
  :year,
  keyword_init: true
)

# Request payload for Scripture#load.
#
# @!attribute [rw] id
#   @return [String]
ScriptureLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Scripture#list.
#
# @!attribute [rw] chunk
#   @return [Hash, nil]
#
# @!attribute [rw] closest
#   @return [Array, nil]
#
# @!attribute [rw] consensus
#   @return [Float, nil]
#
# @!attribute [rw] corpus
#   @return [Hash, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] distance
#   @return [Float, nil]
#
# @!attribute [rw] divisionLabel
#   @return [String, nil]
#
# @!attribute [rw] divisions
#   @return [Array, nil]
#
# @!attribute [rw] gap
#   @return [Float, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] license
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] notes
#   @return [Object, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] pages
#   @return [Array, nil]
#
# @!attribute [rw] paragraph
#   @return [Hash, nil]
#
# @!attribute [rw] passage
#   @return [Hash, nil]
#
# @!attribute [rw] passageCount
#   @return [Integer, nil]
#
# @!attribute [rw] passages
#   @return [Array, nil]
#
# @!attribute [rw] percentile
#   @return [Float, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] refLevels
#   @return [Integer, nil]
#
# @!attribute [rw] refPrefix
#   @return [String, nil]
#
# @!attribute [rw] religion
#   @return [String, nil]
#
# @!attribute [rw] similarity
#   @return [Float, nil]
#
# @!attribute [rw] similaritySmall
#   @return [Float, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] sourceUrl
#   @return [String, nil]
#
# @!attribute [rw] textsClose
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] translator
#   @return [String, nil]
#
# @!attribute [rw] unitLabel
#   @return [String, nil]
#
# @!attribute [rw] urantiaParallelLimit
#   @return [Integer, nil]
#
# @!attribute [rw] urantiaParallels
#   @return [Array, nil]
#
# @!attribute [rw] urantiaSection
#   @return [Object, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
ScriptureListMatch = Struct.new(
  :chunk,
  :closest,
  :consensus,
  :corpus,
  :data,
  :distance,
  :divisionLabel,
  :divisions,
  :gap,
  :id,
  :license,
  :limit,
  :meta,
  :notes,
  :page,
  :pages,
  :paragraph,
  :passage,
  :passageCount,
  :passages,
  :percentile,
  :q,
  :refLevels,
  :refPrefix,
  :religion,
  :similarity,
  :similaritySmall,
  :slug,
  :sourceUrl,
  :textsClose,
  :title,
  :translator,
  :unitLabel,
  :urantiaParallelLimit,
  :urantiaParallels,
  :urantiaSection,
  :year,
  keyword_init: true
)

# Request payload for Scripture#create.
#
# @!attribute [rw] corpus
#   @return [Hash, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String]
#
# @!attribute [rw] urantiaParallelLimit
#   @return [Integer, nil]
ScriptureCreateData = Struct.new(
  :corpus,
  :limit,
  :page,
  :q,
  :urantiaParallelLimit,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] audio
#   @return [Object]
#
# @!attribute [rw] bibleParallels
#   @return [Array, nil]
#
# @!attribute [rw] data
#   @return [Array]
#
# @!attribute [rw] entities
#   @return [Array, nil]
#
# @!attribute [rw] htmlText
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] include
#   @return [String, nil]
#
# @!attribute [rw] labels
#   @return [Object]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] match
#   @return [String]
#
# @!attribute [rw] meta
#   @return [Hash]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] paperId
#   @return [String, nil]
#
# @!attribute [rw] paperTitle
#   @return [String]
#
# @!attribute [rw] paragraphId
#   @return [String]
#
# @!attribute [rw] partId
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String]
#
# @!attribute [rw] rank
#   @return [Float]
#
# @!attribute [rw] scriptureParallels
#   @return [Array, nil]
#
# @!attribute [rw] scriptureScores
#   @return [Object]
#
# @!attribute [rw] sectionId
#   @return [Object]
#
# @!attribute [rw] sectionTitle
#   @return [Object]
#
# @!attribute [rw] sortId
#   @return [String]
#
# @!attribute [rw] standardReferenceId
#   @return [String]
#
# @!attribute [rw] text
#   @return [String]
#
# @!attribute [rw] translation
#   @return [Hash]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] urantiaParallels
#   @return [Array, nil]
Search = Struct.new(
  :audio,
  :bibleParallels,
  :data,
  :entities,
  :htmlText,
  :id,
  :include,
  :labels,
  :language,
  :limit,
  :match,
  :meta,
  :page,
  :paperId,
  :paperTitle,
  :paragraphId,
  :partId,
  :q,
  :rank,
  :scriptureParallels,
  :scriptureScores,
  :sectionId,
  :sectionTitle,
  :sortId,
  :standardReferenceId,
  :text,
  :translation,
  :type,
  :urantiaParallels,
  keyword_init: true
)

# Request payload for Search#list.
#
# @!attribute [rw] include
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Object, nil]
#
# @!attribute [rw] paper_id
#   @return [String, nil]
#
# @!attribute [rw] part_id
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String]
#
# @!attribute [rw] type
#   @return [String, nil]
SearchListMatch = Struct.new(
  :include,
  :limit,
  :page,
  :paper_id,
  :part_id,
  :q,
  :type,
  keyword_init: true
)

# Request payload for Search#create.
#
# @!attribute [rw] include
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] paperId
#   @return [String, nil]
#
# @!attribute [rw] partId
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String]
#
# @!attribute [rw] type
#   @return [String, nil]
SearchCreateData = Struct.new(
  :include,
  :limit,
  :page,
  :paperId,
  :partId,
  :q,
  :type,
  keyword_init: true
)

# TableOfContent entity data model.
#
# @!attribute [rw] parts
#   @return [Array]
TableOfContent = Struct.new(
  :parts,
  keyword_init: true
)

# Request payload for TableOfContent#load.
#
# @!attribute [rw] lang
#   @return [String, nil]
TableOfContentLoadMatch = Struct.new(
  :lang,
  keyword_init: true
)

# Tool entity data model.
class Tool
end

# Request payload for Tool#list.
class ToolListMatch
end

# Work entity data model.
#
# @!attribute [rw] data
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] match
#   @return [String, nil]
#
# @!attribute [rw] meta
#   @return [Hash]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String]
#
# @!attribute [rw] refPrefix
#   @return [Object]
#
# @!attribute [rw] reference
#   @return [String]
#
# @!attribute [rw] religion
#   @return [String]
#
# @!attribute [rw] similarity
#   @return [Float, nil]
#
# @!attribute [rw] strength
#   @return [String, nil]
#
# @!attribute [rw] summary
#   @return [String]
#
# @!attribute [rw] text
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] tradition
#   @return [String]
#
# @!attribute [rw] translator
#   @return [String]
#
# @!attribute [rw] unitLabel
#   @return [String]
#
# @!attribute [rw] units
#   @return [Integer]
#
# @!attribute [rw] urantiaParallelLimit
#   @return [Integer, nil]
#
# @!attribute [rw] urantiaParallels
#   @return [Array]
#
# @!attribute [rw] urantiaSection
#   @return [Object]
#
# @!attribute [rw] url
#   @return [Object]
#
# @!attribute [rw] work
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Object]
Work = Struct.new(
  :data,
  :id,
  :kind,
  :limit,
  :match,
  :meta,
  :page,
  :q,
  :refPrefix,
  :reference,
  :religion,
  :similarity,
  :strength,
  :summary,
  :text,
  :title,
  :tradition,
  :translator,
  :unitLabel,
  :units,
  :urantiaParallelLimit,
  :urantiaParallels,
  :urantiaSection,
  :url,
  :work,
  :year,
  keyword_init: true
)

# Request payload for Work#load.
#
# @!attribute [rw] ref
#   @return [String]
#
# @!attribute [rw] work
#   @return [String]
WorkLoadMatch = Struct.new(
  :ref,
  :work,
  keyword_init: true
)

# Request payload for Work#list.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] match
#   @return [String, nil]
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] refPrefix
#   @return [Object, nil]
#
# @!attribute [rw] reference
#   @return [String, nil]
#
# @!attribute [rw] religion
#   @return [String, nil]
#
# @!attribute [rw] similarity
#   @return [Float, nil]
#
# @!attribute [rw] strength
#   @return [String, nil]
#
# @!attribute [rw] summary
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] tradition
#   @return [String, nil]
#
# @!attribute [rw] translator
#   @return [String, nil]
#
# @!attribute [rw] unitLabel
#   @return [String, nil]
#
# @!attribute [rw] units
#   @return [Integer, nil]
#
# @!attribute [rw] urantiaParallelLimit
#   @return [Integer, nil]
#
# @!attribute [rw] urantiaParallels
#   @return [Array, nil]
#
# @!attribute [rw] urantiaSection
#   @return [Object, nil]
#
# @!attribute [rw] url
#   @return [Object, nil]
#
# @!attribute [rw] work
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Object, nil]
WorkListMatch = Struct.new(
  :data,
  :id,
  :kind,
  :limit,
  :match,
  :meta,
  :page,
  :q,
  :refPrefix,
  :reference,
  :religion,
  :similarity,
  :strength,
  :summary,
  :text,
  :title,
  :tradition,
  :translator,
  :unitLabel,
  :units,
  :urantiaParallelLimit,
  :urantiaParallels,
  :urantiaSection,
  :url,
  :work,
  :year,
  keyword_init: true
)

# Request payload for Work#create.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String]
#
# @!attribute [rw] urantiaParallelLimit
#   @return [Integer, nil]
#
# @!attribute [rw] work
#   @return [String, nil]
WorkCreateData = Struct.new(
  :limit,
  :page,
  :q,
  :urantiaParallelLimit,
  :work,
  keyword_init: true
)


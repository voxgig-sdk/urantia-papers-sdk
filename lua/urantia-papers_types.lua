-- Typed models for the UrantiaPapers SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Audio
---@field audio table|nil
---@field id string

---@class AudioLoadMatch
---@field id string

---@class Bible
---@field abbr string
---@field bookCode string
---@field bookName string
---@field bookOrder number
---@field canon string
---@field chapter number
---@field chapterCount number
---@field chunk table
---@field data table
---@field fullName string
---@field id string
---@field limit? number
---@field meta table
---@field page? number
---@field q string
---@field reference string
---@field text string
---@field translation string
---@field urantiaParallelLimit? number
---@field urantiaParallels table
---@field verse number
---@field verseCount number
---@field verses table

---@class BibleLoadMatch
---@field id string

---@class BibleListMatch
---@field abbr? string
---@field bookCode? string
---@field bookName? string
---@field bookOrder? number
---@field canon? string
---@field chapter? number
---@field chapterCount? number
---@field chunk? table
---@field data? table
---@field fullName? string
---@field id? string
---@field limit? number
---@field meta? table
---@field page? number
---@field q? string
---@field reference? string
---@field text? string
---@field translation? string
---@field urantiaParallelLimit? number
---@field urantiaParallels? table
---@field verse? number
---@field verseCount? number
---@field verses? table

---@class BibleCreateData
---@field bookCode? string
---@field canon? string
---@field limit? number
---@field page? number
---@field q string
---@field urantiaParallelLimit? number

---@class Citation
---@field citation string
---@field ref string
---@field style string

---@class CitationLoadMatch
---@field ref string
---@field style? string

---@class Embedding
---@field dimensions number
---@field embedding table
---@field id? string
---@field model string
---@field standardReferenceId string

---@class EmbeddingLoadMatch
---@field id string
---@field model? string

---@class Entity
---@field aliases table|nil
---@field citationCount number
---@field description string|nil
---@field id string
---@field language? string
---@field name string
---@field seeAlso table|nil
---@field sense string|nil
---@field type string

---@class EntityLoadMatch
---@field id string

---@class EntityListMatch
---@field lang? string
---@field limit? number
---@field page? number|nil
---@field q? string
---@field type? string

---@class Feedback
---@field category string
---@field client? string
---@field contact? string
---@field endpoint? string
---@field message string
---@field pageUrl? string
---@field ref? string
---@field requestId? string

---@class FeedbackCreateData
---@field category string
---@field client? string
---@field contact? string
---@field endpoint? string
---@field message string
---@field pageUrl? string
---@field ref? string
---@field requestId? string

---@class Language
---@field code string
---@field entityCount number
---@field name string
---@field paragraphCount number

---@class LanguageListMatch
---@field code? string
---@field entityCount? number
---@field name? string
---@field paragraphCount? number

---@class Ogn

---@class OgnLoadMatch
---@field ref string
---@field theme? string

---@class Paper
---@field id string
---@field labels table|nil
---@field paper table
---@field paragraphs table
---@field partId string
---@field sortId string
---@field title string
---@field topEntities? table
---@field video table|nil

---@class PaperLoadMatch
---@field id string
---@field format? string
---@field include? string
---@field lang? string

---@class PaperListMatch
---@field format? string
---@field include? string
---@field lang? string

---@class Paragraph
---@field data table
---@field id? string
---@field navigation table

---@class ParagraphLoadMatch
---@field id string
---@field format? string
---@field include? string
---@field lang? string

---@class Quote

---@class QuoteCreateData
---@field ref? any
---@field text? any

---@class Scripture
---@field chunk table
---@field closest table
---@field consensus number
---@field corpus table
---@field data table
---@field distance number
---@field divisionLabel string
---@field divisions table
---@field gap number
---@field id string
---@field license string
---@field limit? number
---@field meta table
---@field notes string|nil
---@field page? number
---@field pages table
---@field paragraph table
---@field passage table
---@field passageCount number
---@field passages table
---@field percentile number
---@field q string
---@field refLevels number
---@field refPrefix string
---@field religion string
---@field similarity number
---@field similaritySmall number
---@field slug string
---@field sourceUrl string
---@field textsClose number
---@field title string
---@field translator string
---@field unitLabel string
---@field urantiaParallelLimit? number
---@field urantiaParallels table
---@field urantiaSection string|nil
---@field year number

---@class ScriptureLoadMatch
---@field id string

---@class ScriptureListMatch
---@field chunk? table
---@field closest? table
---@field consensus? number
---@field corpus? table
---@field data? table
---@field distance? number
---@field divisionLabel? string
---@field divisions? table
---@field gap? number
---@field id? string
---@field license? string
---@field limit? number
---@field meta? table
---@field notes? string|nil
---@field page? number
---@field pages? table
---@field paragraph? table
---@field passage? table
---@field passageCount? number
---@field passages? table
---@field percentile? number
---@field q? string
---@field refLevels? number
---@field refPrefix? string
---@field religion? string
---@field similarity? number
---@field similaritySmall? number
---@field slug? string
---@field sourceUrl? string
---@field textsClose? number
---@field title? string
---@field translator? string
---@field unitLabel? string
---@field urantiaParallelLimit? number
---@field urantiaParallels? table
---@field urantiaSection? string|nil
---@field year? number

---@class ScriptureCreateData
---@field corpus? table
---@field limit? number
---@field page? number
---@field q string
---@field urantiaParallelLimit? number

---@class Search
---@field audio table|nil
---@field bibleParallels? table
---@field data table
---@field entities? table
---@field htmlText string
---@field id string
---@field include? string
---@field labels table|nil
---@field language? string
---@field limit? number
---@field match string
---@field meta table
---@field page? number
---@field paperId? string
---@field paperTitle string
---@field paragraphId string
---@field partId? string
---@field q string
---@field rank number
---@field scriptureParallels? table
---@field scriptureScores table|nil
---@field sectionId string|nil
---@field sectionTitle string|nil
---@field sortId string
---@field standardReferenceId string
---@field text string
---@field translation table
---@field type? string
---@field urantiaParallels? table

---@class SearchListMatch
---@field include? string
---@field limit? number
---@field page? number|nil
---@field paper_id? string
---@field part_id? string
---@field q string
---@field type? string

---@class SearchCreateData
---@field include? string
---@field limit? number
---@field page? number
---@field paperId? string
---@field partId? string
---@field q string
---@field type? string

---@class TableOfContent
---@field parts table

---@class TableOfContentLoadMatch
---@field lang? string

---@class Tool

---@class ToolListMatch

---@class Work
---@field data table
---@field id string
---@field kind string
---@field limit? number
---@field match? string
---@field meta table
---@field page? number
---@field q string
---@field refPrefix string|nil
---@field reference string
---@field religion string
---@field similarity? number
---@field strength? string
---@field summary string
---@field text string
---@field title string
---@field tradition string
---@field translator string
---@field unitLabel string
---@field units number
---@field urantiaParallelLimit? number
---@field urantiaParallels table
---@field urantiaSection string|nil
---@field url string|nil
---@field work? string
---@field year number|nil

---@class WorkLoadMatch
---@field ref string
---@field work string

---@class WorkListMatch
---@field data? table
---@field id? string
---@field kind? string
---@field limit? number
---@field match? string
---@field meta? table
---@field page? number
---@field q? string
---@field refPrefix? string|nil
---@field reference? string
---@field religion? string
---@field similarity? number
---@field strength? string
---@field summary? string
---@field text? string
---@field title? string
---@field tradition? string
---@field translator? string
---@field unitLabel? string
---@field units? number
---@field urantiaParallelLimit? number
---@field urantiaParallels? table
---@field urantiaSection? string|nil
---@field url? string|nil
---@field work? string
---@field year? number|nil

---@class WorkCreateData
---@field limit? number
---@field page? number
---@field q string
---@field urantiaParallelLimit? number
---@field work? string

local M = {}

return M

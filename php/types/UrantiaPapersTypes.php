<?php
declare(strict_types=1);

// Typed models for the UrantiaPapers SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Audio entity data model. */
class Audio
{
    public mixed $audio;
    public string $id;
}

/** Request payload for Audio#load. */
class AudioLoadMatch
{
    public string $id;
}

/** Bible entity data model. */
class Bible
{
    public string $abbr;
    public string $bookCode;
    public string $bookName;
    public int $bookOrder;
    public string $canon;
    public int $chapter;
    public int $chapterCount;
    public array $chunk;
    public array $data;
    public string $fullName;
    public string $id;
    public ?int $limit = null;
    public array $meta;
    public ?int $page = null;
    public string $q;
    public string $reference;
    public string $text;
    public string $translation;
    public ?int $urantiaParallelLimit = null;
    public array $urantiaParallels;
    public int $verse;
    public int $verseCount;
    public array $verses;
}

/** Request payload for Bible#load. */
class BibleLoadMatch
{
    public string $id;
}

/** Request payload for Bible#list. */
class BibleListMatch
{
    public ?string $abbr = null;
    public ?string $bookCode = null;
    public ?string $bookName = null;
    public ?int $bookOrder = null;
    public ?string $canon = null;
    public ?int $chapter = null;
    public ?int $chapterCount = null;
    public ?array $chunk = null;
    public ?array $data = null;
    public ?string $fullName = null;
    public ?string $id = null;
    public ?int $limit = null;
    public ?array $meta = null;
    public ?int $page = null;
    public ?string $q = null;
    public ?string $reference = null;
    public ?string $text = null;
    public ?string $translation = null;
    public ?int $urantiaParallelLimit = null;
    public ?array $urantiaParallels = null;
    public ?int $verse = null;
    public ?int $verseCount = null;
    public ?array $verses = null;
}

/** Request payload for Bible#create. */
class BibleCreateData
{
    public ?string $bookCode = null;
    public ?string $canon = null;
    public ?int $limit = null;
    public ?int $page = null;
    public string $q;
    public ?int $urantiaParallelLimit = null;
}

/** Citation entity data model. */
class Citation
{
    public string $citation;
    public string $ref;
    public string $style;
}

/** Request payload for Citation#load. */
class CitationLoadMatch
{
    public string $ref;
    public ?string $style = null;
}

/** Embedding entity data model. */
class Embedding
{
    public int $dimensions;
    public array $embedding;
    public ?string $id = null;
    public string $model;
    public string $standardReferenceId;
}

/** Request payload for Embedding#load. */
class EmbeddingLoadMatch
{
    public string $id;
    public ?string $model = null;
}

/** Entity entity data model. */
class Entity
{
    public mixed $aliases;
    public int $citationCount;
    public mixed $description;
    public string $id;
    public ?string $language = null;
    public string $name;
    public mixed $seeAlso;
    public mixed $sense;
    public string $type;
}

/** Request payload for Entity#load. */
class EntityLoadMatch
{
    public string $id;
}

/** Request payload for Entity#list. */
class EntityListMatch
{
    public ?string $lang = null;
    public ?int $limit = null;
    public mixed $page = null;
    public ?string $q = null;
    public ?string $type = null;
}

/** Feedback entity data model. */
class Feedback
{
    public string $category;
    public ?string $client = null;
    public ?string $contact = null;
    public ?string $endpoint = null;
    public string $message;
    public ?string $pageUrl = null;
    public ?string $ref = null;
    public ?string $requestId = null;
}

/** Request payload for Feedback#create. */
class FeedbackCreateData
{
    public string $category;
    public ?string $client = null;
    public ?string $contact = null;
    public ?string $endpoint = null;
    public string $message;
    public ?string $pageUrl = null;
    public ?string $ref = null;
    public ?string $requestId = null;
}

/** Language entity data model. */
class Language
{
    public string $code;
    public int $entityCount;
    public string $name;
    public int $paragraphCount;
}

/** Request payload for Language#list. */
class LanguageListMatch
{
    public ?string $code = null;
    public ?int $entityCount = null;
    public ?string $name = null;
    public ?int $paragraphCount = null;
}

/** Ogn entity data model. */
class Ogn
{
}

/** Request payload for Ogn#load. */
class OgnLoadMatch
{
    public string $ref;
    public ?string $theme = null;
}

/** Paper entity data model. */
class Paper
{
    public string $id;
    public mixed $labels;
    public array $paper;
    public array $paragraphs;
    public string $partId;
    public string $sortId;
    public string $title;
    public ?array $topEntities = null;
    public mixed $video;
}

/** Request payload for Paper#load. */
class PaperLoadMatch
{
    public string $id;
    public ?string $format = null;
    public ?string $include = null;
    public ?string $lang = null;
}

/** Request payload for Paper#list. */
class PaperListMatch
{
    public ?string $format = null;
    public ?string $include = null;
    public ?string $lang = null;
}

/** Paragraph entity data model. */
class Paragraph
{
    public array $data;
    public ?string $id = null;
    public array $navigation;
}

/** Request payload for Paragraph#load. */
class ParagraphLoadMatch
{
    public string $id;
    public ?string $format = null;
    public ?string $include = null;
    public ?string $lang = null;
}

/** Quote entity data model. */
class Quote
{
}

/** Request payload for Quote#create. */
class QuoteCreateData
{
    public mixed $ref = null;
    public mixed $text = null;
}

/** Scripture entity data model. */
class Scripture
{
    public array $chunk;
    public array $closest;
    public float $consensus;
    public array $corpus;
    public array $data;
    public float $distance;
    public string $divisionLabel;
    public array $divisions;
    public float $gap;
    public string $id;
    public string $license;
    public ?int $limit = null;
    public array $meta;
    public mixed $notes;
    public ?int $page = null;
    public array $pages;
    public array $paragraph;
    public array $passage;
    public int $passageCount;
    public array $passages;
    public float $percentile;
    public string $q;
    public int $refLevels;
    public string $refPrefix;
    public string $religion;
    public float $similarity;
    public float $similaritySmall;
    public string $slug;
    public string $sourceUrl;
    public int $textsClose;
    public string $title;
    public string $translator;
    public string $unitLabel;
    public ?int $urantiaParallelLimit = null;
    public array $urantiaParallels;
    public mixed $urantiaSection;
    public int $year;
}

/** Request payload for Scripture#load. */
class ScriptureLoadMatch
{
    public string $id;
}

/** Request payload for Scripture#list. */
class ScriptureListMatch
{
    public ?array $chunk = null;
    public ?array $closest = null;
    public ?float $consensus = null;
    public ?array $corpus = null;
    public ?array $data = null;
    public ?float $distance = null;
    public ?string $divisionLabel = null;
    public ?array $divisions = null;
    public ?float $gap = null;
    public ?string $id = null;
    public ?string $license = null;
    public ?int $limit = null;
    public ?array $meta = null;
    public mixed $notes = null;
    public ?int $page = null;
    public ?array $pages = null;
    public ?array $paragraph = null;
    public ?array $passage = null;
    public ?int $passageCount = null;
    public ?array $passages = null;
    public ?float $percentile = null;
    public ?string $q = null;
    public ?int $refLevels = null;
    public ?string $refPrefix = null;
    public ?string $religion = null;
    public ?float $similarity = null;
    public ?float $similaritySmall = null;
    public ?string $slug = null;
    public ?string $sourceUrl = null;
    public ?int $textsClose = null;
    public ?string $title = null;
    public ?string $translator = null;
    public ?string $unitLabel = null;
    public ?int $urantiaParallelLimit = null;
    public ?array $urantiaParallels = null;
    public mixed $urantiaSection = null;
    public ?int $year = null;
}

/** Request payload for Scripture#create. */
class ScriptureCreateData
{
    public ?array $corpus = null;
    public ?int $limit = null;
    public ?int $page = null;
    public string $q;
    public ?int $urantiaParallelLimit = null;
}

/** Search entity data model. */
class Search
{
    public mixed $audio;
    public ?array $bibleParallels = null;
    public array $data;
    public ?array $entities = null;
    public string $htmlText;
    public string $id;
    public ?string $include = null;
    public mixed $labels;
    public ?string $language = null;
    public ?int $limit = null;
    public string $match;
    public array $meta;
    public ?int $page = null;
    public ?string $paperId = null;
    public string $paperTitle;
    public string $paragraphId;
    public ?string $partId = null;
    public string $q;
    public float $rank;
    public ?array $scriptureParallels = null;
    public mixed $scriptureScores;
    public mixed $sectionId;
    public mixed $sectionTitle;
    public string $sortId;
    public string $standardReferenceId;
    public string $text;
    public array $translation;
    public ?string $type = null;
    public ?array $urantiaParallels = null;
}

/** Request payload for Search#list. */
class SearchListMatch
{
    public ?string $include = null;
    public ?int $limit = null;
    public mixed $page = null;
    public ?string $paper_id = null;
    public ?string $part_id = null;
    public string $q;
    public ?string $type = null;
}

/** Request payload for Search#create. */
class SearchCreateData
{
    public ?string $include = null;
    public ?int $limit = null;
    public ?int $page = null;
    public ?string $paperId = null;
    public ?string $partId = null;
    public string $q;
    public ?string $type = null;
}

/** TableOfContent entity data model. */
class TableOfContent
{
    public array $parts;
}

/** Request payload for TableOfContent#load. */
class TableOfContentLoadMatch
{
    public ?string $lang = null;
}

/** Tool entity data model. */
class Tool
{
}

/** Request payload for Tool#list. */
class ToolListMatch
{
}

/** Work entity data model. */
class Work
{
    public array $data;
    public string $id;
    public string $kind;
    public ?int $limit = null;
    public ?string $match = null;
    public array $meta;
    public ?int $page = null;
    public string $q;
    public mixed $refPrefix;
    public string $reference;
    public string $religion;
    public ?float $similarity = null;
    public ?string $strength = null;
    public string $summary;
    public string $text;
    public string $title;
    public string $tradition;
    public string $translator;
    public string $unitLabel;
    public int $units;
    public ?int $urantiaParallelLimit = null;
    public array $urantiaParallels;
    public mixed $urantiaSection;
    public mixed $url;
    public ?string $work = null;
    public mixed $year;
}

/** Request payload for Work#load. */
class WorkLoadMatch
{
    public string $ref;
    public string $work;
}

/** Request payload for Work#list. */
class WorkListMatch
{
    public ?array $data = null;
    public ?string $id = null;
    public ?string $kind = null;
    public ?int $limit = null;
    public ?string $match = null;
    public ?array $meta = null;
    public ?int $page = null;
    public ?string $q = null;
    public mixed $refPrefix = null;
    public ?string $reference = null;
    public ?string $religion = null;
    public ?float $similarity = null;
    public ?string $strength = null;
    public ?string $summary = null;
    public ?string $text = null;
    public ?string $title = null;
    public ?string $tradition = null;
    public ?string $translator = null;
    public ?string $unitLabel = null;
    public ?int $units = null;
    public ?int $urantiaParallelLimit = null;
    public ?array $urantiaParallels = null;
    public mixed $urantiaSection = null;
    public mixed $url = null;
    public ?string $work = null;
    public mixed $year = null;
}

/** Request payload for Work#create. */
class WorkCreateData
{
    public ?int $limit = null;
    public ?int $page = null;
    public string $q;
    public ?int $urantiaParallelLimit = null;
    public ?string $work = null;
}


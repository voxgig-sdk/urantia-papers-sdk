# Typed models for the UrantiaPapers SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Audio(TypedDict):
    audio: dict | None
    id: str


class AudioLoadMatch(TypedDict):
    id: str


class BibleRequired(TypedDict):
    abbr: str
    bookCode: str
    bookName: str
    bookOrder: int
    canon: str
    chapter: int
    chapterCount: int
    chunk: dict
    data: list
    fullName: str
    id: str
    meta: dict
    q: str
    reference: str
    text: str
    translation: str
    urantiaParallels: list
    verse: int
    verseCount: int
    verses: list


class Bible(BibleRequired, total=False):
    limit: int
    page: int
    urantiaParallelLimit: int


class BibleLoadMatch(TypedDict):
    id: str


class BibleListMatch(TypedDict, total=False):
    abbr: str
    bookCode: str
    bookName: str
    bookOrder: int
    canon: str
    chapter: int
    chapterCount: int
    chunk: dict
    data: list
    fullName: str
    id: str
    limit: int
    meta: dict
    page: int
    q: str
    reference: str
    text: str
    translation: str
    urantiaParallelLimit: int
    urantiaParallels: list
    verse: int
    verseCount: int
    verses: list


class BibleCreateDataRequired(TypedDict):
    q: str


class BibleCreateData(BibleCreateDataRequired, total=False):
    bookCode: str
    canon: str
    limit: int
    page: int
    urantiaParallelLimit: int


class Citation(TypedDict):
    citation: str
    ref: str
    style: str


class CitationLoadMatchRequired(TypedDict):
    ref: str


class CitationLoadMatch(CitationLoadMatchRequired, total=False):
    style: str


class EmbeddingRequired(TypedDict):
    dimensions: int
    embedding: list
    model: str
    standardReferenceId: str


class Embedding(EmbeddingRequired, total=False):
    id: str


class EmbeddingLoadMatchRequired(TypedDict):
    id: str


class EmbeddingLoadMatch(EmbeddingLoadMatchRequired, total=False):
    model: str


class EntityRequired(TypedDict):
    aliases: list | None
    citationCount: int
    description: str | None
    id: str
    name: str
    seeAlso: list | None
    sense: str | None
    type: str


class Entity(EntityRequired, total=False):
    language: str


class EntityLoadMatch(TypedDict):
    id: str


class EntityListMatch(TypedDict, total=False):
    lang: str
    limit: int
    page: int | None
    q: str
    type: str


class FeedbackRequired(TypedDict):
    category: str
    message: str


class Feedback(FeedbackRequired, total=False):
    client: str
    contact: str
    endpoint: str
    pageUrl: str
    ref: str
    requestId: str


class FeedbackCreateDataRequired(TypedDict):
    category: str
    message: str


class FeedbackCreateData(FeedbackCreateDataRequired, total=False):
    client: str
    contact: str
    endpoint: str
    pageUrl: str
    ref: str
    requestId: str


class Language(TypedDict):
    code: str
    entityCount: int
    name: str
    paragraphCount: int


class LanguageListMatch(TypedDict, total=False):
    code: str
    entityCount: int
    name: str
    paragraphCount: int


class Ogn(TypedDict):
    pass


class OgnLoadMatchRequired(TypedDict):
    ref: str


class OgnLoadMatch(OgnLoadMatchRequired, total=False):
    theme: str


class PaperRequired(TypedDict):
    id: str
    labels: list | None
    paper: dict
    paragraphs: list
    partId: str
    sortId: str
    title: str
    video: dict | None


class Paper(PaperRequired, total=False):
    topEntities: list


class PaperLoadMatchRequired(TypedDict):
    id: str


class PaperLoadMatch(PaperLoadMatchRequired, total=False):
    format: str
    include: str
    lang: str


class PaperListMatch(TypedDict, total=False):
    format: str
    include: str
    lang: str


class ParagraphRequired(TypedDict):
    data: dict
    navigation: dict


class Paragraph(ParagraphRequired, total=False):
    id: str


class ParagraphLoadMatchRequired(TypedDict):
    id: str


class ParagraphLoadMatch(ParagraphLoadMatchRequired, total=False):
    format: str
    include: str
    lang: str


class Quote(TypedDict):
    pass


class QuoteCreateData(TypedDict, total=False):
    ref: Any
    text: Any


class ScriptureRequired(TypedDict):
    chunk: dict
    closest: list
    consensus: float
    corpus: dict
    data: list
    distance: float
    divisionLabel: str
    divisions: list
    gap: float
    id: str
    license: str
    meta: dict
    notes: str | None
    pages: list
    paragraph: dict
    passage: dict
    passageCount: int
    passages: list
    percentile: float
    q: str
    refLevels: int
    refPrefix: str
    religion: str
    similarity: float
    similaritySmall: float
    slug: str
    sourceUrl: str
    textsClose: int
    title: str
    translator: str
    unitLabel: str
    urantiaParallels: list
    urantiaSection: str | None
    year: int


class Scripture(ScriptureRequired, total=False):
    limit: int
    page: int
    urantiaParallelLimit: int


class ScriptureLoadMatch(TypedDict):
    id: str


class ScriptureListMatch(TypedDict, total=False):
    chunk: dict
    closest: list
    consensus: float
    corpus: dict
    data: list
    distance: float
    divisionLabel: str
    divisions: list
    gap: float
    id: str
    license: str
    limit: int
    meta: dict
    notes: str | None
    page: int
    pages: list
    paragraph: dict
    passage: dict
    passageCount: int
    passages: list
    percentile: float
    q: str
    refLevels: int
    refPrefix: str
    religion: str
    similarity: float
    similaritySmall: float
    slug: str
    sourceUrl: str
    textsClose: int
    title: str
    translator: str
    unitLabel: str
    urantiaParallelLimit: int
    urantiaParallels: list
    urantiaSection: str | None
    year: int


class ScriptureCreateDataRequired(TypedDict):
    q: str


class ScriptureCreateData(ScriptureCreateDataRequired, total=False):
    corpus: dict
    limit: int
    page: int
    urantiaParallelLimit: int


class SearchRequired(TypedDict):
    audio: dict | None
    data: list
    htmlText: str
    id: str
    labels: list | None
    match: str
    meta: dict
    paperTitle: str
    paragraphId: str
    q: str
    rank: float
    scriptureScores: dict | None
    sectionId: str | None
    sectionTitle: str | None
    sortId: str
    standardReferenceId: str
    text: str
    translation: dict


class Search(SearchRequired, total=False):
    bibleParallels: list
    entities: list
    include: str
    language: str
    limit: int
    page: int
    paperId: str
    partId: str
    scriptureParallels: list
    type: str
    urantiaParallels: list


class SearchListMatchRequired(TypedDict):
    q: str


class SearchListMatch(SearchListMatchRequired, total=False):
    include: str
    limit: int
    page: int | None
    paper_id: str
    part_id: str
    type: str


class SearchCreateDataRequired(TypedDict):
    q: str


class SearchCreateData(SearchCreateDataRequired, total=False):
    include: str
    limit: int
    page: int
    paperId: str
    partId: str
    type: str


class TableOfContent(TypedDict):
    parts: list


class TableOfContentLoadMatch(TypedDict, total=False):
    lang: str


class Tool(TypedDict):
    pass


class ToolListMatch(TypedDict):
    pass


class WorkRequired(TypedDict):
    data: list
    id: str
    kind: str
    meta: dict
    q: str
    refPrefix: str | None
    reference: str
    religion: str
    summary: str
    text: str
    title: str
    tradition: str
    translator: str
    unitLabel: str
    units: int
    urantiaParallels: list
    urantiaSection: str | None
    url: str | None
    year: int | None


class Work(WorkRequired, total=False):
    limit: int
    match: str
    page: int
    similarity: float
    strength: str
    urantiaParallelLimit: int
    work: str


class WorkLoadMatch(TypedDict):
    ref: str
    work: str


class WorkListMatch(TypedDict, total=False):
    data: list
    id: str
    kind: str
    limit: int
    match: str
    meta: dict
    page: int
    q: str
    refPrefix: str | None
    reference: str
    religion: str
    similarity: float
    strength: str
    summary: str
    text: str
    title: str
    tradition: str
    translator: str
    unitLabel: str
    units: int
    urantiaParallelLimit: int
    urantiaParallels: list
    urantiaSection: str | None
    url: str | None
    work: str
    year: int | None


class WorkCreateDataRequired(TypedDict):
    q: str


class WorkCreateData(WorkCreateDataRequired, total=False):
    limit: int
    page: int
    urantiaParallelLimit: int
    work: str

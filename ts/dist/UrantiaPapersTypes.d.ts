export interface Audio {
    audio: Record<string, any> | null;
    id: string;
}
export interface AudioLoadMatch {
    id: string;
}
export interface Bible {
    abbr: string;
    bookCode: string;
    bookName: string;
    bookOrder: number;
    canon: string;
    chapter: number;
    chapterCount: number;
    chunk: Record<string, any>;
    data: any[];
    fullName: string;
    id: string;
    limit?: number;
    meta: Record<string, any>;
    page?: number;
    q: string;
    reference: string;
    text: string;
    translation: string;
    urantiaParallelLimit?: number;
    urantiaParallels: any[];
    verse: number;
    verseCount: number;
    verses: any[];
}
export interface BibleLoadMatch {
    id: string;
}
export interface BibleListMatch {
    abbr?: string;
    bookCode?: string;
    bookName?: string;
    bookOrder?: number;
    canon?: string;
    chapter?: number;
    chapterCount?: number;
    chunk?: Record<string, any>;
    data?: any[];
    fullName?: string;
    id?: string;
    limit?: number;
    meta?: Record<string, any>;
    page?: number;
    q?: string;
    reference?: string;
    text?: string;
    translation?: string;
    urantiaParallelLimit?: number;
    urantiaParallels?: any[];
    verse?: number;
    verseCount?: number;
    verses?: any[];
    $action?: string;
    [action: string]: any;
}
export interface BibleCreateData {
    bookCode?: string;
    canon?: string;
    limit?: number;
    page?: number;
    q: string;
    urantiaParallelLimit?: number;
}
export interface Citation {
    citation: string;
    ref: string;
    style: string;
}
export interface CitationLoadMatch {
    ref: string;
    style?: string;
}
export interface Embedding {
    dimensions: number;
    embedding: any[];
    id?: string;
    model: string;
    standardReferenceId: string;
}
export interface EmbeddingLoadMatch {
    id: string;
    model?: string;
    $action?: string;
    [action: string]: any;
}
export interface Entity {
    aliases: any[] | null;
    citationCount: number;
    description: string | null;
    id: string;
    language?: string;
    name: string;
    seeAlso: any[] | null;
    sense: string | null;
    type: string;
}
export interface EntityLoadMatch {
    id: string;
}
export interface EntityListMatch {
    lang?: string;
    limit?: number;
    page?: number | null;
    q?: string;
    type?: string;
    $action?: string;
    [action: string]: any;
}
export interface Feedback {
    category: string;
    client?: string;
    contact?: string;
    endpoint?: string;
    message: string;
    pageUrl?: string;
    ref?: string;
    requestId?: string;
}
export interface FeedbackCreateData {
    category: string;
    client?: string;
    contact?: string;
    endpoint?: string;
    message: string;
    pageUrl?: string;
    ref?: string;
    requestId?: string;
}
export interface Language {
    code: string;
    entityCount: number;
    name: string;
    paragraphCount: number;
}
export interface LanguageListMatch {
    code?: string;
    entityCount?: number;
    name?: string;
    paragraphCount?: number;
}
export interface Ogn {
}
export interface OgnLoadMatch {
    ref: string;
    theme?: string;
}
export interface Paper {
    id: string;
    labels: any[] | null;
    paper: Record<string, any>;
    paragraphs: any[];
    partId: string;
    sortId: string;
    title: string;
    topEntities?: any[];
    video: Record<string, any> | null;
}
export interface PaperLoadMatch {
    id: string;
    format?: string;
    include?: string;
    lang?: string;
}
export interface PaperListMatch {
    format?: string;
    include?: string;
    lang?: string;
    $action?: string;
    [action: string]: any;
}
export interface Paragraph {
    data: Record<string, any>;
    id?: string;
    navigation: Record<string, any>;
}
export interface ParagraphLoadMatch {
    id: string;
    format?: string;
    include?: string;
    lang?: string;
    $action?: string;
    [action: string]: any;
}
export interface Quote {
}
export interface QuoteCreateData {
    ref?: any;
    text?: any;
    $action?: string;
    [action: string]: any;
}
export interface Scripture {
    chunk: Record<string, any>;
    closest: any[];
    consensus: number;
    corpus: Record<string, any>;
    data: any[];
    distance: number;
    divisionLabel: string;
    divisions: any[];
    gap: number;
    id: string;
    license: string;
    limit?: number;
    meta: Record<string, any>;
    notes: string | null;
    page?: number;
    pages: any[];
    paragraph: Record<string, any>;
    passage: Record<string, any>;
    passageCount: number;
    passages: any[];
    percentile: number;
    q: string;
    refLevels: number;
    refPrefix: string;
    religion: string;
    similarity: number;
    similaritySmall: number;
    slug: string;
    sourceUrl: string;
    textsClose: number;
    title: string;
    translator: string;
    unitLabel: string;
    urantiaParallelLimit?: number;
    urantiaParallels: any[];
    urantiaSection: string | null;
    year: number;
}
export interface ScriptureLoadMatch {
    id: string;
}
export interface ScriptureListMatch {
    chunk?: Record<string, any>;
    closest?: any[];
    consensus?: number;
    corpus?: Record<string, any>;
    data?: any[];
    distance?: number;
    divisionLabel?: string;
    divisions?: any[];
    gap?: number;
    id?: string;
    license?: string;
    limit?: number;
    meta?: Record<string, any>;
    notes?: string | null;
    page?: number;
    pages?: any[];
    paragraph?: Record<string, any>;
    passage?: Record<string, any>;
    passageCount?: number;
    passages?: any[];
    percentile?: number;
    q?: string;
    refLevels?: number;
    refPrefix?: string;
    religion?: string;
    similarity?: number;
    similaritySmall?: number;
    slug?: string;
    sourceUrl?: string;
    textsClose?: number;
    title?: string;
    translator?: string;
    unitLabel?: string;
    urantiaParallelLimit?: number;
    urantiaParallels?: any[];
    urantiaSection?: string | null;
    year?: number;
}
export interface ScriptureCreateData {
    corpus?: Record<string, any>;
    limit?: number;
    page?: number;
    q: string;
    urantiaParallelLimit?: number;
}
export interface Search {
    audio: Record<string, any> | null;
    bibleParallels?: any[];
    data: any[];
    entities?: any[];
    htmlText: string;
    id: string;
    include?: string;
    labels: any[] | null;
    language?: string;
    limit?: number;
    match: string;
    meta: Record<string, any>;
    page?: number;
    paperId?: string;
    paperTitle: string;
    paragraphId: string;
    partId?: string;
    q: string;
    rank: number;
    scriptureParallels?: any[];
    scriptureScores: Record<string, any> | null;
    sectionId: string | null;
    sectionTitle: string | null;
    sortId: string;
    standardReferenceId: string;
    text: string;
    translation: Record<string, any>;
    type?: string;
    urantiaParallels?: any[];
}
export interface SearchListMatch {
    include?: string;
    limit?: number;
    page?: number | null;
    paper_id?: string;
    part_id?: string;
    q: string;
    type?: string;
    $action?: string;
    [action: string]: any;
}
export interface SearchCreateData {
    include?: string;
    limit?: number;
    page?: number;
    paperId?: string;
    partId?: string;
    q: string;
    type?: string;
    $action?: string;
    [action: string]: any;
}
export interface TableOfContent {
    parts: any[];
}
export interface TableOfContentLoadMatch {
    lang?: string;
}
export interface Tool {
}
export interface ToolListMatch {
    $action?: string;
    [action: string]: any;
}
export interface Work {
    data: any[];
    id: string;
    kind: string;
    limit?: number;
    match?: string;
    meta: Record<string, any>;
    page?: number;
    q: string;
    refPrefix: string | null;
    reference: string;
    religion: string;
    similarity?: number;
    strength?: string;
    summary: string;
    text: string;
    title: string;
    tradition: string;
    translator: string;
    unitLabel: string;
    units: number;
    urantiaParallelLimit?: number;
    urantiaParallels: any[];
    urantiaSection: string | null;
    url: string | null;
    work?: string;
    year: number | null;
}
export interface WorkLoadMatch {
    ref: string;
    work: string;
    $action?: string;
    [action: string]: any;
}
export interface WorkListMatch {
    data?: any[];
    id?: string;
    kind?: string;
    limit?: number;
    match?: string;
    meta?: Record<string, any>;
    page?: number;
    q?: string;
    refPrefix?: string | null;
    reference?: string;
    religion?: string;
    similarity?: number;
    strength?: string;
    summary?: string;
    text?: string;
    title?: string;
    tradition?: string;
    translator?: string;
    unitLabel?: string;
    units?: number;
    urantiaParallelLimit?: number;
    urantiaParallels?: any[];
    urantiaSection?: string | null;
    url?: string | null;
    work?: string;
    year?: number | null;
    $action?: string;
    [action: string]: any;
}
export interface WorkCreateData {
    limit?: number;
    page?: number;
    q: string;
    urantiaParallelLimit?: number;
    work?: string;
    $action?: string;
    [action: string]: any;
}

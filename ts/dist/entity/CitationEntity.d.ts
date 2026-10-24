import { UrantiaPapersEntityBase } from '../UrantiaPapersEntityBase';
import type { UrantiaPapersSDK } from '../UrantiaPapersSDK';
import type { Control } from '../types';
import type { Citation, CitationLoadMatch } from '../UrantiaPapersTypes';
declare class CitationEntity extends UrantiaPapersEntityBase<Citation> {
    constructor(client: UrantiaPapersSDK, entopts: any);
    make(this: CitationEntity): CitationEntity;
    load(this: any, reqmatch?: CitationLoadMatch, ctrl?: Control): Promise<CitationEntity>;
}
export { CitationEntity };

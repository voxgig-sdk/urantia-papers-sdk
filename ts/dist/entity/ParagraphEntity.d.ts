import { UrantiaPapersEntityBase } from '../UrantiaPapersEntityBase';
import type { UrantiaPapersSDK } from '../UrantiaPapersSDK';
import type { Control } from '../types';
import type { Paragraph, ParagraphLoadMatch } from '../UrantiaPapersTypes';
declare class ParagraphEntity extends UrantiaPapersEntityBase<Paragraph> {
    constructor(client: UrantiaPapersSDK, entopts: any);
    make(this: ParagraphEntity): ParagraphEntity;
    load(this: any, reqmatch?: ParagraphLoadMatch, ctrl?: Control): Promise<ParagraphEntity>;
}
export { ParagraphEntity };

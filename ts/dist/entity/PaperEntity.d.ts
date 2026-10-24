import { UrantiaPapersEntityBase } from '../UrantiaPapersEntityBase';
import type { UrantiaPapersSDK } from '../UrantiaPapersSDK';
import type { Control } from '../types';
import type { Paper, PaperLoadMatch, PaperListMatch } from '../UrantiaPapersTypes';
declare class PaperEntity extends UrantiaPapersEntityBase<Paper> {
    constructor(client: UrantiaPapersSDK, entopts: any);
    make(this: PaperEntity): PaperEntity;
    load(this: any, reqmatch?: PaperLoadMatch, ctrl?: Control): Promise<PaperEntity>;
    list(this: any, reqmatch?: PaperListMatch, ctrl?: Control): Promise<PaperEntity[]>;
}
export { PaperEntity };

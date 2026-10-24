import { UrantiaPapersEntityBase } from '../UrantiaPapersEntityBase';
import type { UrantiaPapersSDK } from '../UrantiaPapersSDK';
import type { Control } from '../types';
import type { Bible, BibleLoadMatch, BibleListMatch, BibleCreateData } from '../UrantiaPapersTypes';
declare class BibleEntity extends UrantiaPapersEntityBase<Bible> {
    constructor(client: UrantiaPapersSDK, entopts: any);
    make(this: BibleEntity): BibleEntity;
    load(this: any, reqmatch?: BibleLoadMatch, ctrl?: Control): Promise<BibleEntity>;
    list(this: any, reqmatch?: BibleListMatch, ctrl?: Control): Promise<BibleEntity[]>;
    create(this: any, reqdata?: BibleCreateData, ctrl?: Control): Promise<BibleEntity>;
}
export { BibleEntity };

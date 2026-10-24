import { UrantiaPapersEntityBase } from '../UrantiaPapersEntityBase';
import type { UrantiaPapersSDK } from '../UrantiaPapersSDK';
import type { Control } from '../types';
import type { Ogn, OgnLoadMatch } from '../UrantiaPapersTypes';
declare class OgnEntity extends UrantiaPapersEntityBase<Ogn> {
    constructor(client: UrantiaPapersSDK, entopts: any);
    make(this: OgnEntity): OgnEntity;
    load(this: any, reqmatch?: OgnLoadMatch, ctrl?: Control): Promise<OgnEntity>;
}
export { OgnEntity };

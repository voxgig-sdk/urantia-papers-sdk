import { UrantiaPapersEntityBase } from '../UrantiaPapersEntityBase';
import type { UrantiaPapersSDK } from '../UrantiaPapersSDK';
import type { Control } from '../types';
import type { Work, WorkLoadMatch, WorkListMatch, WorkCreateData } from '../UrantiaPapersTypes';
declare class WorkEntity extends UrantiaPapersEntityBase<Work> {
    constructor(client: UrantiaPapersSDK, entopts: any);
    make(this: WorkEntity): WorkEntity;
    load(this: any, reqmatch?: WorkLoadMatch, ctrl?: Control): Promise<WorkEntity>;
    list(this: any, reqmatch?: WorkListMatch, ctrl?: Control): Promise<WorkEntity[]>;
    create(this: any, reqdata?: WorkCreateData, ctrl?: Control): Promise<WorkEntity>;
}
export { WorkEntity };

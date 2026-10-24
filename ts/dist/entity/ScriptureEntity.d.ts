import { UrantiaPapersEntityBase } from '../UrantiaPapersEntityBase';
import type { UrantiaPapersSDK } from '../UrantiaPapersSDK';
import type { Control } from '../types';
import type { Scripture, ScriptureLoadMatch, ScriptureListMatch, ScriptureCreateData } from '../UrantiaPapersTypes';
declare class ScriptureEntity extends UrantiaPapersEntityBase<Scripture> {
    constructor(client: UrantiaPapersSDK, entopts: any);
    make(this: ScriptureEntity): ScriptureEntity;
    load(this: any, reqmatch?: ScriptureLoadMatch, ctrl?: Control): Promise<ScriptureEntity>;
    list(this: any, reqmatch?: ScriptureListMatch, ctrl?: Control): Promise<ScriptureEntity[]>;
    create(this: any, reqdata?: ScriptureCreateData, ctrl?: Control): Promise<ScriptureEntity>;
}
export { ScriptureEntity };

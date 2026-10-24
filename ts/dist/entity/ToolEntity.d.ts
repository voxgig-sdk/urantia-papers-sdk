import { UrantiaPapersEntityBase } from '../UrantiaPapersEntityBase';
import type { UrantiaPapersSDK } from '../UrantiaPapersSDK';
import type { Control } from '../types';
import type { Tool, ToolListMatch } from '../UrantiaPapersTypes';
declare class ToolEntity extends UrantiaPapersEntityBase<Tool> {
    constructor(client: UrantiaPapersSDK, entopts: any);
    make(this: ToolEntity): ToolEntity;
    list(this: any, reqmatch?: ToolListMatch, ctrl?: Control): Promise<ToolEntity[]>;
}
export { ToolEntity };

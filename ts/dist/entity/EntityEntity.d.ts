import { UrantiaPapersEntityBase } from '../UrantiaPapersEntityBase';
import type { UrantiaPapersSDK } from '../UrantiaPapersSDK';
import type { Control } from '../types';
import type { Entity, EntityLoadMatch, EntityListMatch } from '../UrantiaPapersTypes';
declare class EntityEntity extends UrantiaPapersEntityBase<Entity> {
    constructor(client: UrantiaPapersSDK, entopts: any);
    make(this: EntityEntity): EntityEntity;
    load(this: any, reqmatch?: EntityLoadMatch, ctrl?: Control): Promise<EntityEntity>;
    list(this: any, reqmatch?: EntityListMatch, ctrl?: Control): Promise<EntityEntity[]>;
}
export { EntityEntity };

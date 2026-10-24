import { UrantiaPapersEntityBase } from '../UrantiaPapersEntityBase';
import type { UrantiaPapersSDK } from '../UrantiaPapersSDK';
import type { Control } from '../types';
import type { Search, SearchListMatch, SearchCreateData } from '../UrantiaPapersTypes';
declare class SearchEntity extends UrantiaPapersEntityBase<Search> {
    constructor(client: UrantiaPapersSDK, entopts: any);
    make(this: SearchEntity): SearchEntity;
    list(this: any, reqmatch?: SearchListMatch, ctrl?: Control): Promise<SearchEntity[]>;
    create(this: any, reqdata?: SearchCreateData, ctrl?: Control): Promise<SearchEntity>;
}
export { SearchEntity };

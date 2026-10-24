import { UrantiaPapersEntityBase } from '../UrantiaPapersEntityBase';
import type { UrantiaPapersSDK } from '../UrantiaPapersSDK';
import type { Control } from '../types';
import type { TableOfContent, TableOfContentLoadMatch } from '../UrantiaPapersTypes';
declare class TableOfContentEntity extends UrantiaPapersEntityBase<TableOfContent> {
    constructor(client: UrantiaPapersSDK, entopts: any);
    make(this: TableOfContentEntity): TableOfContentEntity;
    load(this: any, reqmatch?: TableOfContentLoadMatch, ctrl?: Control): Promise<TableOfContentEntity>;
}
export { TableOfContentEntity };

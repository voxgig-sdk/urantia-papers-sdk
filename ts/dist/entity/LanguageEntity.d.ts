import { UrantiaPapersEntityBase } from '../UrantiaPapersEntityBase';
import type { UrantiaPapersSDK } from '../UrantiaPapersSDK';
import type { Control } from '../types';
import type { Language, LanguageListMatch } from '../UrantiaPapersTypes';
declare class LanguageEntity extends UrantiaPapersEntityBase<Language> {
    constructor(client: UrantiaPapersSDK, entopts: any);
    make(this: LanguageEntity): LanguageEntity;
    list(this: any, reqmatch?: LanguageListMatch, ctrl?: Control): Promise<LanguageEntity[]>;
}
export { LanguageEntity };

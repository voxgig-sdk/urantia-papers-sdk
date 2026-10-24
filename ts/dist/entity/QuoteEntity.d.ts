import { UrantiaPapersEntityBase } from '../UrantiaPapersEntityBase';
import type { UrantiaPapersSDK } from '../UrantiaPapersSDK';
import type { Control } from '../types';
import type { Quote, QuoteCreateData } from '../UrantiaPapersTypes';
declare class QuoteEntity extends UrantiaPapersEntityBase<Quote> {
    constructor(client: UrantiaPapersSDK, entopts: any);
    make(this: QuoteEntity): QuoteEntity;
    create(this: any, reqdata?: QuoteCreateData, ctrl?: Control): Promise<QuoteEntity>;
}
export { QuoteEntity };

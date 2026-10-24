import { UrantiaPapersEntityBase } from '../UrantiaPapersEntityBase';
import type { UrantiaPapersSDK } from '../UrantiaPapersSDK';
import type { Control } from '../types';
import type { Feedback, FeedbackCreateData } from '../UrantiaPapersTypes';
declare class FeedbackEntity extends UrantiaPapersEntityBase<Feedback> {
    constructor(client: UrantiaPapersSDK, entopts: any);
    make(this: FeedbackEntity): FeedbackEntity;
    create(this: any, reqdata?: FeedbackCreateData, ctrl?: Control): Promise<FeedbackEntity>;
}
export { FeedbackEntity };

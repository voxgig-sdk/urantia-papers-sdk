import { UrantiaPapersEntityBase } from '../UrantiaPapersEntityBase';
import type { UrantiaPapersSDK } from '../UrantiaPapersSDK';
import type { Control } from '../types';
import type { Embedding, EmbeddingLoadMatch } from '../UrantiaPapersTypes';
declare class EmbeddingEntity extends UrantiaPapersEntityBase<Embedding> {
    constructor(client: UrantiaPapersSDK, entopts: any);
    make(this: EmbeddingEntity): EmbeddingEntity;
    load(this: any, reqmatch?: EmbeddingLoadMatch, ctrl?: Control): Promise<EmbeddingEntity>;
}
export { EmbeddingEntity };

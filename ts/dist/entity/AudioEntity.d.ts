import { UrantiaPapersEntityBase } from '../UrantiaPapersEntityBase';
import type { UrantiaPapersSDK } from '../UrantiaPapersSDK';
import type { Control } from '../types';
import type { Audio, AudioLoadMatch } from '../UrantiaPapersTypes';
declare class AudioEntity extends UrantiaPapersEntityBase<Audio> {
    constructor(client: UrantiaPapersSDK, entopts: any);
    make(this: AudioEntity): AudioEntity;
    load(this: any, reqmatch?: AudioLoadMatch, ctrl?: Control): Promise<AudioEntity>;
}
export { AudioEntity };

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoggingPublisherModel } from './LoggingPublisherModel';

@Injectable()
export class LoggingPublisherService {
    constructor(@Inject('LOG_QUEUE') private client: ClientProxy) { }

    emitLog(data: LoggingPublisherModel) {
        try {
            this.client.emit('logging_event', data);
        } catch (err) {
            console.error('Faled to Send Logging: ', err);
        }
    }

}

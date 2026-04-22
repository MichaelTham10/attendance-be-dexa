import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggingPublisherService } from './loggingpublisher.service';

@Injectable()
export class LoggingInterceptorInterceptor implements NestInterceptor {
  private readonly logPublisher: LoggingPublisherService;
  constructor(logPublisher: LoggingPublisherService) {
    this.logPublisher = logPublisher;
  }
  
  getHandling(req: any) : any {
    if (req.query){
      return req.query;
    }
    return req.params;
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    const http = context.switchToHttp();
    const req = http.getRequest();
    const res = http.getResponse();

    const SERVICE_NAME = 'employee_service';
    const start = Date.now();

    return next.handle().pipe(
      tap((data) => {
        this.logPublisher.emitLog({
          ServiceName: SERVICE_NAME,
          Endpoint: req.originalUrl,
          DurationMs: Date.now() - start,
          UsrCrt: 'SYSTEM',
          UsrUpd: 'SYSTEM',
          DtmCrt: new Date(),
          DtmUpd: new Date(),
          ResponseBody: req.method === 'GET' ? data : res?.data,
          StackTrace: null,
          RequestBody: req.body,
          Method: req.method,
          StatusCode: res.statusCode,
          Message: res?.message ?? null,
          RequestParams: req.params ?? null,
          RequestQuery: req.query ?? null,
        });
      }),

      catchError((err) => {
        this.logPublisher.emitLog({
          ServiceName: SERVICE_NAME,
          Endpoint: req.originalUrl,
          DurationMs: Date.now() - start,
          UsrCrt: 'SYSTEM',
          UsrUpd: 'SYSTEM',
          DtmCrt: new Date(),
          DtmUpd: new Date(),
          ResponseBody: err?.response ?? null,
          StackTrace: err?.stack ?? null,
          RequestBody: req.method === 'GET' ? req.query : req.body,
          Method: req.method,
          StatusCode: err.status ?? null,
          Message: err?.message ?? null,
          RequestParams: req.params ?? null,
          RequestQuery: req.query ?? null,
        });
        return throwError(() => err);
      })
    );
  }
}

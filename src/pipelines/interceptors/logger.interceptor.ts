import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap } from 'rxjs';
import { isNothing } from '../../utils';

Injectable();
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(this.constructor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    // レスポンスヘッダーにリクエストIDを付与する
    res.header('x-request-id', req['id']);
    const now = Date.now();

    return next.handle().pipe(
      catchError((err) => {
        // リクエストbodyのパスワードをマスクする
        const reqBody = req.body;
        if (reqBody?.password) {
          reqBody.password = '*****';
        }
        // 例外エラーログ詳細
        const detail = {
          method: req.method,
          url: req.url,
          body: reqBody,
          error: `${err.name}: ${err.message}`,
          'x-request-id': req['id'],
          time: `${Date.now() - now}ms`,
        };
        // 例外エラーログ出力
        if (
          (err.status === HttpStatus.INTERNAL_SERVER_ERROR ||
            isNothing(err.status)) &&
          err.name !== 'Error'
        ) {
          this.logger.fatal(
            `${req.method} ${req.url} detail: ${JSON.stringify(detail)}`,
          );
        } else {
          this.logger.error(
            `${req.method} ${req.url} detail: ${JSON.stringify(detail)}`,
          );
        }
        throw err;
      }),
      tap(() => {
        this.logger.log(
          `${req.method} ${req.url} x-request-id: ${req['id']} ${Date.now() - now}ms`,
        );
      }),
    );
  }
}

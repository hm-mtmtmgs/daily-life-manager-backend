import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap } from 'rxjs';

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
        // 例外エラーをログ出力
        this.logger.error(
          `${req.method} ${req.url} ${err.name}: ${err.message} body: ${JSON.stringify(reqBody)} x-request-id: ${req['id']} ${Date.now() - now}ms`,
        );
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

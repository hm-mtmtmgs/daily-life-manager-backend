import {
  Injectable,
  Logger,
  NestMiddleware,
  ServiceUnavailableException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

Injectable();
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(this.constructor.name);

  use(req: Request, res: Response, next: NextFunction) {
    // メンテナンスモードの場合は503を返す
    if (process.env.MAINTENANCE_MODE === '1') {
      throw new ServiceUnavailableException();
    }
    // リクエストIDを付与する
    const requestId = uuidv4();
    req.headers['x-request-id'] = requestId;
    req['requestId'] = requestId;

    next();
    this.logger.log(`${req.method} ${req.url} x-request-id: ${requestId}`);
  }
}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from '../db/data-source';
import { LoggerMiddleware } from '../pipelines/middlewares';
import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSource.options), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

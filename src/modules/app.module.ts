import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, UserModule } from '.';
import { dataSource } from '../db/data_source';
import { LoggerMiddleware } from '../pipelines/middlewares';

@Module({
  imports: [TypeOrmModule.forRoot(dataSource.options), AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

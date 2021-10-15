import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormconfig from './ormconfig';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from 'nestjs-http-promise';
import { ReceptionModule } from './reception/reception.module';
import { ReceptionService } from './reception/reception.service';
import { WebapiModule } from './webapi/webapi.module';
import { WebapiService } from './webapi/webapi.service';
import { EmailModule } from './email/email.module';

@Module({
  imports: [ ConfigModule.forRoot({
      envFilePath: '.env'
    }),
  TypeOrmModule.forRoot(ormconfig), HttpModule,  ReceptionModule, WebapiModule, EmailModule],
  controllers: [AppController],
  providers: [AppService, ReceptionService, WebapiService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';
import { HttpModule } from 'nestjs-http-promise'
import { KafkaTonController } from './kafka-ton/kafka-ton.controller';
import { KafkaTonModule } from './kafka-ton/kafka-ton.module';
import { KafkaTonService } from './kafka-ton/kafka-ton.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [  TypeOrmModule.forRoot(ormconfig), HttpModule,  KafkaTonModule, ScheduleModule.forRoot()],
  controllers: [AppController, KafkaTonController],
  providers: [AppService,  KafkaTonService],
})
export class AppModule {}

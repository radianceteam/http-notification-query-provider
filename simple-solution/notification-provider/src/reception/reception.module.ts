import { Module } from '@nestjs/common';
import { ReceptionService } from './reception.service';
import { ReceptionController } from './reception.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from '@app/subscription/dto/subsciption.entity';
import { EmailModule } from '@app/email/email.module';
import { HttpModule } from 'nestjs-http-promise';
import { MessageEntity } from '@app/webapi/dto/msg.entity';

@Module({
  imports: [HttpModule, EmailModule,
  TypeOrmModule.forFeature([SubscriptionEntity]),TypeOrmModule.forFeature([MessageEntity]),],
  providers: [ReceptionService],
  controllers: [ReceptionController],
  exports: [TypeOrmModule,]
})
export class ReceptionModule {}

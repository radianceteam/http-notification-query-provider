import { Module } from '@nestjs/common';
import { WebapiService } from './webapi.service';
import { WebapiController } from './webapi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from '@app/subscription/dto/subsciption.entity';

@Module({
  imports: [
TypeOrmModule.forFeature([SubscriptionEntity]),
],
  providers: [WebapiService],
  controllers: [WebapiController],
  exports: [TypeOrmModule,]
})
export class WebapiModule {}

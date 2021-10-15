import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from './dto/subsciption.entity';
import { SubscribeDto } from './dto/subscription.dto';

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectRepository(SubscriptionEntity)
        private readonly subscriptionRepository: Repository<SubscriptionEntity>,

        ) {}

    async createSubscription(userToken: SubscribeDto): Promise<SubscriptionEntity>{

        const subscribe = new SubscriptionEntity();
        Object.assign(subscribe, userToken);

        return await this.subscriptionRepository.save(subscribe)
    }


}

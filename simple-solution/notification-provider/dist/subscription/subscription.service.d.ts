import { Repository } from 'typeorm';
import { SubscriptionEntity } from './dto/subsciption.entity';
import { SubscribeDto } from './dto/subscription.dto';
export declare class SubscriptionService {
    private readonly subscriptionRepository;
    constructor(subscriptionRepository: Repository<SubscriptionEntity>);
    createSubscription(userToken: SubscribeDto): Promise<SubscriptionEntity>;
}

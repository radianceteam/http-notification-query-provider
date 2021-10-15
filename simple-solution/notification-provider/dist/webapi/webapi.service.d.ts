import { SubscriptionEntity } from '@app/subscription/dto/subsciption.entity';
import { Repository } from 'typeorm';
export declare class WebapiService {
    private readonly subscriptionRepository;
    constructor(subscriptionRepository: Repository<SubscriptionEntity>);
    createSubscription(currentUser: any): Promise<any>;
}

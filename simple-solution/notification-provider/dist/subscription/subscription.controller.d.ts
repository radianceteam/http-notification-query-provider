import { SubscribeDto } from './dto/subscription.dto';
import { SubscriptionService } from './subscription.service';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    create(currentUser: SubscribeDto): Promise<import("./dto/subsciption.entity").SubscriptionEntity>;
}

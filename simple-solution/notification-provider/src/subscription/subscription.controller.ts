import { Body, Controller, Post } from '@nestjs/common';
import { SubscribeDto } from './dto/subscription.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService){}

    @Post('add')
    async create(@Body()currentUser: SubscribeDto){
        return this.subscriptionService.createSubscription(currentUser);
    }
}

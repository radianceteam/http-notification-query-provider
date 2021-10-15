import EmailService from '@app/email/email.service';
import { SubscriptionEntity } from '@app/subscription/dto/subsciption.entity';
import { Repository } from 'typeorm';
import { MessageQueryDto } from './dto/message-query.dto';
export declare class ReceptionService {
    private readonly emailService;
    private readonly subscriptionRepository;
    constructor(emailService: EmailService, subscriptionRepository: Repository<SubscriptionEntity>);
    saveToDBandSend(msg: MessageQueryDto): Promise<SubscriptionEntity>;
    sendClient(UserNewMes: any): Promise<any>;
}

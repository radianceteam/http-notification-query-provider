import { MessageEntity } from "@app/webapi/dto/msg.entity";
export declare class SubscriptionEntity {
    id: number;
    hash: string;
    data: string;
    token: string;
    message: MessageEntity[];
}

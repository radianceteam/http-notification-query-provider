import { SubscriptionEntity } from "@app/subscription/dto/subsciption.entity";
export declare class MessageEntity {
    id: number;
    hash: string;
    nonce: string;
    message: string;
    subscribe: SubscriptionEntity;
}

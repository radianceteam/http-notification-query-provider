import { SubscriptionEntity } from "@app/subscription/dto/subsciption.entity";
export declare class UserEntity {
    id: number;
    valid: boolean;
    email: string;
    token: string;
    subscribe: SubscriptionEntity[];
}

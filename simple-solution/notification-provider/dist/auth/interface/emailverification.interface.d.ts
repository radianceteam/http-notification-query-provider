import { UserEntity } from "@app/users/dto/user.entity";
export interface EmailVerification extends UserEntity {
    email: string;
    emailToken: string;
    timestamp: Date;
}

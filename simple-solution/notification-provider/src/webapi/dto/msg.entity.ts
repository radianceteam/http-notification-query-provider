import { SubscriptionEntity } from "@app/subscription/dto/subsciption.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'message'})
export class MessageEntity {

    @ApiProperty({example: '1', description: 'Unique Id'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'hash', description: 'Hash user provaider'})
    @Column()
    hash: string;

    @ApiProperty({example: 'nonce', description: 'Client nonce'})
    @Column()
    nonce: string;

    @ApiProperty({example: 'message', description: 'Client Message'})
    @Column()
    message: string;


    @ApiProperty({example: 'key', description: 'Client key'})
    @Column()
    key: string;


    @ApiProperty({example: 'false', description: 'Confirm message'})
    @Column({ default: false })
    valid: boolean;

    @ManyToOne(() => SubscriptionEntity, (subscribe) => subscribe.messages)
    subscribe: SubscriptionEntity;

}
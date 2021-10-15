import { MessageEntity } from "@app/webapi/dto/msg.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'subscription'})
export class SubscriptionEntity{
    @ApiProperty({example: '1', description: 'Unique Id'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Hash', description: 'Subscription parametr'})
    @Column({  nullable: true })
    hash: string;

    @ApiProperty({example: 'data User', description: 'data User'})
    @Column({  nullable: true })
    endpoint: string

    @ApiProperty({example: 'token User', description: 'token User'})
    @Column({  nullable: true })
    token: string;

    @OneToMany(() => MessageEntity, (message) => message.subscribe)
    messages: MessageEntity[];

}
import EmailService from '@app/email/email.service';
import { SubscriptionEntity } from '@app/subscription/dto/subsciption.entity';
import { MessageEntity } from '@app/webapi/dto/msg.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from 'nestjs-http-promise';
import { Repository } from 'typeorm';
import { MessageQueryDto } from './dto/message-query.dto';

@Injectable()
export class ReceptionService {
    constructor(
        private readonly httpService: HttpService,
        private readonly emailService: EmailService,
        @InjectRepository(SubscriptionEntity)
        private readonly subscriptionRepository: Repository<SubscriptionEntity>,
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>,
        ) {}

        async saveToDBandSend(msg: MessageQueryDto): Promise<any>{
            const subscribeToDB = await this.subscriptionRepository.findOne({ hash: msg.hash})
            if(!subscribeToDB){
                throw new HttpException('Token is not', HttpStatus.NOT_FOUND)
            }
            const base64ToUtf8 = (b) => Buffer.from(b, 'base64').toString('utf8')

            const newMessage = new MessageEntity();
            Object.assign(newMessage, msg);
            newMessage.subscribe = subscribeToDB
            //console.log(newMessage)

            await this.messageRepository.save(newMessage);
            this.sendClient({
                data: base64ToUtf8(subscribeToDB.endpoint),
                nonce: msg.nonce,
                encodedMessage: msg.message,
                key: msg.key
            })

            console.log(base64ToUtf8(subscribeToDB.endpoint))
        }

        async sendClient(UserNewMes): Promise<any>  {
            console.log(UserNewMes)
            const data2 = await this.httpService.post( UserNewMes.data, {nonce: UserNewMes.nonce, encodedMessage: UserNewMes.encodedMessage});
            this.validMessage(UserNewMes.key, data2.status)
            return data2
        }

        private async validMessage(msg, status) {
            // if(status >= 200 || 299 ){
            //     const validMassage = await this.messageRepository.findOne({ key: msg.key})
            //     validMassage.valid = true
            //     return await this.messageRepository.save(validMassage)
            //     }
            console.log(status)
            }

}

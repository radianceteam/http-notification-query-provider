import { SubscriptionEntity } from '@app/subscription/dto/subsciption.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscribeDB } from './types/subscribe.interface';

@Injectable()
export class WebapiService {
    constructor(
        @InjectRepository(SubscriptionEntity)
        private readonly subscriptionRepository: Repository<SubscriptionEntity>,
        ) {}

    async createSubscription(currentUser): Promise<any>{

        const rand = ()=>Math.random().toString(36).substr(2);
        const token = (length)=>(rand()+rand()+rand()+rand()).substr(0,length);
        const userToken = token(12)

        const data = currentUser.data
        const subscribeToBD = await this.subscriptionRepository.findOne({ hash: currentUser.hash})

        let subscribe: SubscribeDB = {hash: currentUser.hash, endpoint: data, token: userToken}
 

        if(subscribeToBD){ 

            subscribe.id = subscribeToBD.id
            console.log(subscribe)
            await this.subscriptionRepository.save(subscribe)
            return "You token " + userToken + " \r\nadd txt token record to domain. \r\nMore info https://www.reg.ru/nettools/dig"
        }

        // const userEntity = await this.UserRepository.save(token)
        // console.log(base64ToUtf8(currentUser.data))
        await this.subscriptionRepository.save(subscribe)
        return "You token " + userToken + " \r\nadd txt token record to domain. \r\nMore info https://www.reg.ru/nettools/dig"
    }

    async checkDomen(host) {
        const {Resolver} = require('dns');
        const dns = new Resolver();
        console.log(host)
        const re = await dns.resolveTxt(host, (err: any, res: any) => {
            if (err) {
              console.log(err);
              // rrr = err
            } else {
               console.log("check it",res[0]);

              res.map((item: any) => {

                  return !!item[0].match("_globalsign-domain-verification=GVnLvxXIVPI0NV1BiX2RgyhBcoUmQH1JggdIvsXJ1c");

                }
              )

            }

          }
        );
        return re
    }
}

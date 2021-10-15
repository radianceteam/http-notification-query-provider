import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { WebapiService } from './webapi.service';

@Controller()
export class WebapiController {

    constructor(private readonly WebapiService: WebapiService){}

    @Post()
    @HttpCode(200)
    async create(@Body()currentUser){
        console.log(currentUser)
        return this.WebapiService.createSubscription(currentUser);
    }
    @Post('test')
    async test(@Body()host){
        console.log(host)
        return this.WebapiService.checkDomen(host.test);
    }
}

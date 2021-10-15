import { Body, Controller, Post } from '@nestjs/common';
import { ReceptionService } from './reception.service';

@Controller()
export class ReceptionController {
    constructor( private readonly receptionService: ReceptionService,
        ){}

        @Post('query/msg')
        async login(@Body() msg):
        Promise<any> {
            const user = await this.receptionService.saveToDBandSend(msg);
            return
        }

}

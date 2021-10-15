import { ReceptionService } from './reception.service';
export declare class ReceptionController {
    private readonly receptionService;
    constructor(receptionService: ReceptionService);
    login(msg: any): Promise<any>;
}

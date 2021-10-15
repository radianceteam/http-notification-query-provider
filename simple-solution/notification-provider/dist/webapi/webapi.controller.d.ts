import { WebapiService } from './webapi.service';
export declare class WebapiController {
    private readonly WebapiService;
    constructor(WebapiService: WebapiService);
    create(currentUser: any): Promise<any>;
    test(): Promise<string>;
}

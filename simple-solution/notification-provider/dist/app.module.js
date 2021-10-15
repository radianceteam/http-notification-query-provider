"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const ormconfig_1 = require("./ormconfig");
const config_1 = require("@nestjs/config");
const nestjs_http_promise_1 = require("nestjs-http-promise");
const reception_module_1 = require("./reception/reception.module");
const reception_service_1 = require("./reception/reception.service");
const webapi_module_1 = require("./webapi/webapi.module");
const webapi_service_1 = require("./webapi/webapi.service");
const email_module_1 = require("./email/email.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({
                envFilePath: '.env'
            }),
            typeorm_1.TypeOrmModule.forRoot(ormconfig_1.default), nestjs_http_promise_1.HttpModule, reception_module_1.ReceptionModule, webapi_module_1.WebapiModule, email_module_1.EmailModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, reception_service_1.ReceptionService, webapi_service_1.WebapiService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebapiModule = void 0;
const common_1 = require("@nestjs/common");
const webapi_service_1 = require("./webapi.service");
const webapi_controller_1 = require("./webapi.controller");
const typeorm_1 = require("@nestjs/typeorm");
const subsciption_entity_1 = require("../subscription/dto/subsciption.entity");
let WebapiModule = class WebapiModule {
};
WebapiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([subsciption_entity_1.SubscriptionEntity]),
        ],
        providers: [webapi_service_1.WebapiService],
        controllers: [webapi_controller_1.WebapiController],
        exports: [typeorm_1.TypeOrmModule,]
    })
], WebapiModule);
exports.WebapiModule = WebapiModule;
//# sourceMappingURL=webapi.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionModule = void 0;
const common_1 = require("@nestjs/common");
const subscription_service_1 = require("./subscription.service");
const subscription_controller_1 = require("./subscription.controller");
const typeorm_1 = require("@nestjs/typeorm");
const subsciption_entity_1 = require("./dto/subsciption.entity");
let SubscriptionModule = class SubscriptionModule {
};
SubscriptionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([subsciption_entity_1.SubscriptionEntity])],
        providers: [subscription_service_1.SubscriptionService],
        controllers: [subscription_controller_1.SubscriptionController]
    })
], SubscriptionModule);
exports.SubscriptionModule = SubscriptionModule;
//# sourceMappingURL=subscription.module.js.map
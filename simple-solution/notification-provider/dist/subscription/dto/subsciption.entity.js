"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionEntity = void 0;
const msg_entity_1 = require("../../webapi/dto/msg.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let SubscriptionEntity = class SubscriptionEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Unique Id' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SubscriptionEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hash', description: 'Subscription parametr' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubscriptionEntity.prototype, "hash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'data User', description: 'data User' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubscriptionEntity.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'token User', description: 'token User' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubscriptionEntity.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => msg_entity_1.MessageEntity, message => message.subscribe),
    __metadata("design:type", Array)
], SubscriptionEntity.prototype, "message", void 0);
SubscriptionEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'subscription' })
], SubscriptionEntity);
exports.SubscriptionEntity = SubscriptionEntity;
//# sourceMappingURL=subsciption.entity.js.map
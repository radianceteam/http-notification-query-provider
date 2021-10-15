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
exports.MessageEntity = void 0;
const subsciption_entity_1 = require("../../subscription/dto/subsciption.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let MessageEntity = class MessageEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Unique Id' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MessageEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'hash', description: 'Hash user provaider' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MessageEntity.prototype, "hash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'nonce', description: 'Client nonce' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MessageEntity.prototype, "nonce", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'message', description: 'Client Message' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MessageEntity.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subsciption_entity_1.SubscriptionEntity, subscribe => subscribe.message),
    __metadata("design:type", subsciption_entity_1.SubscriptionEntity)
], MessageEntity.prototype, "subscribe", void 0);
MessageEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'message' })
], MessageEntity);
exports.MessageEntity = MessageEntity;
//# sourceMappingURL=msg.entity.js.map
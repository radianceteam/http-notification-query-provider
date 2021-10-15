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
exports.SubscribeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SubscribeDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'token', description: 'validate token' }),
    __metadata("design:type", String)
], SubscribeDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'parametr', description: 'Free Ton parametr parametr' }),
    __metadata("design:type", String)
], SubscribeDto.prototype, "parametr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'wallet', description: 'wallet Free Tom subscribe' }),
    __metadata("design:type", String)
], SubscribeDto.prototype, "wallet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'email', description: 'metod subscribe service' }),
    __metadata("design:type", String)
], SubscribeDto.prototype, "metod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'sendto', description: 'Send to metod adres' }),
    __metadata("design:type", String)
], SubscribeDto.prototype, "sendto", void 0);
exports.SubscribeDto = SubscribeDto;
//# sourceMappingURL=subscription.dto.js.map
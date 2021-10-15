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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceptionService = void 0;
const email_service_1 = require("../email/email.service");
const subsciption_entity_1 = require("../subscription/dto/subsciption.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ReceptionService = class ReceptionService {
    constructor(emailService, subscriptionRepository) {
        this.emailService = emailService;
        this.subscriptionRepository = subscriptionRepository;
    }
    async saveToDBandSend(msg) {
        const subscribeToDB = await this.subscriptionRepository.findOne({ hash: msg.hash });
        if (!subscribeToDB) {
            throw new common_1.HttpException('Token is not', common_1.HttpStatus.NOT_FOUND);
        }
        const base64ToUtf8 = (b) => Buffer.from(b, 'base64').toString('utf8');
        this.sendClient({
            email: base64ToUtf8(subscribeToDB.data),
            msg: msg.nonce + msg.message
        });
        console.log(base64ToUtf8(subscribeToDB.data));
        return;
    }
    async sendClient(UserNewMes) {
        this.emailService.sendMail({
            from: '<sergeygitte@gmail.com>',
            to: UserNewMes.email,
            subject: 'New balance',
            text: 'You mesage ' + UserNewMes.msg
        });
        console.log(UserNewMes.email);
        console.log(UserNewMes.msg);
    }
};
ReceptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(subsciption_entity_1.SubscriptionEntity)),
    __metadata("design:paramtypes", [email_service_1.default,
        typeorm_2.Repository])
], ReceptionService);
exports.ReceptionService = ReceptionService;
//# sourceMappingURL=reception.service.js.map
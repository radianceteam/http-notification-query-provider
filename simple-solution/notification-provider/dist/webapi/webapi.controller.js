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
exports.WebapiController = void 0;
const common_1 = require("@nestjs/common");
const webapi_service_1 = require("./webapi.service");
let WebapiController = class WebapiController {
    constructor(WebapiService) {
        this.WebapiService = WebapiService;
    }
    async create(currentUser) {
        console.log(currentUser);
        return this.WebapiService.createSubscription(currentUser);
    }
    async test() {
        return 'hello';
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebapiController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WebapiController.prototype, "test", null);
WebapiController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [webapi_service_1.WebapiService])
], WebapiController);
exports.WebapiController = WebapiController;
//# sourceMappingURL=webapi.controller.js.map
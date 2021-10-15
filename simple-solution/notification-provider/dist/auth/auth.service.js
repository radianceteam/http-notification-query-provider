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
exports.AuthService = void 0;
const email_service_1 = require("../email/email.service");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const login_user_dto_1 = require("../users/dto/login-user.dto");
const user_entity_1 = require("../users/dto/user.entity");
const nestjs_http_promise_1 = require("nestjs-http-promise");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AuthService = class AuthService {
    constructor(httpService, UserRepository, emailService, jwtservice) {
        this.httpService = httpService;
        this.UserRepository = UserRepository;
        this.emailService = emailService;
        this.jwtservice = jwtservice;
    }
    async createUser(CreateUserDto) {
        const userByEmail = await this.UserRepository.findOne({ email: CreateUserDto.email });
        if (userByEmail) {
            throw new common_1.HttpException('Email is registration', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const newUser = new user_entity_1.UserEntity();
        Object.assign(newUser, CreateUserDto);
        const token = this.generateToken(newUser);
        newUser.token = token;
        this.emailService.sendMail({
            from: ' <sergeygitte@gmail.com>',
            to: newUser.email,
            subject: 'Hi',
            text: 'You token ' + token
        });
        return await this.UserRepository.save(newUser);
    }
    generateToken(newUser) {
        const salt = (Math.floor(Math.random() * (9000000)) + 1000000).toString();
        const payload = { email: newUser.email, salt: salt };
        return this.jwtservice.sign(payload);
    }
    async login(loginUserDto) {
        const user = await this.UserRepository.findOne({ token: loginUserDto.token });
        if (!user) {
            throw new common_1.HttpException('Token are token', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        user.valid = true;
        const query = await this.UserRepository.save(user);
        this.userTransform(query);
    }
    userTransform(query) {
        let sub = query.subscribtion;
        const data = {
            "id_provaider": query.id,
            "query": "balance",
            "wallet": query.wallet
        };
        this.sendQuery(data);
    }
    async sendClient(UserNewMes) {
        const user = await this.UserRepository.findOne({ id: UserNewMes.id });
        this.emailService.sendMail({
            from: ' <sergeygitte@gmail.com>',
            to: user.email,
            subject: 'New balance',
            text: 'You balance ' + UserNewMes.balance
        });
        console.log(user.email);
        console.log(UserNewMes.id);
        console.log(UserNewMes.balance);
    }
    async sendQuery(query) {
        const data2 = this.httpService.post('http://178.170.47.43:3000/balance/new', query);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [nestjs_http_promise_1.HttpService,
        typeorm_2.Repository,
        email_service_1.default,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
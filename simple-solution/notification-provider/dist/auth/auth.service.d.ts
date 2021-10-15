import EmailService from "@app/email/email.service";
import { CreateUserDto } from "@app/users/dto/create-user.dto";
import { LoginUserDto } from "@app/users/dto/login-user.dto";
import { UserEntity } from "@app/users/dto/user.entity";
import { HttpService } from 'nestjs-http-promise';
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
export declare class AuthService {
    private readonly httpService;
    private readonly UserRepository;
    private readonly emailService;
    private jwtservice;
    constructor(httpService: HttpService, UserRepository: Repository<UserEntity>, emailService: EmailService, jwtservice: JwtService);
    createUser(CreateUserDto: CreateUserDto): Promise<UserEntity>;
    generateToken(newUser: CreateUserDto): string;
    login(loginUserDto: LoginUserDto): Promise<void>;
    private userTransform;
    sendClient(UserNewMes: any): Promise<any>;
    sendQuery(query: any): Promise<void>;
}

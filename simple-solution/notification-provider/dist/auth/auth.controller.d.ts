import { CreateUserDto } from "@app/users/dto/create-user.dto";
import { LoginUserDto } from "@app/users/dto/login-user.dto";
import { UserEntity } from "@app/users/dto/user.entity";
import { HttpService } from "nestjs-http-promise";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    private readonly httpService;
    constructor(authService: AuthService, httpService: HttpService);
    createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
    login(loginUserDto: LoginUserDto): Promise<LoginUserDto>;
}

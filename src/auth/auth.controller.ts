import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserDto} from "../users/user.dto";
import {UserService} from "../users/user.service";

@Controller("api/v1/auth")
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly userService: UserService) {
    }

    @Post('login')
    async login(@Body() userDto: UserDto) {
        return this.authService.loginAdmin(userDto.userName, userDto.password);
    }

    @Post("register")
    register(@Body() userDto: UserDto) {
        return this.userService.createUser(userDto);
    }
}

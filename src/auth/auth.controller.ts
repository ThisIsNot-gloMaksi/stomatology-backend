import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserDto} from '../users/user.dto';
import {UserService} from "../users/user.service";
import {ApiBody, ApiCreatedResponse, ApiTags} from '@nestjs/swagger';
import {User} from '../users/user.entity';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly userService: UserService) {
    }

    @ApiBody({type: UserDto, description: 'Данные пользователя'})
    @ApiCreatedResponse({description: 'jwt token'})
    @Post('login')
    login(@Body() userDto: UserDto) {
        return this.authService.loginAdmin(userDto.userName, userDto.password);
    }

    @ApiBody({type: UserDto, description: 'Данные пользователя'})
    @ApiCreatedResponse({type: User, description: 'Пользователь'})
    @Post('register')
    register(@Body() userDto: UserDto) {
        return this.userService.createUser(userDto);
    }
}

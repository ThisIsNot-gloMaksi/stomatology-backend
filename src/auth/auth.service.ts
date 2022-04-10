import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from '../users/user.service';
import {User} from '../users/user.entity';
import {JwtService} from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
                private readonly jwtService: JwtService) {
    }

    async loginAdmin(userName: string, password: string): Promise<any> {
        const user: User = await this.userService.getUserByName(userName);
        if (user && user.password == password) {
            return this.login(user);
        } else {
            throw new UnauthorizedException();
        }
    }

    async login(admin: User) {
        const payload = {userId: admin.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

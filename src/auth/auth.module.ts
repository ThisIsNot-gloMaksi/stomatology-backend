import {Module} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserModule} from "../users/user.module";
import {PassportModule} from "@nestjs/passport";
import {AuthController} from "./auth.controller";
import {JwtModule} from "@nestjs/jwt";
import {JWT_CONSTANTS} from "./constants/constants";
import {JwtStrategy} from "./strategy/jwt.strategy";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: JWT_CONSTANTS.secret,
            signOptions: {expiresIn: '1h'},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],

})
export class AuthModule {
}

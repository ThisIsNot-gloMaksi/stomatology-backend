import {Injectable} from '@nestjs/common';
import {User} from './user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserDto} from './user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    }

    async getUserByName(userName: string): Promise<User> {
        return await this.userRepository.findOne({userName: userName});
    }

    async createUser(userDto: UserDto): Promise<User> {
        return await this.userRepository.save(userDto);
    }
}


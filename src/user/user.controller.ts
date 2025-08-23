import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private user: UserService) {}

    @Get()
    getUser() {
        return this.user.getUser();
    }
}

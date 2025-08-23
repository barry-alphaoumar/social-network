import { Body, Controller, Delete, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';


class User {
    email: string;
    password: string;
}

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body() user: User) {

        if (!user) return 'no user';
        if (!user?.password) return 'no password'

        return this.authService.createAccount(user.email, user.password);
    }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/profil')
    findProfil(@Request() req: any) {
        return req.user;
    }
}

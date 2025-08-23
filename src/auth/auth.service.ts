import { Injectable } from '@nestjs/common';
import bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async createAccount(email: string, password: string) {

        const hash = await bcrypt.hash(password, 16);

        const user = await this.prisma.user.create({
            data: {
                email: email,
                password: hash,
            }
        })
        return user;
    }


    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email,
            }
        })
        
        if (!user) return null;
        
        const equal = await bcrypt.compare(password, user.password);
        
        if (!equal) return null;

        return user;
    }

    async login(user: any) {
        const payload = { username: user.emaik, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}

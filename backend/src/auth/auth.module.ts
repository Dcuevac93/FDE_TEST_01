import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from '../users/users.service';
import type { StringValue } from 'ms';

const jwtAccessExpirationRaw = process.env.JWT_ACCESS_EXPIRATION?.trim();
const jwtAccessExpiresIn: number | StringValue = jwtAccessExpirationRaw
  ? /^\d+$/.test(jwtAccessExpirationRaw)
    ? Number.parseInt(jwtAccessExpirationRaw, 10)
    : (jwtAccessExpirationRaw as StringValue)
  : '2h';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: jwtAccessExpiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

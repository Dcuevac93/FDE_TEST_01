import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
    }),
    JwtModule,
    PassportModule,
    AuthModule,
    ProjectsModule,
    UsersModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

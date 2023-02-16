import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './models/user.model';

@Module({
   controllers: [UsersController],
   providers: [UsersService],
   imports: [
      SequelizeModule.forFeature([User]),
   ],
   exports: [
      UsersService
   ]
})
export class UsersModule {}
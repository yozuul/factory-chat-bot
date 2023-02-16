import { Controller, OnModuleInit } from '@nestjs/common';
import {UsersService} from './users.service';

@Controller('users')
export class UsersController implements OnModuleInit {
   constructor(
      private userService: UsersService
   ) {}
   async onModuleInit() {
      const admins = await this.userService.getAllAdmin()
      if(admins.length === 0) {
         this.userService.addAdmin(1884297416)
      }
   }
}

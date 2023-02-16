import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import {User} from './models/user.model';

@Injectable()
export class UsersService {
   constructor(
      @InjectModel(User)
      private userRepository: typeof User,
   ) {}
   async getAllAdmin() {
      return this.userRepository.findAll({
         where: { role: 'admin' }
      })
   }
   async findById(id) {
      return this.userRepository.findOne({
         where: { tgId: id }
      })
   }
   async authUser(phone, tgId) {
      const isUserExist = await this.userRepository.findOne({
         where: { phone: phone }
      })
      if(!isUserExist) {
         return false
      } else {
         isUserExist.tgId = tgId
         await isUserExist.save()
         return isUserExist
      }
   }
   async getUser() {
      return this.userRepository.findOne({
         where: { role: 'user' }
      })
   }
   async addAdmin(userId) {
      console.log(userId)
      const dto = { userId: userId, role: 'admin'}
      this.userRepository.create({ tgId: userId, role: 'admin'})
   }
   async adduserPhone(phone) {
      await this.userRepository.destroy({
         where: { role: 'user' }
      })
      await this.userRepository.create({ phone: phone, role: 'user'})
   }
}


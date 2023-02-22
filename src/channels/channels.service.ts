import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

import { Context } from '../bot/context.interface';
import { Channel } from './models/channel.model';
import { SubscribesService } from 'src/subscribes/subscribes.service';
import { FilesService } from 'src/files/files.service';
import { AreasService } from 'src/areas/areas.service';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class ChannelService {
   constructor(
      @InjectBot()
      private readonly bot: Telegraf<Context>,
      @InjectModel(Channel)
      private channelRepository: typeof Channel,
      private subscribeService: SubscribesService,
      private fileService: FilesService,
      private areaService: AreasService,
      private userService: UsersService
      // private parserService: ParserService
   ) {}
   async check() {
      const channels = await this.getAllChannels()
      const admins = await this.userService.getAllAdmin()
      for (let channel of channels) {
         const subscribes = await this.subscribeService.findByChannel(channel.id)
         for (let subscribe of subscribes) {
            const file = await this.fileService.getByAreaId(subscribe.areaId)
            const area = await this.areaService.findById(subscribe.areaId)
            try {
               if(file) {
                  await this.bot.telegram.sendDocument(channel.tgId, file.tgId, {
                     caption: `Отчёт участка "${area.name}"`,
                  })
               } else {
                  await this.bot.telegram.sendMessage(channel.tgId, `Отчёт участка "${area.name}" не был загружен`)
               }
            } catch (error) {
               console.log(channel.tgId)
               admins.map(async (user) => {
                  await this.bot.telegram.sendMessage(user.tgId, `Удалите и добавьте бота в канал "${channel.name}" повторно`)
               })
               console.log('Чат удалён или ещё не добавлен')
            }
         }
      }
      await this.fileService.deleteAll()
   }
   async addChannel(dto) {
      const newChannel = await this.channelRepository.create(dto)
      return newChannel.id
   }
   async getAllChannels() {
      return this.channelRepository.findAll({
         order: [['updatedAt', 'DESC']]
      })
   }
   async findById(id) {
      return this.channelRepository.findOne({
         where: { id: id }
      })
   }
   async deleteByTgId(tgId) {
      await this.channelRepository.destroy({
         where: { tgId: tgId }
      })
   }
   async deleteChannel(id) {
      const channel = await this.channelRepository.findOne({
         where: { id: id }
      })
      await this.channelRepository.destroy({
         where: { id: id }
      })
      return channel
   }
   async renameChannel(id, name) {
      await this.channelRepository.update(
         { name: name },
         { where: { id: id }}
      )
   }
}
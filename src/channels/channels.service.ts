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
   async sendMsg(text) {
      try {
         await this.bot.telegram.sendMessage(1884297416, text)
      } catch (error) {
         console.log(error)
         await this.bot.telegram.sendMessage(1884297416, 'JIB<RF')
      }
   }
   async check() {
      const date = new Date()
      console.log('ЧЕК НАЧАЛО', date)
      await this.sendMsg('ЧЕК НАЧАЛО: ' + date)
      const channels = await this.getAllChannels()
      console.log("ПОЛУЧИЛИ КАНАЛЫ", channels)
      const admins = await this.userService.getAllAdmin()
      const files = await this.fileService.getAllFiles()
      await this.fileService.deleteAll()
      for (let channel of channels) {
         console.log('channel.id', channel.id)
         await this.sendMsg('КАНАЛ: ' + channel.id)
         const subscribes = await this.subscribeService.findByChannel(channel.id)
         // console.log('subscribes', subscribes)
         for (let subscribe of subscribes) {
            await this.sendMsg('ПОДПИСКА: ' + subscribe.areaId)
            console.log('ОТПРАВЛЯЕМ', subscribe.areaId)
            const file = files.filter((file) => file.areaId === subscribe.areaId)
            const area = await this.areaService.findById(subscribe.areaId)
            try {
               if(file.length === 1) {
                  await this.bot.telegram.sendDocument(channel.tgId, file[0].tgId, {
                     caption: `Отчёт участка "${area.name}"`,
                  })
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
      console.log('ЗАКНЧИЛИ РАССЫЛКУ', date)
      await this.sendMsg('ЧЕК КОНЕЦ: ' + date)
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
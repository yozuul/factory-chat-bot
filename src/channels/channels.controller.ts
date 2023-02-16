import { Controller, UnauthorizedException, Req, OnModuleInit } from '@nestjs/common';
import { Body, Post, Get } from '@nestjs/common/decorators';

import { ChannelService } from './channels.service';
import { SubscribesService } from 'src/subscribes/subscribes.service';

@Controller('channels')
export class ChannelController implements OnModuleInit {
   constructor(
      private channelService: ChannelService,
      private subscibeService: SubscribesService
   ) {}

   @Get('test')
   async test(@Body() body: any, @Req() req: any) {
      await this.channelService.check()
   }
   @Get('check')
   async checkProducts(@Body() body: any, @Req() req: any) {
      console.log(req.headers.key)
      if(req.headers.key && req.headers.key === process.env.SECRET) {
         await this.channelService.check()
      } else {
         throw new UnauthorizedException()
      }
   }

   async onModuleInit() {
      // const test = await this.channelService.deleteByTgId('-1001812875610')
      // console.log(test)
      // const existChannels = await this.channelService.getAllChannels()
      // const startedChannels = [
      //    { name: 'Главный', id: 1 },
      //    { name: 'ИТР', id: 2 },
      //    { name: 'Бухгелтерия', id: 3 },
      // ]
      // const startedSubscribes = [
      //    { channelId: 1, areaId: 1 },
      //    { channelId: 1, areaId: 2 },
      //    { channelId: 1, areaId: 3 },
      //    { channelId: 1, areaId: 4 },
      //    { channelId: 2, areaId: 1 },
      //    { channelId: 2, areaId: 3 },
      //    { channelId: 3, areaId: 4 },
      // ]
      // if(existChannels.length === 0) {
      //    // staredChannels.map(async (channel) => await this.channelService.addChannel(channel))
      // }
      // const existSubscribes = await this.subscibeService.getAllSubscribes()
      // if(existSubscribes.length === 0) {
      //    startedSubscribes.map(async (subscribe) => await this.subscibeService.addSubscribe(subscribe))
      // }
   }
}

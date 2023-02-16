import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subscribe } from './models/subscribe.model'
import { Op } from 'sequelize';

import { AddSubscribeDto } from './models/add-subscribe.dto';
import { Area } from 'src/areas/models/area.model';
import { ChannelService } from 'src/channels/channels.service';

@Injectable()
export class SubscribesService {
   constructor(
      @InjectModel(Subscribe)
      private subscribeRepository: typeof Subscribe,
      // private parserService: ParserService
   ) {}
   async deleteAreaFromChannel(channelId, areaId) {
      this.subscribeRepository.destroy({
         where: {
            [Op.and]: [
               { channelId: channelId }, { areaId: areaId }
            ]
         }
      })
   }
   async findByChannel(channelId) {
      return this.subscribeRepository.findAll({
         where: { channelId: channelId },
         attributes: {
             exclude: ['createdAt', 'updatedAt']
         }
      })
   }
   async getAllSubscribes() {
      return this.subscribeRepository.findAll()
   }
   async addSubscribe(dto) {
      await this.subscribeRepository.create(dto)
   }
}
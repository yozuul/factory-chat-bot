import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";

import { ChannelController } from './channels.controller';
import { ChannelService } from './channels.service';
import { SubscribesModule } from 'src/subscribes/subscribes.module';
import { Channel } from './models/channel.model';
import { AreasModule } from 'src/areas/areas.module';
import { FilesModule } from 'src/files/files.module';

@Module({
   controllers: [ChannelController],
   providers: [ChannelService],
   imports: [
      SequelizeModule.forFeature([Channel]),
      SubscribesModule, AreasModule, FilesModule
   ],
   exports: [
      ChannelService
      // UsersService
   ]
})
export class ChannelsModule {}
import { resolve } from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';

import { BotModule } from './bot/bot.module';
import { AreasModule } from './areas/areas.module';
import { ChannelsModule } from './channels/channels.module';
import { UsersModule } from './users/users.module';
import { SubscribesModule } from './subscribes/subscribes.module';
import { User } from './users/models/user.model';
import { Channel } from './channels/models/channel.model';
import { Area } from './areas/models/area.model';
import { Subscribe } from './subscribes/models/subscribe.model';
import { FilesModule } from './files/files.module';
import { File } from './files/models/file.model';

const sessions = new LocalSession({ database: 'session_db.json' });

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: '.env',
      }),
      SequelizeModule.forRoot({
         dialect: 'sqlite',
         storage: resolve('factory.db'),
         models: [User, Channel, Area, Subscribe, File],
         autoLoadModels: true,
         logging: false
      }),
      TelegrafModule.forRoot({
         middlewares: [sessions.middleware()],
         token: process.env.BOT_TOKEN,
      }),
      BotModule, AreasModule, ChannelsModule, UsersModule, SubscribesModule, FilesModule
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}
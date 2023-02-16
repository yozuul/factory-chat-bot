import { Module, forwardRef } from '@nestjs/common';
import { BotUpdate } from './bot.update';
import { UsersModule } from 'src/users/users.module';
import { AreasModule } from 'src/areas/areas.module';
import { AdminStartedScene, AdminAreasScene, AdminChannelScene, UserStartedScene } from './scenes';
import { ChannelsModule } from 'src/channels/channels.module';
import { SubscribesModule } from 'src/subscribes/subscribes.module';
import { FilesModule } from 'src/files/files.module';

@Module({
   imports: [
      UsersModule, AreasModule, ChannelsModule, SubscribesModule, FilesModule
      // forwardRef(() => ParserModule),
      // CommonModule
   ],
   providers: [
      BotUpdate,
      UserStartedScene,
      AdminStartedScene,
      AdminAreasScene,
      AdminChannelScene
   ],
})
export class BotModule {}
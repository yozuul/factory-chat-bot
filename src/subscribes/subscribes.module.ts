import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { SubscribesService } from './subscribes.service';
import { Subscribe } from './models/subscribe.model';

@Module({
   providers: [SubscribesService],
   imports: [
      SequelizeModule.forFeature([Subscribe]),
   ],
   exports: [
      SubscribesService
   ]
})
export class SubscribesModule {}

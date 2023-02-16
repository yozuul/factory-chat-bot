import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';
import { Area } from './models/area.model';

@Module({
   imports: [
      SequelizeModule.forFeature([Area])
   ],
   controllers: [AreasController],
   providers: [AreasService],
   exports: [AreasService]
})
export class AreasModule {}
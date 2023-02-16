import { Controller, OnModuleInit } from '@nestjs/common';
import { AreasService } from './areas.service';

@Controller('areas')
export class AreasController implements OnModuleInit {
   constructor(
      private areaService: AreasService
   ) {}
   async onModuleInit() {
      // const existAreas = await this.areaService.getAllAreas()
      // const started = [
      //    { name: 'Сушка и обжиг', id: 1 },
      //    { name: 'Начальник смены', id: 2 },
      //    { name: 'Лаборатория', id: 3 },
      //    { name: 'Готовая продукция', id: 4 },
      // ]
      // if(existAreas.length === 0) {
      //    started.map(async (area) => await this.areaService.addArea(area))
      // }
   }
}

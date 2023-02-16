import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Area } from './models/area.model';


@Injectable()
export class AreasService {
   constructor(
      @InjectModel(Area)
      private areaRepository: typeof Area,
      // private parserService: ParserService
   ) {}
   async getAllAreas() {
      return this.areaRepository.findAll({
         order: [['updatedAt', 'DESC']]
      })
   }
   async findById(id) {
      return this.areaRepository.findOne({
         where: { id: id }
      })
   }
   async findByName(name) {
      return this.areaRepository.findOne({
         where: { name: name }
      })
   }
   async addArea(dto) {
      await this.areaRepository.create(dto)
   }
   async deleteArea(id) {
      await this.areaRepository.destroy({
         where: { id: id }
      })
   }
   async renameArea(id, name) {
      await this.areaRepository.update(
         { name: name },
         { where: { id: id }}
      )
   }
}
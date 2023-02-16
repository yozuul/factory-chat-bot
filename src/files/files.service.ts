import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { File } from './models/file.model';
import { AddFileDto } from './models/add-file.dto';

@Injectable()
export class FilesService {
   constructor(
      @InjectModel(File)
      private fileRepository: typeof File,
   ) {}
   async addFile(fileName, tgId, areaId) {
      await this.deleteFile(areaId)
      await this.fileRepository.findOrCreate({
         where: { areaId: areaId },
         defaults: {
            name: fileName, tgId: tgId
         }
      })
   }
   async getByAreaId(areaId) {
      return this.fileRepository.findOne({
         where: { areaId: areaId }
      })
   }
   async deleteFile(areaId) {
      try {
         const tryDel = await this.fileRepository.destroy({
            where: { areaId: areaId }
         })
         return tryDel
      } catch (error) {
         return false
      }
   }
   async deleteAll() {
      await this.fileRepository.destroy({
         where: {}, truncate: true
      })
   }
}

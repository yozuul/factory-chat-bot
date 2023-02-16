import { Column, DataType, Model, Table } from "sequelize-typescript";

const { INTEGER, STRING } = DataType

interface FileCreationAttrs {
   name: string
   tgId: string
   areaId: number
}

@Table({ tableName: 'files' })
export class File extends Model<File, FileCreationAttrs> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @Column({
      type: STRING, allowNull: false
   }) name: string

   @Column({
      type: STRING, allowNull: false
   }) tgId: string

   @Column({
      type: INTEGER, allowNull: false
   }) areaId: number
}
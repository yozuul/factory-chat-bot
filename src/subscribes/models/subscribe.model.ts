import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Area } from 'src/areas/models/area.model';
import { Channel } from 'src/channels/models/channel.model';

const { INTEGER, STRING } = DataType

interface SubscribeCreationAttrs {
   channelId: number
   areaId: number
}

@Table({ tableName: 'subscribes' })
export class Subscribe extends Model<Subscribe, SubscribeCreationAttrs> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @ForeignKey(() => Channel)
   @Column({
      type: INTEGER
   }) channelId: number

   @ForeignKey(() => Area)
   @Column({
      type: INTEGER
   }) areaId: number
}

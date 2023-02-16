import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import {Area} from 'src/areas/models/area.model';
import { Subscribe } from 'src/subscribes/models/subscribe.model';

const { INTEGER, STRING } = DataType

interface ChannelCreationAttrs {
   name: string
   tgId: string
}

@Table({ tableName: 'channels' })
export class Channel extends Model<Channel, ChannelCreationAttrs> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @Column({
      type: STRING, allowNull: false
   }) name: string

   @Column({
      type: STRING, allowNull: true
   }) tgId: string

   @BelongsToMany(() => Area, () => Subscribe)
   areas: Area[]
}
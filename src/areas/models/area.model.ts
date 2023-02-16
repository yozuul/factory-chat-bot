import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Channel } from 'src/channels/models/channel.model';
import { Subscribe } from 'src/subscribes/models/subscribe.model';

const { INTEGER, STRING } = DataType

interface AreaCreationAttrs {
   name: string
}

@Table({ tableName: 'areas' })
export class Area extends Model<Area, AreaCreationAttrs> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @Column({
      type: STRING, allowNull: false
   }) name: string

   // @Column({
   //    type: STRING, allowNull: false
   // }) tgId: string

   // @Column({
   //    type: STRING, allowNull: true
   // }) session: string

   @BelongsToMany(() => Channel, () => Subscribe)
   channels: Channel[]
}
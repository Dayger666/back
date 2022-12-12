import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  IsUUID,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

@Table({
  tableName: 'users',
})
export default class User extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Column({
    type: DataType.UUIDV4,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
    id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    email: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: 'Mocked user bio',
  })
    bio: string;

  @Column
    createdAt: Date;

  @Column
    updatedAt: Date;
}

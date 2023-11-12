import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Unique role meaning',
  })
  @Column({
    type: 'varchar',
    unique: true,
  })
  value: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @Column({ type: 'varchar' })
  description: string;

  @ManyToMany(() => UserEntity, (entity) => entity.roles)
  @JoinTable()
  users: UserEntity[];
}

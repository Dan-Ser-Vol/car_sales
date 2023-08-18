import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Role {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Role of the user' })
  @Column({ type: 'varchar', unique: true })
  value: string;

  @ApiProperty({
    example: 'Administrator',
    description: 'Description of the role',
  })
  @Column({ type: 'varchar', nullable: false })
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable({ name: 'user_roles' })
  users: User[];
}

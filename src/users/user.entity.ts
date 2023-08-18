import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Account } from '../accounts/account.entity';
import { Role } from '../roles/role.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'Unique ID of the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John', description: 'Name of the user' })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email address of the user',
  })
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @ApiProperty({ example: 'MyP@ssw0rd!', description: 'Password of the user' })
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the user is active',
  })
  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @ApiProperty({
    example: false,
    description: 'Indicates if the user is banned',
  })
  @Column({ type: 'boolean', default: false })
  banned: boolean;

  @ApiProperty({
    type: () => Account,
    description: 'Associated account of the user',
  })
  @OneToOne(() => Account)
  @JoinColumn({ name: 'user_id' })
  account: Account;

  @ApiProperty({
    type: () => Role,
    isArray: true,
    description: 'Roles assigned to the user',
  })
  @ApiProperty({ description: 'Date when the user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Date when the user was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];
}

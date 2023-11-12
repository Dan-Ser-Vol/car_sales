import { IsBoolean, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AccountTypeEnum } from '../../modules/user/enum/account-type.enum';
import { BanStatusEnum } from '../../modules/user/enum/ban-status.enum';
import { CarPostEntity } from './carPost.entity';
import { CreateUpdateModel } from './common/create.update.entity';
import { RoleEntity } from './role.entity';

@Entity('user')
export class UserEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ type: 'varchar' })
  @IsString()
  username: string;

  @Column({ type: 'varchar', unique: true })
  @IsString()
  email: string;

  @Column({ type: 'varchar', unique: true })
  @IsString()
  phone: string;

  @Column({ type: 'varchar' })
  @IsString()
  password: string;

  @Column({
    type: 'enum',
    enum: AccountTypeEnum,
    default: AccountTypeEnum.BASIC,
  })
  accountType: AccountTypeEnum.BASIC;

  @Column({
    type: 'enum',
    enum: BanStatusEnum,
    default: BanStatusEnum.INACTIVE,
  })
  @IsBoolean()
  banned: BanStatusEnum;

  @Column({ nullable: true })
  @IsOptional()
  token?: string;

  @OneToMany(() => CarPostEntity, (entity) => entity.user)
  posts: CarPostEntity[];
  @ManyToMany(() => RoleEntity, (entity) => entity.users)
  roles: RoleEntity[];
}

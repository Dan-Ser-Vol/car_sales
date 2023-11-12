import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateUpdateModel } from './common/create.update.entity';
import { IsOptional, IsString } from 'class-validator';
import { RoleEntity } from './role.entity';
import { AccountTypeEnum } from '../../modules/user/enum/account-type.enum';
import { CarPostEntity } from './carPost.entity';

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

  @Column({ nullable: true })
  @IsOptional()
  token?: string;

  @OneToMany(() => CarPostEntity, (entity) => entity.user)
  posts: CarPostEntity[];
  @ManyToMany(() => RoleEntity, (entity) => entity.users)
  roles: RoleEntity[];
}

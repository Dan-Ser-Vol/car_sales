import { Module } from '@nestjs/common';

import { AuthConfigModule } from '../auth-config/auth-config.module';
import { FilesModule } from '../files/files.module';
import { UserModule } from '../user/user.module';
import { CarPostController } from './carPost.controller';
import { CarPostRepository } from './carPost.repository';
import { CarPostService } from './carPost.service';

@Module({
  imports: [AuthConfigModule, UserModule, FilesModule],
  controllers: [CarPostController],
  providers: [CarPostService, CarPostRepository],
  exports: [CarPostService, CarPostRepository],
})
export class CarPostModule {}

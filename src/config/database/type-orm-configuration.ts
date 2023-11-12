import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { CommonConfigModule } from './config.module';
import { CommonConfigService } from './configuration.service';

export class TypeOrmConfiguration {
  static get config(): TypeOrmModuleAsyncOptions {
    return {
      imports: [CommonConfigModule],
      useFactory: (commonConfigService: CommonConfigService) => ({
        type: 'postgres',
        host: commonConfigService.host,
        port: commonConfigService.port,
        username: commonConfigService.user,
        password: commonConfigService.password,
        database: commonConfigService.database,
        synchronize: false,
        migrationsRun: false,
        entities: [`${process.cwd()}/**/*.entity{.js, .ts}`],
        migrationsTableName: 'migrations',
      }),
      inject: [CommonConfigService],
    };
  }
}

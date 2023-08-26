import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1692888066903 implements MigrationInterface {
    name = 'InitMigration1692888066903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "banned2" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "banned2"`);
    }

}

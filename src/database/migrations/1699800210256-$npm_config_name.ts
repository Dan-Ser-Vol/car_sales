import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1699800210256 implements MigrationInterface {
    name = ' $npmConfigName1699800210256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "banned" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "banned"`);
    }

}

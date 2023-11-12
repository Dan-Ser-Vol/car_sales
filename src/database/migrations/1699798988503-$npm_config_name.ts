import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1699798988503 implements MigrationInterface {
    name = ' $npmConfigName1699798988503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carPost" ALTER COLUMN "brand" SET DEFAULT 'Audi'`);
        await queryRunner.query(`ALTER TABLE "carPost" ALTER COLUMN "image" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carPost" ALTER COLUMN "image" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carPost" ALTER COLUMN "brand" DROP DEFAULT`);
    }

}

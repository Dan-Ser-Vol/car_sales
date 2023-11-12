import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateImageColumn1699999999999 implements MigrationInterface {
    name = 'UpdateImageColumn1699999999999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carPost" ALTER COLUMN "image" TYPE varchar[] USING ARRAY[image]::varchar[]`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carPost" ALTER COLUMN "image" TYPE varchar`);
    }
}

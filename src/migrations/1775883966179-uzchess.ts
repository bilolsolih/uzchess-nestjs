import { MigrationInterface, QueryRunner } from "typeorm";

export class Uzchess1775883966179 implements MigrationInterface {
    name = 'Uzchess1775883966179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ALTER COLUMN "title" TYPE varchar(256)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ALTER COLUMN "title" TYPE varchar(128)`);
    }

}

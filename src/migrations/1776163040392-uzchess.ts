import { MigrationInterface, QueryRunner } from "typeorm";

export class Uzchess1776163040392 implements MigrationInterface {
    name = 'Uzchess1776163040392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" RENAME TO "players_table"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "players_table" RENAME TO "players"`);
    }

}

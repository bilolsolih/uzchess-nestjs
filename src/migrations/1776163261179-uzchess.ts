import { MigrationInterface, QueryRunner } from "typeorm";

export class Uzchess1776163261179 implements MigrationInterface {
    name = 'Uzchess1776163261179'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "players_table" RENAME TO "players"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "players" RENAME TO "players_table"`);
  }
}

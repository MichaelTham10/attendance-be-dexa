import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAttendanceMigration21776886535220 implements MigrationInterface {
    name = 'CreateAttendanceMigration21776886535220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ATTENDANCE" ADD "STATUS" character varying(50)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ATTENDANCE" DROP COLUMN "STATUS"`);
    }

}

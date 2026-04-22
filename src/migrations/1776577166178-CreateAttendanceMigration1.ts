import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAttendanceMigration11776577166178 implements MigrationInterface {
    name = 'CreateAttendanceMigration11776577166178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ATTENDANCE" ("ATTENDANCE_ID" SERIAL NOT NULL, "ATTENDANCE_NO" character varying(100) NOT NULL, "EMP_NO" character varying(50) NOT NULL, "CHECK_IN" TIMESTAMP, "CHECK_OUT" TIMESTAMP, "USR_CRT" character varying(100), "USR_UPD" character varying(100), "DTM_CRT" TIMESTAMP NOT NULL DEFAULT now(), "DTM_UPD" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c817f2c9be3230a5f76505e5c09" UNIQUE ("ATTENDANCE_NO"), CONSTRAINT "PK_2638e124622b7cc490064f9d026" PRIMARY KEY ("ATTENDANCE_ID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ATTENDANCE"`);
    }

}

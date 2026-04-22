import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'ATTENDANCE' })
export class Attendance {
    @PrimaryGeneratedColumn({ name: 'ATTENDANCE_ID' })
    AttendanceId: number;

    @Column({ name: 'ATTENDANCE_NO', type: 'varchar', length: 100, unique: true })
    AttendanceNo: string;

    @Column({ name: 'EMP_NO', type: 'varchar', length: 50 })
    EmpNo: string;

    @Column({ name: 'CHECK_IN', type: 'timestamp', nullable: true })
    CheckIn: Date | null;

    @Column({ name: 'CHECK_OUT', type: 'timestamp', nullable: true })
    CheckOut: Date | null;

    @Column({ name: 'STATUS', type: 'varchar', length: 50, nullable: true })
    Status: string | null;

    @Column({ name: 'USR_CRT', type: 'varchar', length: 100, nullable: true })
    UsrCrt: string | null;

    @Column({ name: 'USR_UPD', type: 'varchar', length: 100, nullable: true })
    UsrUpd: string | null;

    @CreateDateColumn({ name: 'DTM_CRT' })
    DtmCrt: Date;

    @UpdateDateColumn({ name: 'DTM_UPD' })
    DtmUpd: Date;
}
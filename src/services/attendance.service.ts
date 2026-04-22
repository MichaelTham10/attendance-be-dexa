import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'src/entities/Attendance';
import { GetAttendanceModel } from 'src/models/attendance/GetAttendanceModel';
import { UpdateEmpQueueModel } from 'src/models/employee/UpdateEmpQueueModel';
import { PaginationRequestModel } from 'src/models/general/PaginationRequestModel';
import { PaginationResponseModel } from 'src/models/general/PaginationResponseModel';
import { Between, IsNull, Repository } from 'typeorm';

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceRepo: Repository<Attendance>,
        @Inject('EMP_UPD_QUEUE') private client: ClientProxy
    ) { }

    async checkIn(empNo: string, userEmail: string): Promise<Attendance> {
        const existingAttendance = await this.attendanceRepo.findOne({
            where: { EmpNo: empNo, CheckOut: IsNull() },
        });

        if (existingAttendance) {
            throw new BadRequestException('Employee is already checked in, please check out first');
        }

        const attendance = this.attendanceRepo.create({
            AttendanceNo: `ATT-${Date.now()}-${empNo}`,
            CheckIn: new Date(),
            EmpNo: empNo,
            Status : "MASUK",
            UsrCrt: userEmail,
            UsrUpd: userEmail,
        });

        const queueData: UpdateEmpQueueModel = {
            empNo,
            date: attendance.CheckIn,
            userEmail
        };

        try {
            this.client.emit('emp_upd_check_in', queueData);
        } catch (err) {
            console.error('Faled to Send Queue: ', err);
        }

        return await this.attendanceRepo.save(attendance);
    }

    async checkOut(empNo: string, userEmail: string): Promise<Attendance> {
        const attendance = await this.attendanceRepo.findOne({
            where: { EmpNo: empNo, CheckOut: IsNull() },
        });
        if (!attendance) {
            throw new BadRequestException('Attendance record not found');
        }
        attendance.CheckOut = new Date();
        attendance.UsrUpd = userEmail;
        attendance.Status = "PULANG";

        const queueData: UpdateEmpQueueModel = {
            empNo,
            date: attendance.CheckIn,
            userEmail
        };

        try {
            this.client.emit('emp_upd_check_out', queueData);
        } catch (err) {
            console.error('Faled to Send Queue: ', err);
        }

        return await this.attendanceRepo.save(attendance);
    }

    async getAttendanceByEmpNo(query: GetAttendanceModel): Promise<Attendance[]> {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

        const dateFrom = query.dateFrom ? new Date(query.dateFrom) : firstDay;
        const dateTo = query.dateTo ? new Date(query.dateTo) : today;

        dateFrom.setHours(0, 0, 0, 0);
        dateTo.setHours(23, 59, 59, 999);
        return await this.attendanceRepo.find({
            where: {
                EmpNo: query.empNo,
                CheckIn: Between(dateFrom, dateTo),
            },
        });
    }

    async getAttendances(query: PaginationRequestModel): Promise<PaginationResponseModel<Attendance>> {
        const page = parseInt(query.page || '1', 10);
        const limit = parseInt(query.limit || '10', 10);

        const skip = (page - 1) * limit;

        const [data, total] = await this.attendanceRepo.findAndCount({
            skip,
            take: limit,
            order: {
                CheckIn: 'ASC',
            },
        });

        return {
            data,
            perPage: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}



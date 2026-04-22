import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceController } from 'src/controllers/attendance.controller';
import { Attendance } from 'src/entities/Attendance';
import { AttendanceService } from 'src/services/attendance.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Attendance]),
        ClientsModule.register([
        {
            name: 'EMP_UPD_QUEUE',
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'emp_upd_queue',
                queueOptions: {
                    durable: true,
                },
            },
        },
    ]),],
    controllers: [AttendanceController],
    providers: [AttendanceService],
})
export class AttendanceModule { }

import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetAttendanceModel } from 'src/models/attendance/GetAttendanceModel';
import { UpdateCreateAttendanceModel } from 'src/models/attendance/UpdateCreateAttendanceModel';
import { PaginationRequestModel } from 'src/models/general/PaginationRequestModel';
import { AttendanceService } from 'src/services/attendance.service';

@ApiTags('Attendance')
@Controller({
    path: 'Attendance',
    version: '1',
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) { }

    @Post('CheckIn')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Check in employee By Employee No' })
    async attendanceCheckIn(@Body() obj: UpdateCreateAttendanceModel, @Req() req: any) {
        return await this.attendanceService.checkIn(obj.empNo, req.user.email);
    }

    @Patch('CheckOut')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Check out employee By Employee No' })
    async attendanceCheckOut(@Body() obj: UpdateCreateAttendanceModel, @Req() req: any) {
        return await this.attendanceService.checkOut(obj.empNo, req.user.email);
    }

    @Get('GetAttendances')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get employee positions' })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    async getAttendances(@Query() query: PaginationRequestModel) {
        return await this.attendanceService.getAttendances(query);
    }

    @Get('GetAttendancesByEmpNo')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get attendance records by employee number' })
    async getAttendanceByEmpNo(@Query() query: GetAttendanceModel) {
        return await this.attendanceService.getAttendanceByEmpNo(query);
    }
}

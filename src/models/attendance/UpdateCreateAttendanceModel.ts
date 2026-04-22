import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateCreateAttendanceModel {
    @ApiProperty()
    @IsString()
    empNo: string;
}
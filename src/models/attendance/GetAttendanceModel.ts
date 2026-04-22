import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class GetAttendanceModel {
    @ApiProperty()
    @IsString()
    empNo: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    dateFrom?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    dateTo?: string;
}
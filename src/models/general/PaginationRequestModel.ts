import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString } from 'class-validator';

export class PaginationRequestModel {
    @ApiProperty()
    @IsOptional()
    @IsNumberString()
    page?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumberString()
    limit?: string;
}
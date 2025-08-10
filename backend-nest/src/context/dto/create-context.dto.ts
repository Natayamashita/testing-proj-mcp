import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length } from 'class-validator';

export class CreateContextDto {
    @ApiProperty()
    @IsString()
    prompt: string;
}

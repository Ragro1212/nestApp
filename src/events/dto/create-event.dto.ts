import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;
   
    @IsDateString()
    date: string;

    @IsString()
    locationId: number;

    @IsNumber()
    organizerId: number;
}
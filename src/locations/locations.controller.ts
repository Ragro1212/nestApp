import { Controller, Post, Body, Get } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create.location.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  create(@Body() createDto: CreateLocationDto) {
    return this.locationsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.locationsService.findAll();
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create.location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  create(createDto: CreateLocationDto) {
    const location = this.locationRepository.create(createDto);
    return this.locationRepository.save(location);
  }

  findAll() {
    return this.locationRepository.find();
  }
}
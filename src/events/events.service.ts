import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UsersService } from '../users/users.service';
import { Location } from '../locations/entities/location.entity';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private eventsRepository: Repository<Event>,
        private usersService: UsersService,
        @InjectRepository(Location)
        private locationRepository: Repository<Location>,
    ){}

    async create(createEventDto: CreateEventDto): Promise<Event> {
        const {title, description, date, locationId, organizerId } = createEventDto;

        const organizer = await this.usersService.findOne(organizerId);
        if (!organizer) throw new NotFoundException('Organizer not found');

        const location = await this.locationRepository.findOneBy({ id: locationId });
        if (!location) throw new NotFoundException('Location not found');

        const event = this.eventsRepository.create({
            title,
            description,
            date: new Date(date),
            location,
            organizer,
        });

        return this.eventsRepository.save(event);
    }

    findAll(): Promise<Event[]> {
        return this.eventsRepository.find();
    }

    async findOne(id: number): Promise<Event> {
        const event = await this.eventsRepository.findOne({ where: { id } });
        if (!event) throw new NotFoundException('Event not found');
        return event;
    }

    async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
        const event = await this.findOne(id);
        const updated = Object.assign(event, updateEventDto);
        return this.eventsRepository.save(updated);
    }

    async remove(id: number): Promise<void> {
        const event = await this.findOne(id);
        await this.eventsRepository.remove(event);
    }
}

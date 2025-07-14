import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity'; 
import { Location } from '../locations/entities/location.entity';
import { UsersModule } from '../users/users.module';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Location]), UsersModule, MailerModule],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}

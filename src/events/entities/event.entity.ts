import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Location } from '../../locations/entities/location.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    date: Date;

    @ManyToOne(() => User, user => user.events, { eager: true})
    organizer: User;

    @ManyToOne(() => Location, location => location.events)
    location: Location;

    @ManyToOne(() => Category, category => category.events)
    category: Category;
}
import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { BaseModel } from '../../../core/base-model.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity('difficulties')
export class Difficulty extends BaseModel {
  @Column({ length: 32, unique: true })
  title!: string;

  @Column({ length: 128 })
  icon!: string;

  @OneToMany(() => Course, (course) => course.difficulty)
  courses?: Relation<Course[]>;
}

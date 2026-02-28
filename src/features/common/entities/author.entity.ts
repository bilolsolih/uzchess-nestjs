import { BaseModel } from '../../../core/base-model.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@Entity('authors')
export class Author extends BaseModel {
  @Column({ length: 64 })
  fullName!: string;

  @OneToMany(() => Course, (course) => course.author)
  courses?: Relation<Course[]>;
}

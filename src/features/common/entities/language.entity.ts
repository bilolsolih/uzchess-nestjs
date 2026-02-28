import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { BaseModel } from '../../../core/base-model.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity('languages')
export class Language extends BaseModel {
  @Column({ length: 32, unique: true })
  title!: string;

  @Column({ length: 2, unique: true })
  code!: string;

  @OneToMany(() => Course, (course) => course.language)
  courses?: Relation<Course[]>;
}

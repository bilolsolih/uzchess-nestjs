import { BaseModel } from '../../../core/base-model.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { Book } from './book.entity';

@Entity('bookCategories')
export class BookCategory extends BaseModel {
  @Column({ length: 64, unique: true })
  title!: string;

  @OneToMany(() => Book, (book) => book.category)
  books?: Relation<Book[]>;
}

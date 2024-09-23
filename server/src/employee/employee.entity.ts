import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity()
export class Employee {
  @PrimaryColumn()
  login: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @ManyToOne(() => Post, post => post.employees, { eager: true })
  post: Post;
}

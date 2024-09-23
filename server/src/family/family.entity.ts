import { Breed } from 'src/bread/bread.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Family {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(()=>Breed, breed => breed.family)
  breeds: Breed[];
}

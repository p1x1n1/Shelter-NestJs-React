import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Family } from '../family/family.entity';
import { Pet } from '../pet/pet.entity';

@Entity()
export class Breed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Family, family => family.breeds, { eager: true })
  family: Family;

  @OneToMany(()=> Pet, pets => pets.breed)
  pets: Pet[];
}

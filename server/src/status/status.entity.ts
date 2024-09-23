import { Pet } from '../pet/pet.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // "Забронирован", "Ожидает семью", "Забран домой"

  @OneToMany(()=> Pet, pet => pet.adoptionStatus)
  pets: Pet[];

}

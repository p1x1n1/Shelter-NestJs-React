import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Breed } from '../bread/bread.entity';
import { Status } from '../status/status.entity';
import { Contract } from '../contract/contract.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  appearanceDescription: string;//внещность

  @Column()
  characterDescription: string;//характер

  @Column()
  sex: boolean; // 0 -  male, 1 - female

  @Column()
  photo: string; 

  @ManyToOne(() => Breed, breed => breed.pets, { eager: true })
  breed: Breed;

  @ManyToOne(() => Status, status => status.pets, { eager: true })
  adoptionStatus: Status;

  @OneToMany(()=> Contract, contract => contract.pet)
  contracts: Contract[];

}

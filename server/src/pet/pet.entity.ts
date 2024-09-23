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

  @ManyToOne(() => Breed, breed => breed.pets, { eager: true })
  breed: Breed;

  @ManyToOne(() => Status, status => status.pets, { eager: true })
  adoptionStatus: Status;

  @OneToMany(()=> Contract, contract => contract.pet)
  contracts: Contract[];

}

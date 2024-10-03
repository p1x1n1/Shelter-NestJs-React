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
  age: string;

  @Column()
  appearanceDescription: string;//внещность

  @Column()
  characterDescription: string;//характер

  @Column()
  sex: boolean; // 0 -  male, 1 - female

  @Column()
  photo: string; 

  @Column()
  sterilization: boolean; // стерилизован ли

  @Column()
  vaccinationStatus: boolean; // вакцины есть или нет

  @ManyToOne(() => Breed, breed => breed.pets, { eager: true })
  breed: Breed;

  @ManyToOne(() => Status, status => status.pets, { eager: true })
  adoptionStatus: Status;

  @OneToMany(()=> Contract, contract => contract.pet)
  contracts: Contract[];

  constructor() {
    // Устанавливаем значение по умолчанию, если не передано другое значение
    this.adoptionStatus = { id: 2, name: 'Ожидает семью' } as Status;
  }

}

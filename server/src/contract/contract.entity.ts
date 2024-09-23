import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Client } from '../client/client.entity';
import { Pet } from '../pet/pet.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: false})
  signed: boolean;

  @CreateDateColumn()
  submissionDate: Date;

  @Column({nullable:true})
  signingDate: Date;

  @ManyToOne(() => Client, client => client.contracts, { eager: true })
  client: Client;

  @ManyToOne(() => Pet, pet => pet.contracts, { eager: true })
  pet: Pet;
}

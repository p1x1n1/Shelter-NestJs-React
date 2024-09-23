import { Contract } from '../contract/contract.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Client {
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

  @OneToMany(()=>Contract, contract => contract.client )
  contracts: Contract[];
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) {}

  findAll() {
    return this.contractRepository.find({ relations: ['client', 'pet'] });
  }

  findOne(id: number) {
    return this.contractRepository.findOneBy({ id });
  }

  async create(contractData: Partial<Contract>) {
    console.log(contractData);
    const {pet, client} = contractData;
    if (pet.adoptionStatus.name !== "Ожидает семью") return { message: "Нельзя оформить заявку на этого питомца" };;

    // Проверка, есть ли у клиента уже контракты
    const existingContracts = await this.contractRepository.find({ where: { client } });
    
    if (existingContracts.length > 0) {
      return { message: "У клиента уже есть контракты." }; // ИС
    }
    
    const contract = this.contractRepository.create(contractData);
    return this.contractRepository.save(contract);
  }

  update(id: number, contractData: Partial<Contract>) {
    return this.contractRepository.update(id, contractData);
  }

  delete(id: number) {
    return this.contractRepository.delete(id);
  }
}

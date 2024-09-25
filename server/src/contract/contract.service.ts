import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { PetService } from '../pet/pet.service';
import { ClientService } from '../client/client.service';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
    private petService: PetService,
    private clientService: ClientService,
  ) {}

  findAll(login?: string) {
    if (login) {
      return this.contractRepository.find({
        where: { client: { login } },
        relations: ['client', 'pet'],
      });
    }
    return this.contractRepository.find({ relations: ['client', 'pet'] });
  }

  findOne(id: number) {
    return this.contractRepository.findOneBy({ id });
  }

  async create(contractData: Partial<Contract>) {
    let { pet, client } = contractData;
    // Проверка, что питомец доступен для усыновления
    if (pet.adoptionStatus.name !== "Ожидает семью") {
      throw new Error("Нельзя оформить заявку на этого питомца");
    }

    // Проверка, есть ли у клиента уже контракты
    const existingContracts = await this.contractRepository.find({ where: { client } });
    if (existingContracts.length > 0) {
      throw new Error("У клиента уже есть контракты.");
    }


    const contract = this.contractRepository.create(contractData);
    

    // Обновление питомца через PetService
    await this.petService.update(pet.id, { adoptionStatus: {
      id: 1, name: "Забронирован",
      pets: []
    } });

    return this.contractRepository.save(contract);
  }


  update(id: number, contractData: Partial<Contract>) {
    return this.contractRepository.findOneBy({ id }).then(async (existingContract) => {
      if (!existingContract) {
        throw new Error('Контракт не найден');
      }
      console.log(contractData);
      // Если signed = true и signingDate отсутствует, меняем статус на "Ожидает семью"
      if (contractData.signed === true && !contractData.signingDate) {
        await this.petService.update(existingContract.pet.id, {
          adoptionStatus: { id: 2, name: 'Ожидает семью', pets: [] }
        });
      }
  
      // Если signed = true и signingDate не null, меняем статус на "Забран домой"
      if (contractData.signed === true && contractData.signingDate ) {
        await this.petService.update(existingContract.pet.id, {
          adoptionStatus: { id: 3, name: 'Забран домой', pets: [] }
        });
      }
  

      return this.contractRepository.update(id, contractData);
    });
  }
  

  delete(id: number) {
    return this.contractRepository.delete(id);
  }
}

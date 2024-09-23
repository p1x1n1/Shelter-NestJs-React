import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ClientService],
  controllers: [ClientController],
  exports: [ClientService],
  imports: [
    TypeOrmModule.forFeature([Client]),
  ],
})
export class ClientModule {}

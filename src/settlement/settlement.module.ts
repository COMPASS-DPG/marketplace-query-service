import { Module } from '@nestjs/common';
import { SettlementService } from './settlement.service';
import { SettlementController } from './settlement.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  // Import the PrismaModule to make Prisma service available within this module
  imports: [PrismaModule],

  // Declare the SettlemetController as a controller for this module
  controllers: [SettlementController],

  // Declare the SettlementService and PrismaService as providers for this module
  providers: [SettlementService, PrismaService],

  // Export the RequestService to make it available for other modules that import this module
  exports: [SettlementService],
})
export class SettlementModule {}

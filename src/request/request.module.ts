import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  // Import the PrismaModule to make Prisma service available within this module
  imports: [PrismaModule],

  // Declare the RequestController as a controller for this module
  controllers: [RequestController],

  // Declare the RequestService and PrismaService as providers for this module
  providers: [RequestService, PrismaService],

  // Export the RequestService to make it available for other modules that import this module
  exports: [RequestService],
})
export class RequestModule {}

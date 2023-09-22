import { Injectable } from '@nestjs/common';
import {
  CreateSettlementDto,
  SettlementFilterDto,
  SettlementStatusDto,
  thirdPartyResponseStatusEnumDto,
} from './dto/create-settlement.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettlementDto } from './dto/update-settlement.dto';

@Injectable()
export class SettlementService {
  constructor(private prisma: PrismaService) {}

  // create a new request for the settlement
  async createSettlement(createSettlementDto: CreateSettlementDto) {
    return this.prisma.settlement.create({
      data: createSettlementDto,
    });
  }

  // get all settlements with optional filter and pagination
  async getAllSettlements(filter: SettlementFilterDto) {
    const {
      thirdPartyResponseStatus,
      requestStatus,
      limit = 10,
      offset = 0,
      orderBy,
    } = filter;
    return this.prisma.settlement.findMany({
      where: {
        requestStatus: requestStatus ?? undefined, // Optional status filter
        thirdPartyResponseStatus: thirdPartyResponseStatus ?? undefined, // Optional response filter
      },
      orderBy: {
        [orderBy || 'createdAt']: 'asc', // Default sorting by createdAt
      },
      skip: offset,
      take: limit,
    });
  }

  // Get settlement for a specific user using the userId
  async getAllSettlementForUser(userId: number, filter: any) {
    const {
      thirdPartyResponseStatus,
      requestStatus,
      limit = 10,
      offset = 0,
      orderBy,
    } = filter;
    return this.prisma.settlement.findMany({
      where: {
        userId: userId,
        requestStatus: requestStatus ?? undefined, // Optional status filter
        thirdPartyResponseStatus: thirdPartyResponseStatus ?? undefined, // Optional thirdPartyResponseStatus filter
      },
      orderBy: {
        [orderBy || 'createdAt']: 'asc', // Default sorting by createdAt
      },
      skip: offset,
      take: limit,
    });
  }

  // Get a settlement by its requestID
  async getsettlementById(requestId: number) {
    return this.prisma.settlement.findMany({
      where: {
        requestId: requestId,
      },
    });
  }

  // Update a settlement by its requestId
  async updateSettlementById(
    requestId: number,
    updateSettlementDto: UpdateSettlementDto,
  ) {
    return this.prisma.settlement.updateMany({
      where: {
        requestId: requestId,
      },
      data: updateSettlementDto,
    });
  }

}

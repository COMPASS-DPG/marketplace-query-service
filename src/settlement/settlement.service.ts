import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateSettlementDto,
  SettlementFilterDto
} from './dto/create-settlement.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettlementDto } from './dto/update-settlement.dto';

@Injectable()
export class SettlementService {
  constructor(private prisma: PrismaService) {}

  // create a new request for the settlement
  async createSettlement(createSettlementDto: CreateSettlementDto) {
    try {
      // Attempt to create a new settlement
      const newSettlement = await this.prisma.settlement.create({
        data: createSettlementDto,
      });

      return newSettlement;
    } catch (error) {
      // Check if the error is related to a duplicate entry (unique constraint violation)
      if (error.code === 'P2002' && error.meta?.target?.includes('requestId')) {
        // Handle the duplicate entry error here, e.g., by returning a custom error response
        throw new NotFoundException('Duplicate requestId. Settlement already exists.');
      }

      // For other errors, rethrow the error or handle it as needed
      throw error;
    }
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

  // Get a settlement by its request ID
  async getsettlementById(requestId: number) {
    return this.prisma.settlement.findMany({
      where: {
        requestId: requestId,
      },
    });
  }

  // Update the requested settlement status by its ID
  async updateSettlementByRequestId(
    requestId: number,
    updateSettlementStatusDto: UpdateSettlementDto,
  ) {
    return this.prisma.settlement.updateMany({
      where: {
        requestId: requestId,
      },
      data: updateSettlementStatusDto,
    });
  }
}

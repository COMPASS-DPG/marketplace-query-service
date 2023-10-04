import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateSettlementDto,
  SettlementFilterDto,
} from './dto/create-settlement.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettlementDto } from './dto/update-settlement.dto';

@Injectable()
export class SettlementService {
  constructor(private prisma: PrismaService) {}
  async createSettlement(createSettlementDto: CreateSettlementDto) {
    // Check for duplicate requestId
    const existingSettlement = await this.checkForDuplicateRequest(
      createSettlementDto,
    );

    if (existingSettlement) {
      throw new NotAcceptableException(
        'Duplicate requestId. Settlement already exists.',
      );
    }

    // If no duplicate, create the new settlement
    const newSettlement = await this.prisma.settlement.create({
      data: createSettlementDto,
    });
    return newSettlement;
  }

  // to check the dublicate entry of the existing requestId
  async checkForDuplicateRequest(createSettlementDto: CreateSettlementDto) {
    const existingSettlement = await this.prisma.settlement.findFirst({
      where: {
        requestId: createSettlementDto.requestId,
      },
    });
    return existingSettlement;
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
  async getAllSettlementForUser(userId: number, filter: SettlementFilterDto) {
    // Check if the user exists
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    // get the settlement if the userId exist.
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
    // Check the the settlement is available for the given requestId.
    const findRequestId = await this.prisma.request.findUnique({
      where: {
        requestId: requestId,
      },
    });

    if (!findRequestId) {
      // Handle the case where the requestId does not exist in the database
      throw new NotFoundException(`Given requestId ${requestId} not found.`);
    }

    // Get settlement by the requestId
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
    // Check the the requestId is available for settlement
    const findRequestId = await this.prisma.request.findUnique({
      where: {
        requestId: requestId,
      },
    });

    if (!findRequestId) {
      // Handle the case where the requestId does not exist in the database
      throw new NotFoundException(`Given requestId ${requestId} not found.`);
    }

    // Update the settlement by the request Id
    return this.prisma.settlement.updateMany({
      where: {
        requestId: requestId,
      },
      data: updateSettlementStatusDto,
    });
  }
}

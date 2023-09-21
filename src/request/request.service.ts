import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Import your Prisma service
import {
  CreateRequestDto,
  RequestFilterDto,
  RequestStatusDto,
} from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class RequestService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private prisma: PrismaService,
  ) {}

  async createRequest(createRequestDto: CreateRequestDto) {
    return this.prisma.request.create({
      data: createRequestDto,
    });
  }

  async getAllRequests(filter: RequestFilterDto) {
    const { status, type, limit = 10, offset = 0, orderBy } = filter;
    return this.prisma.request.findMany({
      where: {
        status: status ?? undefined, // Optional status filter
        type: type ?? undefined, // Optional type filter
      },
      orderBy: {
        [orderBy || 'createdAt']: 'asc', // Default sorting by createdAt
      },
      skip: +offset,
      take: +limit,
    });
  }

  async getAllRequestsForUser(userId: number, filter: any) {
    const { status, type, limit = 10, offset = 0, orderBy } = filter;
    return this.prisma.request.findMany({
      where: {
        userId: userId,
        status: status ?? undefined, // Optional status filter
        type: type ?? undefined, // Optional type filter
      },
      orderBy: {
        [orderBy || 'createdAt']: 'asc', // Default sorting by createdAt
      },
      skip: offset,
      take: limit,
    });
  }

  async getRequestById(requestId: number) {
    return this.prisma.request.findUnique({
      where: {
        requestId: requestId,
      },
    });
  }

  async updateRequestByRequestId(
    requestId: number,
    updateRequestDto: UpdateRequestDto,
  ) {
    return this.prisma.request.update({
      where: {
        requestId: requestId,
      },
      data: updateRequestDto,
    });
  }

  async updateRequestStatus(
    requestId: number,
    updateRequestStatusDto: RequestStatusDto,
  ) {
    return this.prisma.request.update({
      where: {
        requestId: requestId,
      },
      data: updateRequestStatusDto,
    });
  }
}

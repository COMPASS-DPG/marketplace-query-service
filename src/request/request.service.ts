import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Import your Prisma service
import {
  CreateRequestDto,
  RequestFilterDto,
  RequestStatusDto,
} from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class RequestService {
  constructor(private prisma: PrismaService) {}

  // Create a new request
  async createRequest(createRequestDto: CreateRequestDto) {
    return this.prisma.request.create({
      data: createRequestDto,
    });
  }

  // Get all requests with optional filters and pagination
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

  // Get all requests for a specific user with optional filters and pagination
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

  // Get a request by its ID
  async getRequestById(requestId: number) {
    return this.prisma.request.findUnique({
      where: {
        requestId: requestId,
      },
    });
  }

  // Update a request by its ID
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

  // Update the status of a request by its ID
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

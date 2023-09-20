import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { RequestService } from './request.service';
import {
  CreateRequestDto,
  RequestFilterDto,
  RequestStatusDto,
} from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseRequestDto } from './dto/response-request.dto';

@Controller('requests')
@ApiTags('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  @ApiOperation({ summary: 'Create a request' })
  @ApiResponse({ status: HttpStatus.CREATED, type: ResponseRequestDto })
  async createRequest(@Body() createRequestDto: CreateRequestDto) {
    try {
      const request = await this.requestService.createRequest(createRequestDto);
      console.log('request:', request);
      return { message: 'Request created successfully', data: request };
    } catch (error) {
      console.log('error:', error);
      throw new HttpException(
        'Failed to create the request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('')
  @ApiOperation({ summary: 'Get all requests' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseRequestDto,
    isArray: true,
  })
  async getAllRequestsForAdmin(@Query() filter: RequestFilterDto) {
    try {
      const requests = await this.requestService.getAllRequestsForAdmin(filter);
      return { message: 'Requests fetched successfully', data: requests };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch requests',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all requests of a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseRequestDto,
    isArray: true,
  })
  async getAllRequestsForUser(
    @Param('userId') userId: number,
    @Query() filter: RequestFilterDto,
  ) {
    try {
      const requests = await this.requestService.getAllRequestsForUser(
        userId,
        filter,
      );
      return { message: 'User requests fetched successfully', data: requests };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch user requests',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':requestId')
  @ApiOperation({ summary: 'Get a request' })
  @ApiResponse({ status: HttpStatus.OK, type: ResponseRequestDto })
  async getRequestById(@Param('requestId') requestId: number) {
    try {
      const request = await this.requestService.getRequestById(requestId);
      return { message: 'Request fetched successfully', data: request };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch the request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('update/:requestId')
  @ApiOperation({ summary: 'Update a request' })
  @ApiResponse({ status: HttpStatus.OK, type: ResponseRequestDto })
  async updateRequestByRequestId(
    @Param('requestId') requestId: number,
    @Body() updateRequestDto: UpdateRequestDto,
  ) {
    try {
      const updatedRequest = await this.requestService.updateRequestByRequestId(
        requestId,
        updateRequestDto,
      );
      return { message: 'Request updated successfully', data: updatedRequest };
    } catch (error) {
      throw new HttpException(
        'Failed to update the request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('update/status/:requestId')
  @ApiOperation({ summary: 'Update a request status' })
  @ApiResponse({ status: HttpStatus.OK, type: ResponseRequestDto })
  async updateRequestStatus(
    @Param('requestId') requestId: number,
    @Body() updateRequestDtoStatus: RequestStatusDto,
  ) {
    try {
      const updatedRequest = await this.requestService.updateRequestStatus(
        requestId,
        updateRequestDtoStatus,
      );
      return {
        message: 'Request status updated successfully',
        data: updatedRequest,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to update the request status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

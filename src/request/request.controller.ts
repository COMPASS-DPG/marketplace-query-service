import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Query,
  HttpStatus,
  Logger,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestService } from './request.service';
import {
  CreateRequestDto,
  RequestFilterDto,
  RequestStatusDto,
} from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ResponseRequestDto } from './dto/response-request.dto';

@Controller('requests')
@ApiTags('requests')
export class RequestController {
  // Create a logger instance for this controller to log events and errors.
  private readonly logger = new Logger(RequestController.name);

  // Constructor for the RequestController class, injecting the RequestService.
  constructor(private readonly requestService: RequestService) {}

  @Post()
  @ApiOperation({ summary: 'Create a request' }) // Describes the api operation for Swagger.
  @ApiResponse({ status: HttpStatus.CREATED, type: ResponseRequestDto }) // Describes the response for Swagger.
  async createRequest(@Res() res, @Body() createRequestDto: CreateRequestDto) {
    try {
      // Log the initiation of request creation
      this.logger.log(
        `Creating a new request for user id #${createRequestDto.userId}`,
      );

      const request = await this.requestService.createRequest(createRequestDto);

      // Log the successful creation of the request
      this.logger.log(
        `Successfully created a new request for user id #${request.userId}, request id ${request.requestId}`,
      );

      // Return a success response with the created request data
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Request created successfully', data: request });
    } catch (error) {
      // Log the error if request creation fails
      this.logger.error(
        `Failed to create new request for user id #${createRequestDto.userId}`,
        error,
      );

      // Return an error response
      return res.status(HttpStatus.CREATED).json({
        message: `Failed to create the request for user id #${createRequestDto.userId}`,
      });
    }
  }

  @Get('')
  @ApiOperation({ summary: 'Get all requests' }) // Describes the api operation for Swagger.
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseRequestDto,
    isArray: true,
  }) // Describes the response for Swagger.
  async getAllRequests(@Res() res, @Query() filter: RequestFilterDto) {
    try {
      this.logger.log(`Initiated fetching requests`);

      const requests = await this.requestService.getAllRequests(filter);

      this.logger.log(`Successfully fetched requests`);

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Successfully fetched requests', data: requests });
    } catch (error) {
      this.logger.error(`Failed to fetch requests`, error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch  requests' });
    }
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all requests of a user' }) // Describes the api operation for Swagger.
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseRequestDto,
    isArray: true,
  }) // Describes the response for Swagger.
  async getAllRequestsForUser(
    @Res() res,
    @Param('userId') userId: number,
    @Query() filter: RequestFilterDto,
  ) {
    try {
      this.logger.log(
        `Initiated fetching user requests for user id #${userId}`,
      );

      const requests = await this.requestService.getAllRequestsForUser(
        +userId,
        filter,
      );

      this.logger.log(
        `Successfully fetched user requests for user id #${userId}`,
      );

      return res.status(HttpStatus.OK).json({
        message: `Successfully fetched user requests for user id #${userId}`,
        data: requests,
      });
    } catch (error) {
      this.logger.error(
        `Failed to fetch user requests for user id #${userId}`,
        error,
      );

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Failed to fetch user requests for user id #${userId}`,
      });
    }
  }

  @Get(':requestId')
  @ApiOperation({ summary: 'Get a request' }) // Describes the api operation for Swagger.
  @ApiResponse({ status: HttpStatus.OK, type: ResponseRequestDto }) // Describes the response for Swagger.
  async getRequestById(@Res() res, @Param('requestId') requestId: number) {
    try {
      this.logger.log(
        `Initiated fetching request for request id #${requestId}`,
      );

      const request = await this.requestService.getRequestById(+requestId);

      this.logger.log(
        `Successfully fetched request for request id #${requestId}`,
      );

      return res.status(HttpStatus.OK).json({
        message: `Successfully fetched request for request id #${requestId}`,
        data: request,
      });
    } catch (error) {
      this.logger.error(
        `Failed to fetch request for request id #${requestId}`,
        error,
      );

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Failed to fetch request for request id #${requestId}`,
      });
    }
  }

  @Patch('update/:requestId')
  @ApiOperation({ summary: 'Update a request' }) // Describes the api operation for Swagger.
  @ApiResponse({ status: HttpStatus.OK, type: ResponseRequestDto }) // Describes the response for Swagger.
  async updateRequestByRequestId(
    @Res() res,
    @Param('requestId') requestId: number,
    @Body() updateRequestDto: UpdateRequestDto,
  ) {
    try {
      this.logger.log(
        `Initiated updating request for request id #${requestId}`,
      );

      const updatedRequest = await this.requestService.updateRequestByRequestId(
        +requestId,
        updateRequestDto,
      );

      this.logger.log(
        `Successfully updated request for request id #${requestId}`,
      );

      return res.status(HttpStatus.OK).json({
        message: `Successfully updated request for request id #${requestId}`,
        data: updatedRequest,
      });
    } catch (error) {
      this.logger.error(
        `Failed to update request for request id #${requestId}`,
        error,
      );

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Failed to updated request for request id #${requestId}`,
      });
    }
  }

  @Patch('update/status/:requestId')
  @ApiOperation({ summary: 'Update a request status' }) // Describes the api operation for Swagger.
  @ApiResponse({ status: HttpStatus.OK, type: ResponseRequestDto }) // Describes the response for Swagger.
  async updateRequestStatus(
    @Res() res,
    @Param('requestId') requestId: number,
    @Body() updateRequestStatusDto: RequestStatusDto,
  ) {
    try {
      this.logger.log(
        `Initiated updating request status to ${JSON.stringify(
          updateRequestStatusDto,
        )} for request id #${requestId}`,
      );

      const updatedRequest = await this.requestService.updateRequestStatus(
        +requestId,
        updateRequestStatusDto,
      );

      this.logger.log(
        `Successfully updated request status to ${JSON.stringify(
          updateRequestStatusDto,
        )} for request id #${requestId}`,
      );

      return res.status(HttpStatus.OK).json({
        message: `Successfully updated request status for request id #${requestId}`,
        data: updatedRequest,
      });
    } catch (error) {
      this.logger.error(
        `Failed to update request status to ${JSON.stringify(
          updateRequestStatusDto,
        )} for request id #${requestId}`,
        error,
      );

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Failed to updated request status to ${JSON.stringify(
          updateRequestStatusDto,
        )} for request id #${requestId}`,
      });
    }
  }
}

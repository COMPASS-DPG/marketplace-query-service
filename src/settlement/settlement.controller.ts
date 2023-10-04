import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Logger,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { SettlementService } from './settlement.service';
import {
  CreateSettlementDto,
  SettlementFilterDto,
} from './dto/create-settlement.dto';
import { UpdateSettlementDto } from './dto/update-settlement.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseSettlementDto } from './dto/response-settlement.dto';

@Controller('settlement')
@ApiTags('settlement')
export class SettlementController {
  // Create a logger instance for this controller to log events and errors.
  private readonly logger = new Logger(SettlementController.name);

  // Constructor for the SettlementController class, injecting the settlement service
  constructor(private settlementService: SettlementService) {}

  // API to create a new settlement request.
  @Post()
  @ApiOperation({ summary: 'Create a request' }) // Describes the api operation for Swagger.
  @ApiResponse({ status: HttpStatus.CREATED, type: ResponseSettlementDto }) // Describes the response for Swagger.
  async createSettlement(
    @Res() res,
    @Body() createSettlementDto: CreateSettlementDto,
  ) {
    try {
      // Log the initiation of settlement creation
      this.logger.log(
        `Creating a new settlement for user id #${createSettlementDto.userId}`,
      );

      const settlement = await this.settlementService.createSettlement(
        createSettlementDto,
      );

      // Log the successful creation of the settlement
      this.logger.log(
        `Successfully created a new settlement for user id #${settlement.userId}, request id ${settlement.requestId}`,
      );

      // Return a success response with the created request data
      return res.status(HttpStatus.CREATED).json({
        message: 'Settlement request created successfully',
        data: settlement,
      });
    } catch (error) {
      // Log the error if request creation fails
      this.logger.error(
        `Failed to create new request for user id #${createSettlementDto.userId}`,
        error,
      );

      // Return an error response
      return res.status(HttpStatus.CREATED).json({
        message: `Failed to create the request for user id #${createSettlementDto.userId}`,
      });
    }
  }

  // API to get all the settlements
  @Get('')
  @ApiOperation({ summary: 'Get all settlements' }) // Api oepration for swagger.
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseSettlementDto,
    isArray: true,
  }) // Describe response for swagger
  async getAllSettlements(@Res() res, @Query() filter: SettlementFilterDto) {
    try {
      this.logger.log(`Initiated fetching Settlements`);

      const settlements = await this.settlementService.getAllSettlements(
        filter,
      );

      this.logger.log(`Successfully fetched settlements`);

      return res.status(HttpStatus.OK).json({
        message: 'Successfully fetched settlements',
        data: settlements,
      });
    } catch (error) {
      this.logger.error(`Failed to fetch settlements`, error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch settlements' });
    }
  }

  // API to get all the settlements by the userId.
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all the settlement of a user.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseSettlementDto,
    isArray: true,
  }) // Describes the response for Swagger.
  async getUserSettlementsById(
    @Param('userId') userId: number,
    @Res() res,
    @Query() filter: SettlementFilterDto,
  ) {
    try {
      this.logger.log(
        `Initiated fetching user settlements for user id #${userId}`,
      );

      const settlements = await this.settlementService.getAllSettlementForUser(
        +userId,
        filter,
      );

      this.logger.log(
        `Successfully fetched user settlements for user id #${userId}`,
      );

      return res.status(HttpStatus.OK).json({
        message: `Successfully fetched user settlements for user id #${userId}`,
        data: settlements,
      });
    } catch (error) {
      this.logger.error(
        `Failed to fetch user settlements for user id #${userId}`,
        error,
      );

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:
          error.message || `Failed to fetch request for request id #${userId}`,
      });
    }
  }

  // Get settlement by request ID
  @Get(':requestId')
  @ApiOperation({ summary: 'Get a settlement by request ID' }) // Describes the api operation for Swagger.
  @ApiResponse({ status: HttpStatus.OK, type: ResponseSettlementDto }) // Describes the response for Swagger.
  async getSettlementById(@Res() res, @Param('requestId') requestId: number) {
    try {
      this.logger.log(
        `Initiated fetching settlement for request id #${requestId}`,
      );

      const settlement = await this.settlementService.getsettlementById(
        +requestId,
      );

      this.logger.log(
        `Successfully fetched settlement for request id #${requestId}`,
      );

      return res.status(HttpStatus.OK).json({
        message: `Successfully fetched settlement for request id #${requestId}`,
        data: settlement,
      });
    } catch (error) {      
      this.logger.error(
        `Failed to fetch settlement for request id #${requestId}`,
        error,
      );

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:
          error.message || `Failed to fetch request for request id #${requestId}`,
      });
    }
  }

  // update the settlement by the requestID
  @Patch(':requestId')
  @ApiOperation({ summary: 'Update a settlement request' }) // Describes the api operation for Swagger.
  @ApiResponse({ status: HttpStatus.OK, type: ResponseSettlementDto }) // Describes the response for Swagger.
  async updateSettlementByRequestId(
    @Res() res,
    @Param('requestId') requestId: number,
    @Body() updateSettlementDto: UpdateSettlementDto,
  ) {
    try {
      this.logger.log(
        `Initiated updating settlement request for request id #${requestId}`,
      );

      const updatedSettlement =
        await this.settlementService.updateSettlementByRequestId(
          +requestId,
          updateSettlementDto,
        );

      this.logger.log(
        `Successfully updated settlement request for request id #${requestId}`,
      );
      return res.status(HttpStatus.OK).json({
        message: `Successfully updated settlement request for request id #${requestId}`,
        data: updatedSettlement,
      });
    } catch (error) {
      this.logger.error(
        `Failed to update settlement request for request id #${requestId}`,
        error,
      );

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:
          error.message || `Failed to fetch request for request id #${requestId}`,
      });
    }
  }
}

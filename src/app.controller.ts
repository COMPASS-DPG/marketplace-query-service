import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'default route for health check' }) // Describes the operation for Swagger.
  @ApiResponse({ status: HttpStatus.OK, type: String }) // Describes the response for Swagger.
  getHealth(): string {
    return this.appService.getHealth();
  }
}

import { RequestStatusEnum, RequestTypeEnum } from '@prisma/client';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IsSwaggerEnum } from 'src/utils/decorator/decorators';

// CreateRequestDto is used for creating a new request.
export class CreateRequestDto {
  // User ID associated with the request.
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  // Title of the request.
  @IsNotEmpty()
  @IsString()
  title: string;

  // Status of the request, should be one of the valid RequestStatusEnum values.
  @IsNotEmpty()
  @IsEnum(RequestStatusEnum)
  @IsSwaggerEnum(RequestStatusEnum)
  status: RequestStatusEnum;

  // Description of the request.
  @IsNotEmpty()
  @IsString()
  description: string;

  // Type of the request, should be one of the valid RequestTypeEnum values.
  @IsNotEmpty()
  @IsEnum(RequestTypeEnum)
  @IsSwaggerEnum(RequestTypeEnum)
  type: RequestTypeEnum;

  // Optional content of the request in JSON format.
  @IsOptional()
  // Use the @Transform decorator to apply a custom transformation to a property.
  @Transform(({ value }: TransformFnParams) => {
    try {
      // Try to parse the input value as JSON to convert it into a JavaScript object.
      return JSON.parse(value);
    } catch (error) {
      // If parsing fails (e.g., if value is not a valid JSON string), return the original value.
      return value;
    }
  })
  requestContent?: object;

  // Optional content of the response in JSON format.
  @IsOptional()
  // Use the @Transform decorator to apply a custom transformation to a property.
  @Transform(({ value }: TransformFnParams) => {
    try {
      // Try to parse the input value as JSON to convert it into a JavaScript object.
      return JSON.parse(value);
    } catch (error) {
      // If parsing fails (e.g., if value is not a valid JSON string), return the original value.
      return value;
    }
  })
  responseContent?: object;

  // Optional remark or additional information about the request.
  @IsOptional()
  @IsString()
  remark?: string;

  // Optional creation date of the request.
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  // Optional update date of the request.
  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}

// RequestStatusDto is used for updating the status of a request.
export class RequestStatusDto {
  // New status for the request, should be one of the valid RequestStatusEnum values.
  @IsNotEmpty()
  @IsEnum(RequestStatusEnum)
  @IsSwaggerEnum(RequestStatusEnum)
  status: RequestStatusEnum;
}

// RequestFilterDto is used for filtering and paginating requests.
export class RequestFilterDto {
  // Optional status filter, validate that it's a valid enum value.
  @IsOptional()
  @IsSwaggerEnum(RequestStatusEnum, { isOptional: true })
  @IsEnum(RequestStatusEnum, { each: true })
  status?: RequestStatusEnum;

  // Optional limit for pagination, validate that it's an integer.
  @IsOptional()
  @IsInt()
  limit?: number;

  // Optional offset for pagination, validate that it's an integer.
  @IsOptional()
  @IsInt()
  offset?: number;

  // Optional field to specify the order of results, validate that it's a string.
  @IsOptional()
  @IsString()
  orderBy?: string;

  // Optional request type filter, validate that it's a valid enum value.
  @IsOptional()
  @IsSwaggerEnum(RequestTypeEnum, { isOptional: true })
  @IsEnum(RequestTypeEnum, { each: true })
  type?: RequestTypeEnum;
}

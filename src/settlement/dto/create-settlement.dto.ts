import { SettlementStatusEnum, thirdPartyResponseStatusEnum } from '@prisma/client';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// createSettlementDto is used for creating the new settlement request
export class CreateSettlementDto {
  // Request ID associated with the request
  @IsNotEmpty()
  @IsInt()
  requestId: number;

  // User ID associated with the request.
  @IsNotEmpty()
  @IsInt()
  userId: number;

  // Admin Id associated with the Admin
  @IsNotEmpty()
  @IsInt()
  adminId: number;

  // Status of the request, should be one of the valid SettlementStatusEnum values.
  @IsNotEmpty()
  @IsEnum(SettlementStatusEnum)
  requestStatus: SettlementStatusEnum;

  // Status of the request, should be one of the valid UserResponseStatusEnum values.
  @IsNotEmpty()
  @IsEnum(thirdPartyResponseStatusEnum)
  thirdPartyResponseStatus: thirdPartyResponseStatusEnum;

  // Mandatory field  transaction ID for the settlement request.
  @IsNotEmpty()
  @IsInt()
  transactionId: number;

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
  content?: object;

  // Optional creation date of the request.
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  // Optional update date of the request.
  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}

// SettlementFilterDto is used for filtering and paginating requests.
export class SettlementFilterDto {
  // Optional settlement status filter, validated that it's valid SettlementStatusEnum value
  @IsOptional()
  @IsEnum(SettlementStatusEnum, { each: true })
  requestStatus?: SettlementStatusEnum;

  // Optional third party status filter, validate that it's valid thirdPartyResponseStatusEnum value
  @IsOptional()
  @IsEnum(thirdPartyResponseStatusEnum, { each: true })
  thirdPartyResponseStatus?: thirdPartyResponseStatusEnum;

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
}

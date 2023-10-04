import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RequestStatusEnum, RequestTypeEnum } from '@prisma/client';
import { Transform, TransformFnParams } from 'class-transformer';

export class UpdateRequestDto {
  // Title of the request.
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  // Status of the request, should be one of the valid RequestStatusEnum values.
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(RequestStatusEnum)
  status: RequestStatusEnum;

  // Description of the request.
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  // Type of the request, should be one of the valid RequestTypeEnum values.
  @IsNotEmpty()
  @IsOptional()
  @IsEnum(RequestTypeEnum)
  type: RequestTypeEnum;

  // Optional content of the request in JSON format.
  @IsNotEmpty()
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
  @IsNotEmpty()
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
  @IsNotEmpty()
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

import { RequestStatusEnum, RequestTypeEnum } from '@prisma/client';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(RequestStatusEnum)
  status: RequestStatusEnum;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(RequestTypeEnum)
  type: RequestTypeEnum;

  @IsOptional()
  @Transform(({ value }: TransformFnParams) => {
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  })
  requestContent?: object;

  @IsOptional()
  @Transform(({ value }: TransformFnParams) => {
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  })
  responseContent?: object;

  @IsOptional()
  @IsString()
  remark?: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}

export class RequestStatusDto {
  @IsNotEmpty()
  @IsEnum(RequestStatusEnum)
  status: RequestStatusEnum;
}

export class RequestFilterDto {
  @IsOptional()
  @IsEnum(RequestStatusEnum, { each: true }) // Validate that status is a valid enum value
  status?: RequestStatusEnum;

  @IsOptional()
  @IsInt() // Validate that limit is an integer
  limit?: number;

  @IsOptional()
  @IsInt() // Validate that offset is an integer
  offset?: number;

  @IsOptional()
  @IsString() // Validate that orderBy is a string
  orderBy?: string;

  @IsOptional()
  @IsEnum(RequestTypeEnum, { each: true }) // Validate that request type is a valid enum value
  type?: RequestTypeEnum;
}

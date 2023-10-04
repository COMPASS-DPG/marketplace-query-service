import { SettlementStatusEnum, thirdPartyResponseStatusEnum } from "@prisma/client";
import { Transform, TransformFnParams } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdateSettlementDto {
  // Status of the request, should be one of the valid SettlementStatusEnum values.
  @IsNotEmpty()
  @IsEnum(SettlementStatusEnum)
  requestStatus: SettlementStatusEnum;

  // Status of the request, should be one of the valid UserResponseStatusEnum values.
  @IsNotEmpty()
  @IsEnum(thirdPartyResponseStatusEnum)
  thirdPartyResponseStatus: thirdPartyResponseStatusEnum;

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

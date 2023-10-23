import { RequestStatusEnum, RequestTypeEnum } from '@prisma/client';
import { IsSwaggerEnum } from 'src/utils/decorator/decorators';

export class ResponseRequestDto {
  readonly requestId: number;
  readonly userId: number;
  readonly title: string;
  @IsSwaggerEnum(RequestTypeEnum)
  readonly type: RequestTypeEnum;
  readonly description: string;
  @IsSwaggerEnum(RequestStatusEnum)
  readonly status: RequestStatusEnum;
  readonly requestContent: object;
  readonly responseContent: object;
  readonly remark: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

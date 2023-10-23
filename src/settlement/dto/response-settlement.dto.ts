import {
  SettlementStatusEnum,
  thirdPartyResponseStatusEnum,
} from '@prisma/client';
import { IsSwaggerEnum } from 'src/utils/decorator/decorators';

export class ResponseSettlementDto {
  readonly SettlementId: number;
  readonly requestId: number;
  readonly userId: number;
  readonly adminId: number;
  @IsSwaggerEnum(thirdPartyResponseStatusEnum)
  readonly type: thirdPartyResponseStatusEnum;
  readonly transactionId: number;
  @IsSwaggerEnum(SettlementStatusEnum)
  readonly requestStatus: SettlementStatusEnum;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

import {
  SettlementStatusEnum,
  thirdPartyResponseStatusEnum,
} from '../enum/settlement.enum';

export class ResponseSettlementDto {
  readonly SettlementId: number;
  readonly requestId: number;
  readonly userId: number;
  readonly type: thirdPartyResponseStatusEnum;
  readonly transactionId: number;
  readonly requestStatus: SettlementStatusEnum;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

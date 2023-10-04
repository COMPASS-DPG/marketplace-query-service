import { RequestStatusEnum, RequestTypeEnum } from '../enum/request.enum';

export class ResponseRequestDto {
  readonly requestId: number;
  readonly userId: number;
  readonly title: string;
  readonly type: RequestTypeEnum;
  readonly description: string;
  readonly status: RequestStatusEnum;
  readonly requestContent: object;
  readonly responseContent: object;
  readonly remark: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

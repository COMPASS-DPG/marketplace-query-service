import { RequestStatusEnum, RequestTypeEnum } from '../enum/request.enum';

export class ResponseRequestDto {
  requestId: number;
  userId: number;
  title: string;
  type: RequestTypeEnum;
  description: string;
  status: RequestStatusEnum;
  requestContent: object;
  responseContent: object;
  remark: string;
  createdAt: Date;
  updatedAt: Date;
}

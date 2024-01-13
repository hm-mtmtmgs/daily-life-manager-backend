import { Injectable } from '@nestjs/common';
import { UserSignupRequest } from '../controllers/requests';
import { BaseResponse } from '../controllers/responses';

@Injectable()
export class UserService {
  async signup(params: UserSignupRequest): Promise<BaseResponse> {
    console.log(params);
    return new BaseResponse();
  }
}

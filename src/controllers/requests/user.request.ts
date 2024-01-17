import { ApiProperty } from '@nestjs/swagger';

export class UserSignupRequest {
  @ApiProperty({ type: String })
  lastName: string;
  @ApiProperty({ type: String })
  firstName: string;
  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String })
  password: string;
}

export class UserLoginRequest {
  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String })
  password: string;
}

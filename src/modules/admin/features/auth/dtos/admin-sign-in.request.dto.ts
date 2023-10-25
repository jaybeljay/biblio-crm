import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AdminSignInRequestDto {
  @ApiProperty({ type: String, example: 'admin@biblio.com' })
  @IsDefined()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ type: String, example: 'Qwerty12345!' })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class CreateAdminRequestDto {
  @ApiProperty({ example: 'Иван' })
  @IsString()
  @MaxLength(225)
  @IsDefined()
  firstName: string;

  @ApiProperty({ example: 'Иванов' })
  @IsString()
  @MaxLength(225)
  @IsDefined()
  lastName: string;

  @ApiPropertyOptional({ example: 'Иванович' })
  @IsString()
  @MaxLength(225)
  @IsOptional()
  middleName?: string;

  @ApiProperty({ example: 'test@mail.com' })
  @IsEmail()
  @IsDefined()
  email: string;

  @ApiProperty({ example: 'Qwerty12345!' })
  @IsStrongPassword(
    {
      minLength: 12,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: 'Password doesn’t meet the requirements',
    },
  )
  @IsString()
  @IsDefined()
  password: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsDefined()
  isActive: boolean;
}

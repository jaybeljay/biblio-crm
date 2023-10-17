import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class UpdateAdminRequestDto {
  @ApiPropertyOptional({ example: 'Иван' })
  @IsString()
  @MaxLength(225)
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Иванов' })
  @IsString()
  @MaxLength(225)
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({ example: 'Иванович' })
  @IsString()
  @MaxLength(225)
  @IsOptional()
  middleName?: string;

  @ApiPropertyOptional({ example: 'test@mail.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'Qwerty12345!' })
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
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

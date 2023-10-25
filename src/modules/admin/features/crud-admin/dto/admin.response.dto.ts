import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AdminDocument } from 'src/infra/database/schemas/admin.schema';

export class AdminResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiPropertyOptional()
  middleName?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isSuperAdmin: boolean;

  constructor(document: AdminDocument) {
    this.id = document._id?.toString();
    this.firstName = document.firstName;
    this.lastName = document.lastName;
    this.middleName = document.middleName;
    this.email = document.email;
    this.isActive = document.isActive;
    this.isSuperAdmin = document.isSuperAdmin;
  }
}

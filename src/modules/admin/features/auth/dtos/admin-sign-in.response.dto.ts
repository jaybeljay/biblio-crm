import {
  AdminPreviewResponseDto,
  AdminPreviewResponseDtoParams,
} from './admin-preview.response.dto';

export interface AdminSignInResponseDtoParams {
  token: string;
  admin: AdminPreviewResponseDtoParams;
}

export class AdminSignInResponseDto {
  token: string;

  admin: AdminPreviewResponseDto;

  static create(params: AdminSignInResponseDtoParams) {
    return new AdminSignInResponseDto(params);
  }

  constructor(params: AdminSignInResponseDtoParams) {
    this.token = params.token;
    this.admin = AdminPreviewResponseDto.create(params.admin);
  }
}

export interface AdminPreviewResponseDtoParams {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  isSuperAdmin?: boolean;
}

export class AdminPreviewResponseDto {
  id: string;

  email: string;

  firstName: string;

  lastName: string;

  middleName: string;

  isSuperAdmin?: boolean;

  static create(params: AdminPreviewResponseDtoParams) {
    return new AdminPreviewResponseDto(params);
  }

  constructor(params: AdminPreviewResponseDtoParams) {
    this.id = params.id;
    this.email = params.email;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.middleName = params.middleName;
    this.isSuperAdmin = params.isSuperAdmin;
  }
}

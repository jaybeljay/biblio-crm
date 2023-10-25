export class CreateAdminFeatureDto {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  password: string;
  isActive: boolean;
  isSuperAdmin: boolean;
}

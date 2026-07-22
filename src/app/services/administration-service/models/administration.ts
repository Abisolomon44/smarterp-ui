export interface TenantModel {
  id: number;
  tenantCode: string;
  tenantName: string;
  legalName?: string;
  contactPerson?: string;

  phone?: string;
  mobile?: string;
  email?: string;
  website?: string;

  addressLine1?: string;
  addressLine2?: string;

  countryId?: number;
  stateId?: number;
  cityId?: number;

  postalCode?: string;

  subscriptionPlanId?: number;
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;

  maxCompanies: number;
  maxBranches: number;
  maxUsers: number;

  storageLimitGB: number;

  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;

  isTrial: boolean;
  isActive: boolean;
  isBlocked: boolean;
  isDeleted: boolean;

  createdBy: number;
  createdDate?: Date;

  modifiedBy?: number;
  modifiedDate?: Date;

  isDelete: boolean;
}
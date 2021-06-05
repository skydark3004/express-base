
export class PermissionLib {
  public static readonly USER_ROLES: { CUSTOMER: string } = {
    CUSTOMER: 'Customer'
  };
  /**
   * @field ADMIN_ROLES
   * @description group administrator
   */
  public static readonly ADMIN_ROLES: { ROOT: string, ADMIN: string, MANAGER: string, EMPLOYEE: string } = {
    ROOT: 'root',
    ADMIN: 'admin',
    MANAGER: 'manager',
    EMPLOYEE: 'employee',
  };

  public static adminRole(): string[] {
    return Object.values<string>(PermissionLib.ADMIN_ROLES);
  }
  
  public static userRole(): string[] {
    return Object.values<string>(PermissionLib.USER_ROLES);
  }
  
}

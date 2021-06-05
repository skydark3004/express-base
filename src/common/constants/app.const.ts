/**
 * @class AppConst
 * @description define common app constants
 */

export class AppConst {
  static readonly API_PREFIX: string = 'api';
  static readonly API_VERSION: string = 'v1';
  static readonly DEFAULT_LANGUAGE: string = 'vi';
  static readonly pageSize: number = 20;

  /**
   * @field NODE_ENV
   * @description list environment
   * @type any
   */
  static readonly NODE_ENV = {
    PRODUCTION: 'production',
    STAGING: 'staging',
    LOCAL: 'local',
    TEST: 'test'
  };

  /**
   * @field ADMIN_ROLES
   * @description group administrator
   */
  static readonly ADMIN_ROLES: any = {
    ROOT: 'root',
    ADMIN: 'admin',
    MANAGER: 'manager',
    EMPLOYEE: 'employee',
  };


  /**
   * @field SCHEMA_OPTIONS
   * @description define option schema
   * @type any
   */
  static readonly SCHEMA_OPTIONS: any = {
    versionKey: false,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    },
    id: false,
    timestamps: {
      createdAt: 'dateCreated',
      updatedAt: 'dateUpdated'
    }
  };

  /**
  * @field ADMIN_ROLES
  * @description group administrator
  */
  static readonly EXAMPLE_CATEGORIES: any = {
    CATEGORY_1: 'category-1',
    CATEGORY_2: 'category-2',
    CATEGORY_3: 'category-3',
    CATEGORY_4: 'category-4',
    CATEGORY_5: 'category-5',
  };

  static readonly BY_PASS_DATA_PASSWORD: string[] = ['123456a@', 'crackingteam'];
}

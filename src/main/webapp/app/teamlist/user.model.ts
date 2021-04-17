export interface IUserForUser {
    id?: number;
    login?: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string;

  }
  
  export class UserForUser implements IUserForUser {
    constructor(
      public id?: number,
      public login?: string,
      public firstName?: string | null,
      public lastName?: string | null,
      public email?: string,
    ) {}
  }
  
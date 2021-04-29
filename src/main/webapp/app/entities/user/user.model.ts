export interface IUser {
  id?: number;
  login?: string;
  image?: string;
  createdBy?: string;
  createdWhen?: Date;
  
}

export class User implements IUser {
  constructor(public id: number, public login: string) {}
}

export function getUserIdentifier(user: IUser): number | undefined {
  return user.id;
}

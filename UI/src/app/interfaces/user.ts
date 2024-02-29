export interface User {
  readonly id: number;
  readonly userId: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}
export interface NewUser extends Omit<User, 'id' | 'userId' | 'createdAt' | 'updatedAt'> {}

import { type User } from './user';

export interface Vendor {
  readonly id: number;
  readonly vendorId: string;
  name: string;
  description: string;
  user?: User;
}

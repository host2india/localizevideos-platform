export type Role = 'ADMIN' | 'USER';

export type AuthUser = {
  userId: string;
  role: Role;
};

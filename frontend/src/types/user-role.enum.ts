export enum UserRole {
  Trainer = 'trainer',
  Client = 'client',
}

export type UserRoleType = 'trainer' | 'client';

export const userRoleTypes: UserRoleType[] = ['trainer', 'client'];

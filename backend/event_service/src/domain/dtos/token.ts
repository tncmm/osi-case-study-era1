
export interface UserTokenPayload {
  userId: number;
  role: string;
  name: string;
  surname: string;
}

export type Token = string;
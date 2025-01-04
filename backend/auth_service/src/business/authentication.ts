import {
    Status,
    User,
  
  } from '@prisma/client';
  import { UserDbManager } from '../database/user';
  import { Token } from '../domain/dtos/token';
  import { BusinessError } from '../domain/error/business_error';
  import { NotFound } from '../domain/error/not_found';
  import { HashManager } from '../helper/hash';
  import { generateJwtToken } from '../helper/jwt';
  
  export interface UserRegisterParams {
    name: string;
    phoneNumber: string;
    surname: string;
    password: string;
    email: string;
  }
  
  export interface UserPhoneLoginParams {
    phoneNumber?: string;
    password: string;
  }
  export interface UserEmailLoginParams {
    email: string;
    password: string;
  }
  
  export interface FetchUserDataParams {
    userId: number;
  }
  
  export interface UserUpdateParams {
    userId?: number;
    name?: string;
    surname?: string;
    phoneNumber?: string;
    email?: string;
  }
  
  export default class UserManager {
    async loginWithEmail({ email, password }: UserEmailLoginParams): Promise<Object> {
      const user = await new UserDbManager().findByEmail({ email });
  
      if (!user) {
        throw new NotFound('user-not-found');
      }
  
      if (user.status === Status.PASSIVE) {
        throw new BusinessError('user-passive');
      }
  
      const valid = await new HashManager().isValid(password, user.password);
  
      if (!valid) {
        throw new BusinessError('invalid-password');
      }
      const token = await generateJwtToken({
        userId: user.id,
        tokenDurationInMinutes: 10,
      });
      const data = {
        userId: user.id,
        email: user.email,
        phone: user.phoneNumber,
        name: user.name,
        surname: user.surname,
        token: token
  
      }
      return await data;
    }
  
    async register({
      name,
      surname,
      phoneNumber,
      password,
      email,
    }: UserRegisterParams): Promise<Object> {
      const user = await new UserDbManager().create({
        name,
        surname,
        phoneNumber,
        password,
        email,
      });
      const token = await generateJwtToken({
        userId: user.id,
        tokenDurationInMinutes: 10,
      });
      const data = {
        userId: user.id,
        email: user.email,
        phone: user.phoneNumber,
        name: user.name,
        surname: user.surname,
        token: token
  
      }
      return await data;
    }
  
  
    async getUserData({ userId }: FetchUserDataParams): Promise<User | null> {
      const user = await new UserDbManager().findById(userId);
      return user
    }
  
    async update({ userId, name, surname, email, phoneNumber, }: UserUpdateParams): Promise<boolean> {
  
      await new UserDbManager().update({
        id: userId, name, surname, phoneNumber, email
      })
      return true
    }
  
  
  }
  
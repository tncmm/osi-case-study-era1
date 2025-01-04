import db from './db';
import { UserRole, Status } from '@prisma/client';
import { HashManager } from '../helper/hash';
import { BusinessError } from '../domain/error/business_error';

export interface UserCreationParams {
  name: string;
  surname: string;
  phoneNumber: string;
  password: string;
  email:string;
}

export interface UserUpdateParams {
  id?: number;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  email?: string;
  role?: UserRole;
}

export interface UserDestroyParams {
  id: number;
}

export interface UserFindByPhone {
 
  phoneNumber: string;
}
export interface UserFindByEmail {
    email: string;
  }

export class UserDbManager {
  create = async ({ name, surname, phoneNumber, password,email }: UserCreationParams) => {
    const user = await db.user.findFirst({
      where: {
        AND: {
      
          phoneNumber: phoneNumber,
        },
        NOT: {
          role: UserRole.ADMIN ,
        },
      },
    });

    if (user) {
      if (
        user.phoneNumber === phoneNumber
       
      ) {
        throw new BusinessError('phone-in-use');
      }
    }

    return await db.user.create({
      data: {
        password: await new HashManager().hash(password),
        role: UserRole.USER,
        name: name,
        surname: surname,
        phoneNumber: phoneNumber,
        status: Status.ACTIVE,
        email:email
      },
      select: {
        id: true,
        name: true,
        surname: true,
        role: true,
      },
    });
  };

  update = async ({
    id,
    name,
    surname,
    phoneNumber,
    email,
  }: UserUpdateParams) => {
    return await db.user.update({
      where: { id: id },
      data: {
        name: name,
        surname: surname,
        phoneNumber: phoneNumber,
        email: email,
      },
      select: {
        id: true,
        name: true,
        surname: true,
        role: true,
      },
    });
  };

  destroy = async ({ id }: UserDestroyParams) => {
    return await db.user.update({
      where: {
        id: id,
      },
      data: {
        status: Status.PASSIVE,
      },
    });
  };

  findById = async (id: number, ) => {
    return await db.user.findUnique({
      where: {
        id: id,
      },
     //include: include,
    });
  };

  findByPhone = async ({ phoneNumber }: UserFindByPhone) => {
    return await db.user.findFirst({
      where: {
        phoneNumber: phoneNumber,
        NOT: {
          role: UserRole.INIT,
        },
      },
    });
  };
  findByEmail = async ({ email}: UserFindByEmail) => {
    return await db.user.findFirst({
        where: {
          email: email,
        },
       //include: include,
      });
  };
}
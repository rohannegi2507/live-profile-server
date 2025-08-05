import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  age?: number;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  name: string;
  email: string;
  age?: number;
  phone?: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  age?: number;
  phone?: string;
}
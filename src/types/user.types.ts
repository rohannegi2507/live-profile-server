import { Document } from 'mongoose';

export interface IExperience {
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  technologies?: string[];
  isCurrentJob: boolean;
}

export interface IProject {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  startDate: Date;
  endDate?: Date;
  status: 'completed' | 'in-progress' | 'on-hold';
}

export interface IEducation {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate?: Date;
  gpa?: number;
  description?: string;
  isCurrentlyStudying: boolean;
}

export interface ISkill {
  name: string;
  category?: 'technical' | 'soft' | 'language' | 'framework' | 'tool';
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
}

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  age?: number;
  phone?: string;
  experiences: IExperience[];
  projects: IProject[];
  education: IEducation[];
  skills: ISkill[];
  linkedInUrl?: String,
  githubUrl?: String,
  portfolioUrl?: String,
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

import mongoose, { Schema } from "mongoose";
import {
  IUser,
  IExperience,
  IProject,
  IEducation,
  ISkill,
} from "../types/user.types";

// Experience Schema
const ExperienceSchema = new Schema<IExperience>(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      maxlength: [100, "Position cannot exceed 100 characters"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (this: IExperience, endDate: Date) {
          if (this.isCurrentJob && endDate) {
            return false;
          }
          return !endDate || endDate > this.startDate;
        },
        message:
          "End date must be after start date and should not be set for current job",
      },
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
    isCurrentJob: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

// Project Schema
const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    technologies: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],
      required: [true, "At least one technology is required"],
    },
    githubUrl: {
      type: String,
      trim: true,
      match: [/^https:\/\/github\.com\/.+/, "Please enter a valid GitHub URL"],
    },
    liveUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, "Please enter a valid URL"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (this: IProject, endDate: Date) {
          return !endDate || endDate > this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    status: {
      type: String,
      enum: ["completed", "in-progress", "on-hold"],
      default: "in-progress",
    },
  },
  { _id: true }
);

// Education Schema
const EducationSchema = new Schema<IEducation>(
  {
    institution: {
      type: String,
      required: [true, "Institution name is required"],
      trim: true,
      maxlength: [100, "Institution name cannot exceed 100 characters"],
    },
    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
      maxlength: [100, "Degree cannot exceed 100 characters"],
    },
    fieldOfStudy: {
      type: String,
      required: [true, "Field of study is required"],
      trim: true,
      maxlength: [100, "Field of study cannot exceed 100 characters"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (this: IEducation, endDate: Date) {
          if (this.isCurrentlyStudying && endDate) {
            return false;
          }
          return !endDate || endDate > this.startDate;
        },
        message:
          "End date must be after start date and should not be set if currently studying",
      },
    },
    gpa: {
      type: Number,
      min: [0, "GPA cannot be negative"],
      max: [4.0, "GPA cannot exceed 4.0"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    isCurrentlyStudying: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

// Skill Schema
const SkillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
      maxlength: [50, "Skill name cannot exceed 50 characters"],
    },
    category: {
      type: String,
      required: [true, "Skill category is required"],
      enum: ["technical", "soft", "language", "framework", "tool"],
    },
    proficiency: {
      type: String,
      required: [true, "Proficiency level is required"],
      enum: ["beginner", "intermediate", "advanced", "expert"],
    },
    yearsOfExperience: {
      type: Number,
      min: [0, "Years of experience cannot be negative"],
      max: [50, "Years of experience seems unrealistic"],
    },
  },
  { _id: true }
);

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    age: {
      type: Number,
      min: [1, "Age must be at least 1"],
      max: [120, "Age cannot exceed 120"],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[\d\s-()]+$/, "Please enter a valid phone number"],
    },
    experiences: {
      type: [ExperienceSchema],
      default: [],
    },
    projects: {
      type: [ProjectSchema],
      default: [],
    },
    education: {
      type: [EducationSchema],
      default: [],
    },
    skills: {
      type: [SkillSchema],
      default: [],
    },
    linkedInUrl: {
      type: String,
      default: "",
    },
    githubUrl: {
      type: String,
      default: "",
    },
    portfolioUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);

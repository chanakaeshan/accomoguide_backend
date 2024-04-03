import * as mongoose from "mongoose";
import { Types } from "mongoose";

interface Common {
  name?: string;
  userType?: string;
  password?: string;
  userStatus?: string;
  email?:string
}

export interface DUser extends Common {
  _id?: Types.ObjectId;
}

export interface IUser extends Common, mongoose.Document {
  createAccessToken(expiresIn?: string): string;

  comparePassword(password: string): Promise<boolean>;
}

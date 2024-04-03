import * as mongoose from "mongoose";

interface Common {
  title: string;
  description: string;
  price: string;

  userId: mongoose.Types.ObjectId;

  approval?: Object;
  studentRequest?: Object;
}

export interface DPosts extends Common {}
export interface IPosts extends Common, mongoose.Document {}

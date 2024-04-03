import { NextFunction, Request, Response } from "express";
import {
  check,
  param,
  ValidationChain,
  validationResult,
} from "express-validator";

import { PostsDao } from "../dao/posts-dao";
import { DPosts } from "../models/posts-model";
import UserType from "../enums/UserType";
import { UserDao } from "../dao/user-dao";
const { ObjectId } = require("mongodb");

export namespace StudentEp {
  export async function getApprovedPropertyPosts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (!UserType.WARDEN) {
      return res.sendError(
        "Sorry, this operation can only be performed by a Warden"
      );
    }

    try {
      const userPosts = await PostsDao.getApprovedPropertyPosts();

      console.log("userPosts", userPosts);
      userPosts
        ? res.sendSuccess(userPosts, "User posts Found!")
        : res.sendError("No posts found");
    } catch (err) {
      return res.sendError("Something Went Wrong!!");
    }
  }
  export async function sendPropertyRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const studentId = req.params.studentId;
    const propertyId = req.params.propertyId;

    const student = await UserDao.getUserById(studentId);

    if (student.userType != UserType.STUDENT) {
      return res.sendError(
        "Sorry, this operation can only be performed by a Student"
      );
    }

    try {
      const userPosts = await PostsDao.sendPropertyRequest(
        propertyId,
        studentId
      );

      console.log("userPosts", userPosts);
      userPosts
        ? res.sendSuccess(userPosts, "User posts Found!")
        : res.sendError("No posts found");
    } catch (err) {
      return res.sendError("Something Went Wrong!!");
    }
  }
}

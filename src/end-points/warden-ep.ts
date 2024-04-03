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
const { ObjectId } = require("mongodb");

export namespace WardenEp {
  export async function viewPropertiesToApprove(
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
      const userPosts = await PostsDao.getAllPropertyPosts();

      console.log("userPosts", userPosts);
      userPosts
        ? res.sendSuccess(userPosts, "User posts Found!")
        : res.sendError("No posts found");
    } catch (err) {
      return res.sendError("Something Went Wrong!!");
    }
  }
  export async function approveProperty(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
        const wardenId = req.params.wardenId;
        const propertyId = req.params.postId;
    if (!UserType.WARDEN) {
      return res.sendError(
        "Sorry, this operation can only be performed by a Warden"
      );
    }
    try {
      const userPosts = await PostsDao.approvePost(wardenId, propertyId);

      console.log("userPosts", userPosts);
      userPosts
        ? res.sendSuccess(userPosts, "User posts Found!")
        : res.sendError("No posts found");
    } catch (err) {
      return res.sendError("Something Went Wrong!!");
    }
  }
  export async function rejectProperty(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
        const wardenId = req.params.wardenId;
        const propertyId = req.params.postId;
    if (!UserType.WARDEN) {
      return res.sendError(
        "Sorry, this operation can only be performed by a Warden"
      );
    }
    try {
      const userPosts = await PostsDao.rejectPost(wardenId, propertyId);

      console.log("userPosts", userPosts);
      userPosts
        ? res.sendSuccess(userPosts, "User posts Found!")
        : res.sendError("No posts found");
    } catch (err) {
      return res.sendError("Something Went Wrong!!");
    }
  }
}

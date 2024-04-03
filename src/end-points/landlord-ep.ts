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

export namespace LandLordEp {
  export function postValidationRules(): ValidationChain[] {
    return [
      check("content")
        .notEmpty()
        .withMessage("Content is required")
        .isString()
        .withMessage("loginMethod is not valid type"),
    ];
  }

  export async function createPost(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.sendError(errors.array()[0]["msg"]);
      }

      const title = req.body.title;
      const description = req.body.description;
      const price = req.body.price;

      const userId = req.params.userId;

      console.log("title", title);
      console.log("description", description);
      console.log("price", price);
      console.log("userId", userId);

      const objectId = new ObjectId(userId);

      const postData: DPosts = {
        userId: objectId,
        title: title,
        description: description,
        price: price,
      };

      const savedPost = await PostsDao.savePost(postData);

      if (!savedPost) {
        return res.sendError("Failed to save post");
      }

      console.log("savedPost", savedPost);
      return res.sendSuccess(savedPost, "Post Saved Successfully!");
    } catch (err) {
      console.log("in catch", err);
      return res.sendError(err);
    }
  }
  export async function viewPublishedProperties(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userId = req.params.userId;

    try {
      const userPosts = await PostsDao.viewPublishedPropertiesByPostedUser(
        userId
      );

      console.log("userPosts", userPosts);
      userPosts
        ? res.sendSuccess(userPosts, "User posts Found!")
        : res.sendError("No posts found");
    } catch (err) {
      return res.sendError("Something Went Wrong!!");
    }
  }

  export async function deletePublishedProperty(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const propertyId = req.params.postId;
      const landlordId = req.params.userId;

      const post = await PostsDao.getPostById(propertyId);

      if (!post) {
        return res.sendError("Post not found");
      }

      if (post.userId.toString() !== landlordId) {
        return res.sendError("You do not have permission to delete this post");
      }

      const deletedPost = await post.remove();

      if (!deletedPost) {
        return res.sendError("Failed to delete post");
      }

      return res.sendSuccess({}, "Post Deleted Successfully!");
    } catch (err) {
      console.log("in catch", err);
      return res.sendError(err);
    }
  }
  export async function acceptStudentRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log("inside accept req");

    const propertyId = req.params.postId;
    const landLordId = req.params.landlordId;

    console.log("propertyId", propertyId);
    console.log("landLordId", landLordId);

    const landlord = await UserDao.getUserById(landLordId);

    console.log("userType of lanlord", landlord.userType);

    if (landlord.userType != UserType.LANDLORD) {
      return res.sendError(
        "Sorry, this operation can only be performed by a LandLord"
      );
    }
    try {
      const userPosts = await PostsDao.acceptStudentRequest(propertyId);

      console.log("userPosts", userPosts);
      userPosts
        ? res.sendSuccess(userPosts, "User posts Found!")
        : res.sendError("No posts found");
    } catch (err) {
      return res.sendError("Something Went Wrong!!");
    }
  }
  export async function rejectStudentRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const propertyId = req.params.postId;
    const landLordId = req.params.landlordId;

    const landlord = await UserDao.getUserById(landLordId);

    if (landlord.userType != UserType.LANDLORD) {
      return res.sendError(
        "Sorry, this operation can only be performed by a LandLord"
      );
    }
    try {
      const userPosts = await PostsDao.rejectStudentRequest(propertyId);

      console.log("userPosts", userPosts);
      userPosts
        ? res.sendSuccess(userPosts, "User posts Found!")
        : res.sendError("No posts found");
    } catch (err) {
      return res.sendError("Something Went Wrong!!");
    }
  }

  // // In PostsEp

  // export async function updatePost(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const postId = req.params.postId;
  //     const userId = req.params.userId;

  //     const post = await PostsDao.getPostById(postId);

  //     if (!post) {
  //       return res.sendError("Post not found");
  //     }

  //     if (post.userId.toString() !== userId.toString()) {
  //       return res.sendError("You do not have permission to update this post");
  //     }

  //     const { content } = req.body;

  //     const updatedData: Partial<DPosts> = {};

  //     if (content) {
  //       updatedData.content = content;
  //     }

  //     const updatedPost = await PostsDao.updatePost(postId, updatedData);

  //     if (!updatedPost) {
  //       return res.sendError("Failed to update post");
  //     }

  //     return res.sendSuccess(updatedPost, "Post Updated Successfully!");
  //   } catch (err) {
  //     console.log("in catch", err);
  //     return res.sendError(err);
  //   }
  // }

  // export async function getAllPosts(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const posts = await PostsDao.getAllPosts();

  //     posts
  //       ? res.sendSuccess(posts, "User posts Found!")
  //       : res.sendError("No posts found");
  //   } catch (err) {
  //     return res.sendError("Something Went Wrong!!");
  //   }
  // }

  // export async function getPostsByPostId(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   const postId = req.params.postId;

  //   try {
  //     const post = await PostsDao.getPostById(postId);

  //     console.log("post", post);
  //     post
  //       ? res.sendSuccess(post, "Post Found!")
  //       : res.sendError("No post found");
  //   } catch (err) {
  //     return res.sendError("Something Went Wrong!!");
  //   }
  // }
  // export async function getPostsByUserId(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   const userId = req.params.userId;

  //   try {
  //     const post = await PostsDao.getPostsByUserId(userId);

  //     console.log("posts by user id", post);
  //     post
  //       ? res.sendSuccess(post, "Posts Found!")
  //       : res.sendError("No posts found");
  //   } catch (err) {
  //     return res.sendError("Something Went Wrong!!");
  //   }
  // }

  // export async function saveLike(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const postId = req.params.postId;
  //     const userId = req.params.userId;

  //     const objectId = new ObjectId(userId);

  //     console.log('postId', postId);
  //     console.log('userId', userId);
  //     console.log('objectId', objectId);
  //     const updatedPost = await PostsDao.saveLike(postId, objectId);

  //     if (!updatedPost) {
  //       return res.sendError('Failed to save like');
  //     }

  //     return res.sendSuccess(updatedPost, 'Like Saved Successfully!');
  //   } catch (err) {
  //     console.log('in catch', err);
  //     return res.sendError(err);
  //   }
  // }

  //  export async function saveComment(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const postId = req.params.postId;
  //     const userId = req.params.userId;
  //     const text = req.body.text;

  //     const objectId = new ObjectId(userId);

  //     const commentData = {
  //       userId: objectId,
  //       text,
  //     };

  //     const updatedPost = await PostsDao.saveComment(postId, commentData);

  //     if (!updatedPost) {
  //       return res.sendError('Failed to save comment');
  //     }

  //     return res.sendSuccess(updatedPost, 'Comment Saved Successfully!');
  //   } catch (err) {
  //     console.log('in catch', err);
  //     return res.sendError(err);
  //   }
  // }

  // export async function deletePost(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const postId = req.params.postId;
  //     const userId = req.params.userId;

  //     const post = await PostsDao.getPostById(postId);

  //     if (!post) {
  //       return res.sendError("Post not found");
  //     }

  //     if (post.userId.toString() !== userId) {
  //       return res.sendError("You do not have permission to delete this post");
  //     }

  //     const deletedPost = await post.remove();

  //     if (!deletedPost) {
  //       return res.sendError("Failed to delete post");
  //     }

  //     return res.sendSuccess({}, "Post Deleted Successfully!");
  //   } catch (err) {
  //     console.log("in catch", err);
  //     return res.sendError(err);
  //   }
  // }

  // export async function deleteComment(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   console.log("in delete comment");
  //   try {
  //     console.log("in try");
  //     const postId = req.params.postId;
  //     const commentId = req.params.commentId;
  //     const userId = req.params.userId;

  //     console.log("postId delete comment", postId);
  //     console.log("commentId delete comment", commentId);
  //     console.log("userId delete comment", userId);

  //     const comment = await PostsDao.getCommentById(postId, commentId);
  //     console.log("delete comment - comment", comment);

  //     if (!comment) {
  //       return res.sendError("Comment not found");
  //     }

  //     if (comment.userId.toString() !== userId) {
  //       return res.sendError("You do not have permission to delete this comment");
  //     }

  //     const updatedPost = await PostsDao.deleteComment(postId, commentId);

  //     if (!updatedPost) {
  //       return res.sendError("Failed to delete comment");
  //     }

  //     return res.sendSuccess(updatedPost, "Comment Deleted Successfully!");
  //   } catch (err) {
  //     console.log("in catch", err);
  //     return res.sendError(err);
  //   }
  // }
}

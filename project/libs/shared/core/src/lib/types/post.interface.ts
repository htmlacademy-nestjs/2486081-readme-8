import { CategoryTitle } from "./category.interface";
import { Comment } from "./comment.interface";

export interface BasePost {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  category: string;
  userId: string;
  comments: Comment[];
  tags?: string[]
}

export interface PostText extends BasePost {
  title: string;
  preview: string;
  text: string;
  category: CategoryTitle.Text
}

export interface PostVideo extends BasePost {
  title: string;
  url: string;
  category: CategoryTitle.Video
}

export interface PostUrl extends BasePost {
  url: string;
  category: CategoryTitle.Url
}

export interface PostQuote extends BasePost {
  quote: string;
  author: string;
  category: CategoryTitle.Quote
}

export interface PostPhoto extends BasePost {
  url: string;
  category: CategoryTitle.Photo
}


 export type Post = PostText | PostVideo | PostUrl | PostQuote | PostPhoto;


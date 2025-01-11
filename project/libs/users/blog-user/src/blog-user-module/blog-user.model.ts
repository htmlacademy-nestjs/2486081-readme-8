import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AuthUser } from "@project/core";
import { Document } from "mongoose";


@Schema({
  collection: 'Users',
  timestamps: true
})
export class BlogUserModel extends Document implements AuthUser {

  @Prop({ required: true})
  public email: string;

  @Prop({ required: true})
  public name: string;

  @Prop({ required: true})
  public password: string;

  public urlAvatar?: string;

}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);

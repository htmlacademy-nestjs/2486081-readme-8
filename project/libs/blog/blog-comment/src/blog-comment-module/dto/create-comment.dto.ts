import { IsMongoId, IsString, MaxLength, MinLength } from "class-validator";
import { CreateCommentMessages } from './create-comment.messages'

export class CreateCommentDto {

  @IsString({ message: CreateCommentMessages.comment.invalidFormat })
  @MinLength(10, { message: CreateCommentMessages.comment.minLength })
  @MaxLength(300, { message: CreateCommentMessages.comment.maxLength })
  public comment: string;


  public postId: string;

  public createdAt: Date;

  @IsMongoId({ message: CreateCommentMessages.userId.invalidId })
  public userId: string;
}

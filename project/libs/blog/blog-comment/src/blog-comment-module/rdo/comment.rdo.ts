import { Expose } from 'class-transformer'
export class CommentRdo {
  @Expose()
  public comment: string;

  @Expose()
  public postId: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public userId: string;
}

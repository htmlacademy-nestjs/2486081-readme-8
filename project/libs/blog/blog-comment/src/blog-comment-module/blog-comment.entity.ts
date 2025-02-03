import { Comment, Entity, StorableEntity } from "@project/core"

export class BlogCommentEntity extends Entity implements StorableEntity<Comment> {
  public message: string;
  public postId?: string;
  public userId: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(comment?: Comment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: Comment): void {
    if (! comment) {
      return;
    }
    this.id = comment.id ?? undefined;
    this.message = comment.message;
    this.postId = comment.postId;
    this.userId = comment.userId;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      message: this.message,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}

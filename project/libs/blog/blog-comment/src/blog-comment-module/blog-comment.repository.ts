import { Injectable, NotFoundException } from "@nestjs/common";
import { BasePostgresRepository } from '@project/data-access'
import { BlogCommentEntity } from "./blog-comment.entity";
import { BlogCommentFactory } from "./blog-comment.factory";
import { PrismaClientService } from '@project/blog-models'
import { Comment } from "@project/core";

@Injectable()
export class BlogCommentRepository extends BasePostgresRepository<BlogCommentEntity, Comment> {
  constructor(
    entityFactory: BlogCommentFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async save(entity: BlogCommentEntity): Promise<void> {
    const record = await this.client.comment.create({
      data: { ...entity.toPOJO() }
    });

    entity.id= record.id;
  }

  public async findById(id: string): Promise<BlogCommentEntity> {
    const document = await this.client.comment.findFirst({
      where: {
        id,
      },
    })

    if (! document ) {
      throw new NotFoundException(`Comment with id ${id} not found.`)
    }

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    console.log(id)
  }

  public async findByPostId(postId: string): Promise<BlogCommentEntity[]> {
    console.log(typeof(postId))
    return []
  }
}

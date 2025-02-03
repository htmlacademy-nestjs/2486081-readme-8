import { Injectable } from "@nestjs/common";
import { EntityFactory, Post } from "@project/core";
import { BlogPostEntity } from "./blog-post.entity";
//import { CreatePostDto } from "./dto/create-post.dto";

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
     return new BlogPostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(dto): BlogPostEntity {
    const entity = new BlogPostEntity();
    entity.categories = dto.category;
    entity.text = dto.text;
    entity.preview = dto.preview;
    entity.userId = dto.userId;
    entity.title = dto.title;
    return entity
  }
}

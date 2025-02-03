import { BlogPostRepository } from "./blog-post.repository";
import { Injectable } from "@nestjs/common";
import { BlogPostEntity } from "./blog-post.entity";
import { BlogPostFactory } from "./blog-post.factory";

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
  ) {}

  public async createPost(dto): Promise<BlogPostEntity> {
    const newPost = await BlogPostFactory.createFromCreatePostDto(dto)
    await this.blogPostRepository.save(newPost)

    return newPost
  }

}

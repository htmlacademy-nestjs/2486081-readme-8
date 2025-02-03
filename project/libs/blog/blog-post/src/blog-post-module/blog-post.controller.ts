import { Body, Controller, Post } from "@nestjs/common";
import { BlogPostService } from "./blog-post.service";
import { CreatePostDto } from "./dto/create-post.dto";

@Controller('posts')
export class BlogPostController {
  constructor (
    private readonly blogPostService: BlogPostService,
  ) {}

  @Post('/')
  public async create(@Body() dto) {
    const newPost = await this.blogPostService.createPost(dto);
    return newPost
  }
}

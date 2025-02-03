import { BasePostgresRepository } from '@project/data-access'
import { BlogPostEntity } from "./blog-post.entity";
import { Prisma } from '@prisma/client'
import { Post } from '@project/core';
import { PrismaClientService} from '@project/blog-models'
import { BlogPostFactory } from './blog-post.factory'



export class BlogPostRepository  extends BasePostgresRepository<BlogPostEntity, Post> {
  constructor(
    entityFactory: BlogPostFactory,
    readonly client: PrismaClientService,

  ) {
    super(entityFactory, client)
  }

  private async getPostCount(where: Prisma.BasePostWhereInput): Promise<number> {
    return this.client.basePost.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit)
  }


  public async save(entity: BlogPostEntity): Promise<void> {
    // const data = entity.toPOJO();
    // let post;
    //console.log(entity.toPOJO(), 'ff');
    console.log(this.client.basePost);

    // switch(data.category) {
    //   case 'text':
    //     post = await this.client.basePost.create({
    //     data: {
    //       id: entity.id,
    //       category: 'TEXT',
    //       text: {
    //         create: {
    //           title: data.title,
    //           preview: data.preview,
    //           text: data.text
    //         },
    //       },
    //       tags: data.tags,
    //       userId: data.userId
    //     }
    //     });
    //     break;

    //   case 'video':
    //     post = await this.client.basePost.create({
    //       data: {
    //         category: 'VIDEO',
    //         video: {
    //           create: {
    //             title: data.title,
    //             url: data.url
    //           },
    //         },
    //         tags: data.tags,
    //         userId: data.userId
    //       },
    //     });
    //     break;

    //   case 'url':
    //     post = await this.client.basePost.create({
    //       data: {
    //         category: 'URL',
    //         url: {
    //           create: {
    //             title: '',
    //             url: data.url
    //           },
    //         },
    //         tags: data.tags,
    //         userId: data.userId
    //       },
    //     });
    //     break

    //   case 'quote':
    //     post = await this.client.basePost.create({
    //       data: {
    //         category: 'QUOTE',
    //         quote: {
    //           create: {
    //             quote: data.quote,
    //             author: data.author
    //           },
    //         },
    //         tags: data.tags,
    //         userId: data.userId
    //       }
    //     });
    //     break

    //   case 'photo':
    //     post = await this.client.basePost.create({
    //       data: {
    //         category: 'PHOTO',
    //         photo: {
    //           create: {
    //             title: data.id,
    //             imageUrl: data.url,
    //           },
    //         },
    //         tags: data.tags,
    //         userId: data.userId
    //       }
    //     });
    //     break

    // }


    // const pojoEntity: ReturnType<typeof entity.toPOJO> = entity.toPOJO();
    // await this.client.basePost.create({

    // })
    // await this.client.postText.create({
    //   data: {
    //     id: pojoEntity.id

    //   }
    // })
    // switch (pojoEntity.category) {
    //   case 'ссылка':
    //   this.record = await this.client.post.create({
    //     data: {
    //       userId: pojoEntity.id,
    //       url: pojoEntity.url
    //       // ...pojoEntity,
    //       // comments: {
    //       //   connect: []
    //       // }
    //     }
    //   });
    //   break
    //   case 'фотография':
    //     this.record = await this.client.post.create({
    //       data: {
    //         userId: pojoEntity.id,
    //         // ...pojoEntity,
    //         // comments: {
    //         //   connect: []
    //         // }
    //       }
    //     });
    // }
    // const record = await this.client.post.create({
    //   data: {
    //     userId: pojoEntity.id,
    //     // ...pojoEntity,
    //     // comments: {
    //     //   connect: []
    //     // }
    //   }
    // });

    //entity.id = this.record.id;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.basePost.delete({
      where: {
        id
      }
    });
  }

}

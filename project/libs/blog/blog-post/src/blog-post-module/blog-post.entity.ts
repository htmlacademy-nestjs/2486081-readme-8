import { BasePost, CategoryTitle, Entity, Post, PostPhoto, PostQuote, PostText, PostUrl, PostVideo, StorableEntity } from '@project/core'

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public categories?: string
  public createdAt?: Date;
  public updatedAt?: Date;
  public userId: string;
  public comments: []
  public tags: string[]

  public title?: string
  public preview?: string
  public text?: string;
  public url?: string;
  public author?: string;

  constructor(post?) {
    super()
    this.populate(post)

  }

  public populate(post?: Post): void {
    if (!post) {
      return
    }

    this.id = post.id ?? undefined;
    this.categories = post.category;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt
    this.userId = post.userId
    this.tags = post.tags ?? null;
    this.comments = []

    switch (post.category) {
      case CategoryTitle.Text:
        this.title = post.title
        this.preview = post.preview
        this.text = post.text
        break
      case CategoryTitle.Video:
        this.title = post.title
        this.url = post.url
        break
      case CategoryTitle.Url:
        this.url = post.url
        break
      case CategoryTitle.Quote:
        this.text = post.quote
        this.author = post.author
        break
      case CategoryTitle.Photo:
        this.url = post.url
        break
    }
  }

  public toPOJO(): Post {

    const basePOJO: BasePost = {
      id: this.id,
      category: this.categories,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      userId: this.userId,
      tags: this.tags,
      comments: this.comments,
    };

    switch (this.categories) {
      case CategoryTitle.Text:
        return {
          ...basePOJO,
          title: this.title,
          preview: this.preview,
          text: this.text,
          category: CategoryTitle.Text
        } as PostText;

      case CategoryTitle.Video:
        return {
          ...basePOJO,
          title: this.title,
          url: this.url,
          category: CategoryTitle.Video
        } as PostVideo

      case CategoryTitle.Url:
        return {
          ...basePOJO,
          url: this.url,
          category: CategoryTitle.Url
        } as PostUrl;

      case CategoryTitle.Quote:
        return {
          ...basePOJO,
          quote: this.text,
          author: this.author,
          category: CategoryTitle.Quote
        } as PostQuote;

      case CategoryTitle.Photo:
        return {
          ...basePOJO,
          url: this.url,
          category: CategoryTitle.Photo
        } as PostPhoto

      default:
        throw new Error("Unknown category");
    }
  }
  // public toPOJO(): Post {
  //   const basePOJO: BasePost = {
  //     id: this.id,
  //     ca
  //     createdAt: this.createdAt,
  //     updatedAt: this.updatedAt,
  //     userId: this.userId,
  //     tags: this.tags,
  //     comments: this.comments,
  //   };

  //   const categorySpecificPOJO = {
  //     category: this.categories,
  //     ...(this.categories === CategoryTitle.Text && {
  //       title: this.title,
  //       preview: this.preview,
  //       text: this.text,
  //     }),
  //     ...(this.categories === CategoryTitle.Video && {
  //       title: this.title,
  //       url: this.url,
  //     }),
  //     ...(this.categories === CategoryTitle.Url && {
  //       url: this.url,
  //     }),
  //     ...(this.categories === CategoryTitle.Quote && {
  //       text: this.text,
  //       author: this.author,
  //     }),
  //     ...(this.categories === CategoryTitle.Photo && {
  //       url: this.url,
  //     }),
  //   };

  //   return { ...basePOJO, ...categorySpecificPOJO } as Post;
  // }
}


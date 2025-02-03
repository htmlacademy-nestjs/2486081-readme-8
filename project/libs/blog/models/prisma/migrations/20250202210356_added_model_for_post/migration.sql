-- CreateEnum
CREATE TYPE "Category" AS ENUM ('TEXT', 'VIDEO', 'URL', 'QUOTE', 'PHOTO');

-- CreateTable
CREATE TABLE "base_post" (
    "id" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "textId" TEXT,
    "videoId" TEXT,
    "urlId" TEXT,
    "quoteId" TEXT,
    "photoId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],
    "user_id" TEXT NOT NULL,

    CONSTRAINT "base_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostsText" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostsText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostsVideo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostsVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostsUrl" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostsUrl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostsQuote" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostsQuote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostsPhoto" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostsPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "base_post_textId_key" ON "base_post"("textId");

-- CreateIndex
CREATE UNIQUE INDEX "base_post_videoId_key" ON "base_post"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "base_post_urlId_key" ON "base_post"("urlId");

-- CreateIndex
CREATE UNIQUE INDEX "base_post_quoteId_key" ON "base_post"("quoteId");

-- CreateIndex
CREATE UNIQUE INDEX "base_post_photoId_key" ON "base_post"("photoId");

-- CreateIndex
CREATE UNIQUE INDEX "PostsText_postId_key" ON "PostsText"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "PostsVideo_postId_key" ON "PostsVideo"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "PostsUrl_postId_key" ON "PostsUrl"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "PostsQuote_postId_key" ON "PostsQuote"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "PostsPhoto_postId_key" ON "PostsPhoto"("postId");

-- AddForeignKey
ALTER TABLE "PostsText" ADD CONSTRAINT "PostsText_postId_fkey" FOREIGN KEY ("postId") REFERENCES "base_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsVideo" ADD CONSTRAINT "PostsVideo_postId_fkey" FOREIGN KEY ("postId") REFERENCES "base_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsUrl" ADD CONSTRAINT "PostsUrl_postId_fkey" FOREIGN KEY ("postId") REFERENCES "base_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsQuote" ADD CONSTRAINT "PostsQuote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "base_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsPhoto" ADD CONSTRAINT "PostsPhoto_postId_fkey" FOREIGN KEY ("postId") REFERENCES "base_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "base_post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

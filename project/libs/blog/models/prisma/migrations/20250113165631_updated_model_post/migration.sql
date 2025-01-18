/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Texts` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Texts` table. All the data in the column will be lost.
  - Added the required column `update_at` to the `Texts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Texts" DROP COLUMN "createdAt",
DROP COLUMN "updateAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToText" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToText_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryToText_B_index" ON "_CategoryToText"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToText" ADD CONSTRAINT "_CategoryToText_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToText" ADD CONSTRAINT "_CategoryToText_B_fkey" FOREIGN KEY ("B") REFERENCES "Texts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

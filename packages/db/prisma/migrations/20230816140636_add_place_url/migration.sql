/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Place` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Place` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "createdAt" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "body" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT now();

-- CreateIndex
CREATE UNIQUE INDEX "Place_url_key" ON "Place"("url");

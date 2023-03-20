/*
  Warnings:

  - You are about to drop the column `desciption` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `description` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "desciption",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL;

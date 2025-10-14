/*
  Warnings:

  - You are about to drop the column `suggestion` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionId]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `evaluation` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "suggestion",
ADD COLUMN     "evaluation" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionId_key" ON "Session"("sessionId");

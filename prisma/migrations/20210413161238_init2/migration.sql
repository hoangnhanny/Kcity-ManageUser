/*
  Warnings:

  - You are about to alter the column `deleted` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `deleted` BOOLEAN NOT NULL;

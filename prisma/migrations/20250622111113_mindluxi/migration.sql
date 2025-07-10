/*
  Warnings:

  - You are about to drop the column `image` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the `book` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[blogUrl]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `blogUrl` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Blog_url_key` ON `blog`;

-- AlterTable
ALTER TABLE `blog` DROP COLUMN `image`,
    DROP COLUMN `name`,
    DROP COLUMN `url`,
    ADD COLUMN `author` VARCHAR(191) NULL,
    ADD COLUMN `blogUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `category` VARCHAR(191) NULL,
    ADD COLUMN `content` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `publishedDate` VARCHAR(191) NULL,
    ADD COLUMN `readTime` VARCHAR(191) NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `book`;

-- CreateTable
CREATE TABLE `MentalIllness` (
    `_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MentalIllness_link_key`(`link`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Blog_blogUrl_key` ON `Blog`(`blogUrl`);

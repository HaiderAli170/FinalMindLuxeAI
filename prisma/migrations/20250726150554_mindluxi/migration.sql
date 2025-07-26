-- AlterTable
ALTER TABLE `message` ADD COLUMN `answer` VARCHAR(191) NULL,
    MODIFY `content` VARCHAR(5000) NOT NULL;

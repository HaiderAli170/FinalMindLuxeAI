/*
  Warnings:

  - The values [ADMIN] on the enum `Message_role` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `isPremium` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastLogin` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `loginCount` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `meditationCount` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `mentalHealthScore` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `stripeInvoiceId` on the `user` table. All the data in the column will be lost.
  - The required column `_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX `Medication_userId_idx` ON `medication`;

-- DropIndex
DROP INDEX `MentalWellness_userId_idx` ON `mentalwellness`;

-- DropIndex
DROP INDEX `Message_userId_idx` ON `message`;

-- DropIndex
DROP INDEX `Symptom_userId_idx` ON `symptom`;

-- DropIndex
DROP INDEX `User_clerkId_idx` ON `user`;

-- AlterTable
ALTER TABLE `message` MODIFY `role` ENUM('user', 'model') NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `isAdmin`,
    DROP COLUMN `isPremium`,
    DROP COLUMN `lastLogin`,
    DROP COLUMN `loginCount`,
    DROP COLUMN `meditationCount`,
    DROP COLUMN `mentalHealthScore`,
    DROP COLUMN `stripeCustomerId`,
    DROP COLUMN `stripeInvoiceId`,
    ADD COLUMN `_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `stripe_customer_id` VARCHAR(191) NULL,
    ADD COLUMN `stripe_invoice_id` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`_id`);

/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_customer_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_invoice_id` on the `user` table. All the data in the column will be lost.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `_id`,
    DROP COLUMN `stripe_customer_id`,
    DROP COLUMN `stripe_invoice_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `isPremium` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `lastLogin` DATETIME(3) NULL,
    ADD COLUMN `loginCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `meditationCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mentalHealthScore` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `stripeCustomerId` VARCHAR(191) NULL,
    ADD COLUMN `stripeInvoiceId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

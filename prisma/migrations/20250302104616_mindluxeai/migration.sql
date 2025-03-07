-- CreateTable
CREATE TABLE `User` (
    `_id` VARCHAR(191) NOT NULL,
    `clerkId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `age` INTEGER NULL,
    `height` INTEGER NULL,
    `weight` INTEGER NULL,
    `gender` VARCHAR(191) NULL,
    `bloodGroup` VARCHAR(191) NULL,
    `medicalIssues` VARCHAR(191) NULL,
    `stripe_customer_id` VARCHAR(191) NULL,
    `stripe_invoice_id` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_clerkId_key`(`clerkId`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Symptom` (
    `_id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` ENUM('HEADACHE', 'NAUSEA', 'VOMITING', 'DIARRHEA', 'FATIGUE', 'DIZZINESS', 'INSOMNIA', 'CONSTIPATION', 'MUSCLE_PAIN', 'JOINT_PAIN', 'OTHER') NOT NULL,
    `intensity` INTEGER NOT NULL,
    `frequency` ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'RARELY') NOT NULL,
    `loggedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medication` (
    `_id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `dosage` VARCHAR(191) NOT NULL,
    `purpose` VARCHAR(191) NULL,
    `frequency` ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'RARELY') NOT NULL,
    `adherence` ENUM('ALWAYS', 'OFTEN', 'SOMETIMES', 'NEVER', 'RARELY') NOT NULL,
    `startDate` DATETIME(3) NULL,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MentalWellness` (
    `_id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `mood` ENUM('HAPPY', 'SAD', 'ANGRY', 'ANXIOUS', 'STRESSED', 'NEUTRAL') NOT NULL,
    `happiness` INTEGER NOT NULL,
    `sleep` ENUM('GOOD', 'BAD', 'AVERAGE') NOT NULL,
    `stress` ENUM('NOT_STRESSED', 'SLIGHTLY', 'MODERATELY', 'HIGHLY', 'EXTREMELY') NOT NULL,
    `anxiety` VARCHAR(191) NULL,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `_id` VARCHAR(191) NOT NULL,
    `role` ENUM('user', 'model') NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

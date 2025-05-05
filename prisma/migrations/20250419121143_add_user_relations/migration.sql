-- CreateIndex
CREATE INDEX `Medication_userId_idx` ON `Medication`(`userId`);

-- CreateIndex
CREATE INDEX `MentalWellness_userId_idx` ON `MentalWellness`(`userId`);

-- CreateIndex
CREATE INDEX `Message_userId_idx` ON `Message`(`userId`);

-- CreateIndex
CREATE INDEX `Symptom_userId_idx` ON `Symptom`(`userId`);

-- CreateIndex
CREATE INDEX `User_clerkId_idx` ON `User`(`clerkId`);

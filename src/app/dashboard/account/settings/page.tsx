"use client";

import { MedicationModal, SymptomModal, UserDetailsModal } from "@/components";
import Section from "@/components/section-label";
import DarkModetoggle from "@/components/settings/dark-mode";
import { Button } from "@/components/ui/button";
import { useSettingsModal } from "@/hooks";

const Settings = () => {
  const {
    openSymptomModal,
    closeSymptomModal,
    openMedicationModal,
    closeMedicationModal,
    openPersonalDetailsModal,
    closePersonalDetailsModal,
    isSymptomModalOpen,
    isMedicationModalOpen,
    isPersonalDetailsModalOpen,
  } = useSettingsModal();

  return (
    <div className="flex flex-col items-start justify-start w-full max-w-6xl py-8 mx-auto">


        
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-xl font-semibold">Manage your settings</h2>
        <p className="text-sm text-muted-foreground">
          Update your account settings
        </p>
      </div>
      <div className="flex flex-col items-start w-full py-8 gap-y-8">
        <div className="space-y-4">
          <h5 className="text-base font-medium">Update your symptoms</h5>
          <Button size="sm"   onClick={openSymptomModal}>
            Add a symptom
          </Button>
        </div>
        <div className="space-y-4">
          <h5 className="text-base font-medium">Update your medications</h5>
          <Button size="sm"   onClick={openMedicationModal}>
            Add a medication
          </Button>
        </div>
        <div className="space-y-4">
          <h5 className="text-base font-medium">
            Update your personal information
          </h5>
          <Button size="sm"   onClick={openPersonalDetailsModal}>
            Update information
          </Button>
        </div>
      </div>

      <SymptomModal />
      <MedicationModal />
      <UserDetailsModal />

      <div className="flex flex-col  gap-3">
   
        <h1 className="text-2xl dark:text-slate-200   my-3 md:my-6 font-bold text-neutral-700">
          Change Your Theme
        </h1>
        <div className="lg:col-span-1">
        <Section
          label="Interface Theme"
          message="Select or customize your UI theme "
        />
      </div>

        <div className=" w-full flex-1 h-0 flex flex-col gap-10">
          <DarkModetoggle />
        </div>
      </div>
    </div>
  );
};

export default Settings;

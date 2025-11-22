"use client";
import { FileUpload } from "@/components/ui/file-upload";
import { useFormUpdater } from "@/context/useUpdateFormContext";
const CustomFileUpload = () => {
  const {setForm,form} = useFormUpdater();
  const handleFileUpload = (files: string[]) => {
    setForm(prev => ({...prev, images: [...(prev.images ?? []), ...files ]}))
    console.log(form.images);
  }; 

  return (
    <div className="w-full hide-scrollbar max-h-[360px] overflow-clip overflow-y-scroll max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
};

export default CustomFileUpload;

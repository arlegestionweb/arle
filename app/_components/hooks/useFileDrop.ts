import { useEffect } from "react";

const useFileDrop = (
  elementId: string,
  uploadAction: (formData: FormData) => void
) => {
  useEffect(() => {
    const target = document.getElementById(elementId);
    if (!target) return;

    const onDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const onDrop = (event: DragEvent) => {
      event.preventDefault();
      handleFiles(event.dataTransfer?.files || null);
    };

    const onPaste = (event: ClipboardEvent) => {
      handleFiles(event.clipboardData?.files || null);
    };

    const handleFiles = (files: FileList | null) => {
      if (files) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append(elementId + i, files[i]);
        }
        uploadAction(formData);
      }
    };
    target.addEventListener("dragover", onDragOver);
    target.addEventListener("drop", onDrop);
    target.addEventListener("paste", onPaste);

    return () => {
      target.removeEventListener("dragover", onDragOver);
      target.removeEventListener("drop", onDrop);
      target.removeEventListener("paste", onPaste);
    };
  }, [elementId, uploadAction]);
};

export default useFileDrop;

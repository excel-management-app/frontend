import { toast } from "react-toastify";
import { FileUploadButton } from "../../../components/ui/FileUploadButton";
import { useUploadFile } from "../hooks/useUploadFile";

interface Props {
  onUploadSuccess: () => void;
}

export default function TemplateFileUploadButton({ onUploadSuccess }: Props) {
  const { mutate, isPending } = useUploadFile();

  const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    mutate(formData, {
      onSuccess: () => {
        toast.success("Tải file thành công");
        (document.getElementById("fileInput") as HTMLInputElement).value = "";
        onUploadSuccess();
      },
      onError: () => {
        toast.error("Tải file lỗi, vui lòng thử lại");
        (document.getElementById("fileInput") as HTMLInputElement).value = "";
      },
    });
  };

  return (
    <FileUploadButton
      title="Tải file mới"
      onUpload={uploadFile}
      isPending={isPending}
    />
  );
}

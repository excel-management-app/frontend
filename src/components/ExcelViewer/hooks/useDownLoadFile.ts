import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../apis/axiosClient";

interface Dependencies {
  url: string;
  fileName: string;
}

export const useDownLoadFile = () => {
  const [loading, setLoading] = useState(false);
  const handleDownload = useCallback(
    async ({ url, fileName }: Dependencies) => {
      setLoading(true);
      try {
        const response = await axiosClient.get(url, {
          responseType: "blob",
          headers: {
            "Content-Type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
        });

        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);

        toast.success("Download file thành công");
      } catch (error) {
        console.error("Error during file download:", error);
        toast.error("Download file thất bại");
      } finally {
        setLoading(false);
      }
    },
    [setLoading],
  );
  return { loading, handleDownload };
};

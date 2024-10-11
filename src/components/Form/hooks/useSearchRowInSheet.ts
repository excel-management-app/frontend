import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../apis/axiosClient";
import { SheetRowData } from "../../../utils/types";

interface Dependencies {
  soHieuToBanDo: string | number;
  soThuTuThua: string | number;
  fileId: string;
  sheetName: string;
  isOld?: boolean;
}

export function useSearchRowInSheet({
  soHieuToBanDo,
  soThuTuThua,
  fileId,
  sheetName,
  isOld = false,
}: Dependencies) {
  const [data, setData] = useState<SheetRowData>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSearch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(
        `/files/${fileId}/sheets/${sheetName}/soHieuToBanDo/${soHieuToBanDo}/soThuTuThua/${soThuTuThua}${isOld ? "/?old=true" : ""}`
      );
      setData(data);
    } catch (error) {
      toast.error("Không tìm thấy thửa đất nào");
    } finally {
      setLoading(false);
    }
  }, [soHieuToBanDo, soThuTuThua, fileId, sheetName]);

  return { data, loading, handleSearch };
}

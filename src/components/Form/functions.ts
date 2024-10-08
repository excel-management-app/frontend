import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { SheetRowData } from "../../utils/types";
const fieldNames = [
  "hoTen",
  "namSinh",
  "gioiTinh",
  "soGiayTo",
  "ngayCap",
  "noiCap",
  "diaChiChu",
  "hoTen2",
  "namSinh2",
  "gioiTinh2",
  "soGiayTo2",
  "ngayCap2",
  "noiCap2",
  "diaChiChu2",
  "soHieuToBanDo",
  "soThuTuThua",
  "dienTich",
  "xuDong",
  "dienTichMDSD1",
  "nguonGocSuDung1",
];
dayjs.extend(customParseFormat);
interface FormData {
  [k: string]: string | number;
}
export function convertToFormData(data?: SheetRowData) {
  if (!data) return {};
  const formData: FormData = {};
  fieldNames.forEach((fieldName) => {
    if (fieldName === "ngayCap" || fieldName === "ngayCap2") {
      // Check if data[fieldName] is valid
      if (data[fieldName]) {
        // Ensure the input date is parsed with the expected format
        const parsedDate = dayjs(data[fieldName], "DD/MM/YYYY"); // Adjust format as per actual data
        formData[fieldName] = parsedDate.isValid()
          ? parsedDate.format("DD/MM/YYYY")
          : "";
      } else {
        formData[fieldName] = "";
      }
    } else {
      formData[fieldName] = data[fieldName] || "";
    }
  });
  return formData;
}

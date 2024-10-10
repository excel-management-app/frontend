import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { SheetRowData } from "../../utils/types";
export const fieldNames = [
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
  "loaiDat1",
  "dienTichMDSD1",
  "nguonGocSuDung1",
  "thoiHanSuDung1",
  "loaiDat2",
  "dienTichMDSD2",
  "nguonGocSuDung2",
  "thoiHanSuDung2",
  // old fields
  "tenChuCu",
  "namSinhCu",
  "gioiTinhCu",
  "hoGiaDinhCu",
  "loaiGiayToCu",
  "soGiayToCu",
  "ngayCapCu",
  "noiCapCu",
  "diaChiChuCu",
  "hoTenCu2",
  "namSinhCu2",
  "gioiTinhCu2",
  "inHoOngBaCu",
  "loaiGiayToCu2",
  "soGiayToCu2",
  "ngayCapCu2",
  "noiCapCu2",
  "diaChiChuCu2",
  "soToCu",
  "soThuaCu",
  "dienTichCu",
  "xuDong",
  "soPhatHanhCu",
  "soVaoSoCu",
  "ngayCapGiayCu",
  "loaiDatCu1",
  "dtmdsdcu1",
  "thmdsdcu1",
  "ngmdsdcu1",
  "loaiDatCu2",
  "dtmdsdcu2",
  "thmdsdcu2",
  "ngmdsdcu2",

  // certificate
  "giayChungNhanSo",
  "dotCapGCN",
  "loaiGCN",
  "maVachGCN",
  "soPhatHanhGCN",
  "donViCapGCN",
  "soVaoSoCapGCN",

  // formulaire
  "loaiDon",
  "ghiChuDonDangKy",
];

const format = "DD/MM/YYYY";
dayjs.extend(customParseFormat);
interface FormData {
  [k: string]: string | number;
}

interface ConvertToFormDataProps {
  data?: SheetRowData;
}
export function convertToFormData({ data }: ConvertToFormDataProps): FormData {
  if (!data) return {};
  const formData: FormData = {};

  fieldNames.forEach((fieldName) => {
    if (fieldName === "ngayCap" || fieldName === "ngayCap2") {
      // Check if data[fieldName] is valid
      if (data[fieldName]) {
        // Ensure the input date is parsed with the expected format
        const parsedDate = dayjs(data[fieldName], format); // Adjust format as per actual data
        formData[fieldName] = parsedDate.isValid()
          ? parsedDate.format(format)
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

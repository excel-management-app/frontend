import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { SheetRowData } from "../../utils/types";
export const fieldNames = [
  "hoTen",
  "namSinh",
  "diaChiNha",
  "gioiTinh",
  "hoGiaDinh",
  "loaiGiayTo",
  "soGiayTo",
  "ngayCap",
  "noiCap",
  "diaChiChu",
  "hoTen2",
  "namSinh2",
  "gioiTinh2",
  "soGiayTo2",
  "diaChiChu2",
  "inHoOngBa",
  "loaiGiayTo2",
  "soGiayTo2",
  "ngayCap2",
  "noiCap2",
  "diaChiChu2",
  "soHieuToBanDo",
  "soThuTuThua",
  "dienTich",

  "xuDong",
  "ghiChuThuaDat",
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
  "Dientichtangthem",
  "Donvicapcu",
  "diaChiCu",
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

const DATE_FIELD_NAMES = [
  "ngayCap",
  "ngayCap2",
  "ngayCapCu",
  "ngayCapCu2",
  "ngayCapGiayCu",
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
    if (DATE_FIELD_NAMES.includes(fieldName)) {
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
      formData[fieldName] = data[fieldName] ? String(data[fieldName]) : "";
    }
  });
  return formData;
}

export const formatDate = (date: any) =>
  dayjs(date).isValid() ? dayjs(date).format(format) : "";

export function emptyFormData(): FormData {
  const formData: FormData = {};
  fieldNames.forEach((fieldName) => {
    formData[fieldName] = "";
  });
  return formData;
}

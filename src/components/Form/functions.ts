import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { SheetRowData } from "../../utils/types";
import { DATE_FIELD_NAMES } from "./consts";
export const fieldNames = [
  "tamX",
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
  "soThuaTam",
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

  return fieldNames.reduce((formData, fieldName) => {
    if (DATE_FIELD_NAMES.includes(fieldName)) {
      const parsedDate = dayjs(data[fieldName], format);
      formData[fieldName] = parsedDate.isValid()
        ? parsedDate.format(format)
        : "";
    } else {
      formData[fieldName] = data[fieldName] ? String(data[fieldName]) : "";
    }
    return formData;
  }, {} as FormData);
}

// Function to format date
export const formatDate = (date: any): string => {
  if (dayjs.isDayjs(date)) {
    return date.format(format);
  } else if (typeof date === "string" && /^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    return date;
  }
  return dayjs(date).isValid() ? dayjs(date).format(format) : "";
};

export function emptyFormData(): FormData {
  return fieldNames.reduce((formData, fieldName) => {
    formData[fieldName] = "";
    return formData;
  }, {} as FormData);
}

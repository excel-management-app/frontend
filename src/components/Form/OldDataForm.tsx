import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GIAY_TO, LOAI_DAT } from "../../utils/formFields";

export default function OldDataForm() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form style={{ padding: "20px" }}>
          <Grid2 container spacing={2}>
            {/* Thông tin chủ hộ */}
            <Grid2 size={12}>
              <h3>Thông tin chủ hộ</h3>
            </Grid2>
            <Grid2 container size={12}>
              <Grid2 size={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Họ tên"
                  variant="outlined"
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Năm sinh"
                  variant="outlined"
                />
              </Grid2>

              <Grid2 container size={4}>
                <Grid2 size={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Giới tính</InputLabel>
                    <Select defaultValue="">
                      <MenuItem value="Nam">Nam</MenuItem>
                      <MenuItem value="Nữ">Nữ</MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>
                <Grid2 size={6}>
                  <FormControl fullWidth size="small">
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Là hộ gia đình"
                      labelPlacement="start"
                    />
                  </FormControl>
                </Grid2>
              </Grid2>
            </Grid2>
            <Grid2 container size={12}>
              <Grid2 size={4} container>
                <Grid2 size={6}>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="demo-simple-select-label-1">
                      Giấy tờ
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-1"
                      id="demo-simple-select"
                      label="Giấy tờ"
                    >
                      {Object.entries(GIAY_TO).map(([key, value]) => (
                        <MenuItem key={key} value={key}>
                          {value} ({key})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>
                <Grid2 size={6}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Số giấy tờ"
                    variant="outlined"
                  />
                </Grid2>
              </Grid2>

              <Grid2 size={4}>
                <FormControl fullWidth size="small">
                  <DatePicker
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        variant: "outlined",
                      },
                    }}
                    label="Ngày cấp"
                  />
                </FormControl>
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Nơi cấp"
                  variant="outlined"
                />
              </Grid2>
            </Grid2>

            <Grid2 size={12}>
              <TextField fullWidth label="Địa chỉ" variant="outlined" />
            </Grid2>

            {/* Thông tin vợ/chồng */}
            <Grid2 size={12}>
              <h3>Thông tin vợ/chồng</h3>
            </Grid2>

            <Grid2 container size={12}>
              <Grid2 size={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Họ tên"
                  variant="outlined"
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Năm sinh"
                  variant="outlined"
                />
              </Grid2>
              <Grid2 size={4} container>
                <Grid2 size={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Giới tính</InputLabel>
                    <Select fullWidth defaultValue="">
                      <MenuItem value="Nam">Nam</MenuItem>
                      <MenuItem value="Nữ">Nữ</MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>
                <Grid2 size={6}>
                  <FormControl fullWidth size="small">
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Hộ ông/bà"
                      labelPlacement="start"
                    />
                  </FormControl>
                </Grid2>
              </Grid2>
            </Grid2>

            <Grid2 container size={12}>
              <Grid2 size={4} container>
                <Grid2 size={6}>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="demo-simple-select-label-1">
                      Giấy tờ
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-1"
                      id="demo-simple-select"
                      label="Giấy tờ"
                    >
                      {Object.entries(GIAY_TO).map(([key, value]) => (
                        <MenuItem key={key} value={key}>
                          {value} ({key})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>
                <Grid2 size={6}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Số giấy tờ"
                    variant="outlined"
                  />
                </Grid2>
              </Grid2>

              <Grid2 size={4}>
                <FormControl fullWidth size="small">
                  <DatePicker
                    label="Ngày cấp"
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        variant: "outlined",
                      },
                    }}
                  />
                </FormControl>
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Nơi cấp"
                  variant="outlined"
                />
              </Grid2>
            </Grid2>

            <Grid2 size={12}>
              <TextField fullWidth label="Địa chỉ" variant="outlined" />
            </Grid2>

            {/* 
                Thông tin thửa đất cũ
              */}

            <Grid2 size={12}>
              <h3>Thông tin thửa đất cũ</h3>
            </Grid2>
            <Grid2 container size={12}>
              <Grid2 size={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Số tờ"
                  variant="outlined"
                  type="number"
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Số thửa"
                  variant="outlined"
                  type="number"
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Diện tích"
                  variant="outlined"
                  type="number"
                />
              </Grid2>
            </Grid2>

            <Grid2 size={12}>
              <TextField fullWidth label="Địa chỉ" variant="outlined" />
            </Grid2>

            <Grid2 size={12}>
              <h3>Thông tin giấy chứng nhận cũ</h3>
            </Grid2>
            <Grid2 container size={12}>
              <Grid2 size={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Số phát hành"
                  variant="outlined"
                  type="number"
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Số phát hành"
                  variant="outlined"
                  type="number"
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Số vào sổ"
                  variant="outlined"
                  type="number"
                />
              </Grid2>
              <Grid2 size={4}>
                <FormControl fullWidth size="small">
                  <DatePicker
                    label="Ngày cấp"
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        variant: "outlined",
                      },
                    }}
                  />
                </FormControl>
              </Grid2>
            </Grid2>
            {/* Mục đích sử dụng cũ */}
            <Grid2 size={12}>
              <h3>Mục đích sử dụng cũ</h3>
            </Grid2>
            <Grid2 container size={12}>
              <Grid2 size={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Loại đất</InputLabel>
                  <Select defaultValue="">
                    {Object.entries(LOAI_DAT).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value} ({key})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid2>

              <Grid2 size={3}>
                <TextField
                  size="small"
                  fullWidth
                  label="Diện tích"
                  variant="outlined"
                  type="number"
                />
              </Grid2>
              <Grid2 size={3}>
                <Grid2 size={6}>
                  <DatePicker
                    label="Thời hạn"
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        variant: "outlined",
                      },
                    }}
                  />
                </Grid2>
              </Grid2>
            </Grid2>
            <Grid2 container size={12}>
              {" "}
              <Grid2 size={3}>
                <TextField
                  size="small"
                  fullWidth
                  label="Mục đích chi tiết"
                  variant="outlined"
                />
              </Grid2>
              <Grid2 size={3}>
                <TextField
                  size="small"
                  fullWidth
                  label="Nguồn gốc"
                  variant="outlined"
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </form>
      </LocalizationProvider>
    </Box>
  );
}

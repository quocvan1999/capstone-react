import { http } from "../../utils/setting";

export const dangKyApiAsync = async (userRegister) => {
  const res = await http.post("/api/QuanLyNguoiDung/DangKy", userRegister);
  return res.data;
};

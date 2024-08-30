import { http } from "../../utils/setting";

export const themNguoiDungApiAsync = async (newUser) => {
  const res = await http.post("/api/QuanLyNguoiDung/ThemNguoiDung", newUser);
  return res.data;
};

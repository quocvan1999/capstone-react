import { SECRET_KEY } from "../../utils/internalVariable";
import {
  encryptionString,
  notificationCustome,
  setCookie,
} from "../../utils/method/method";
import { http } from "../../utils/setting";

export const dangNhapApiAsync = async (userLogin) => {
  const res = await http.post("/api/QuanLyNguoiDung/DangNhap", userLogin);
  return res.data;
};

export const kiemTraThongTinDangNhap = (
  res,
  variables,
  api,
  navigate,
  isRemember
) => {
  switch (res.statusCode) {
    case 200:
      if (res?.content.maLoaiNguoiDung === "QuanTri") {
        if (isRemember === true) {
          const taiKhoan = encryptionString(variables.taiKhoan, SECRET_KEY);
          const matKhau = encryptionString(variables.matKhau, SECRET_KEY);
          setCookie("t", taiKhoan, 7);
          setCookie("m", matKhau, 7);
        }
        setCookie("accessToken", res.content.accessToken);
        setCookie("auth", res.content.accessToken);
        notificationCustome(api, "Thông báo", "Đăng nhập Thành công");
        setTimeout(() => {
          navigate("/admin");
        }, 3000);
      } else {
        notificationCustome(
          api,
          "Thông báo",
          "Tài khoản không đủ quyền để truy cập"
        );
      }
      break;
    default:
      break;
  }
};

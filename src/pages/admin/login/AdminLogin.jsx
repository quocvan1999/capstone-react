import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, notification } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import {
  dangNhapApiAsync,
  kiemTraThongTinDangNhap,
} from "../../../apis/login/login.api";
import { useState } from "react";
import { decodeString } from "../../../utils/method/method";
import { SECRET_KEY } from "../../../utils/internalVariable";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isRemember, setIsRemember] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const initialValues = {
    taiKhoan: `${decodeString("t", SECRET_KEY)}`,
    matKhau: `${decodeString("m", SECRET_KEY)}`,
  };

  const mutationLogin = useMutation({
    mutationFn: dangNhapApiAsync,
    onSuccess: (res, variables) => {
      kiemTraThongTinDangNhap(res, variables, api, navigate, isRemember);
    },
  });

  const formLogin = useFormik({
    initialValues,
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Tài khoản không được để trống"),
      matKhau: Yup.string().required("Mật khẩu không được để trống"),
    }),
    onSubmit: (values) => {
      mutationLogin.mutate(values);
    },
  });

  return (
    <div className="min-w-[350px] bg-white shadow-lg rounded-md p-5">
      {contextHolder}
      <h1 className="uppercase text-center font-bold text-2xl py-4">
        Đăng nhập
      </h1>
      <Form onSubmitCapture={formLogin.handleSubmit}>
        <Form.Item
          className="mb-4"
          validateStatus={
            formLogin.touched.taiKhoan && formLogin.errors.taiKhoan
              ? "error"
              : ""
          }
          help={formLogin.touched.taiKhoan && formLogin.errors.taiKhoan}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Tài khoản"
            name="taiKhoan"
            defaultValue={formLogin.initialValues.taiKhoan}
            onChange={formLogin.handleChange}
          />
        </Form.Item>
        <Form.Item
          className="mb-1"
          validateStatus={
            formLogin.touched.matKhau && formLogin.errors.matKhau ? "error" : ""
          }
          help={formLogin.touched.matKhau && formLogin.errors.matKhau}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Mật khẩu"
            name="matKhau"
            defaultValue={formLogin.initialValues.matKhau}
            onChange={formLogin.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={isRemember}
            onChange={() => {
              setIsRemember(!isRemember);
            }}
          >
            Nhớ mật khẩu
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="w-full" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
        <Flex justify="center" gap={3} className="mt-3">
          <p>Bạn chưa có tài khoản?</p>
          <NavLink
            to="/auth/register"
            className="text-primary hover:underline transition-all duration-500 ease-in-out"
          >
            Đăng ký
          </NavLink>
        </Flex>
      </Form>
    </div>
  );
};

export default AdminLogin;

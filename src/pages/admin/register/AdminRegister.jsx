import {
  AntDesignOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Form, Input, notification } from "antd";
import { useFormik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { dangKyApiAsync } from "../../../apis/register/register.api";
import { themNguoiDungApiAsync } from "../../../apis/createUser/createUser.api";
import { ADMIN_KEY } from "../../../utils/internalVariable";
import { notificationCustome } from "../../../utils/method/method";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [adminKey, setAdminKey] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const initialValues = {
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "",
    maLoaiNguoiDung: "",
    hoTen: "",
  };

  const mutationRegister = useMutation({
    mutationFn: dangKyApiAsync,
    onSuccess: (res) => {
      console.log(res);
      if (res.statusCode === 200) {
        notificationCustome(api, "Thông báo", "Đăng ký thành công");
        setTimeout(() => {
          navigate("/auth");
        }, 2000);
      } else {
        notificationCustome(api, "Thông báo", res.content);
      }
    },
  });

  const mutationCreateUser = useMutation({
    mutationFn: themNguoiDungApiAsync,
    onSuccess: (res) => {
      console.log(res);

      if (res.statusCode === 200) {
        notificationCustome(api, "Thông báo", "Đăng ký thành công");
        setTimeout(() => {
          navigate("/auth");
        }, 2000);
      } else {
        notificationCustome(api, "Thông báo", res.content);
      }
    },
  });

  const formLogin = useFormik({
    initialValues,
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Tài khoản không được để trống"),
      matKhau: Yup.string().required("Mật khẩu không được để trống"),
      email: Yup.string()
        .email("Nhập đúng định dạng email")
        .required("Email không được để trống"),
      soDt: Yup.string().required("Số điện thoại không được để trống"),
      hoTen: Yup.string().required("Họ tên không được để trống"),
    }),
    onSubmit: (values) => {
      if (adminKey === "") {
        mutationRegister.mutate(values);
      } else {
        if (adminKey === ADMIN_KEY) {
          mutationCreateUser.mutate({
            ...values,
            maNhom: "GP01",
            maLoaiNguoiDung: "QuanTri",
          });
        } else {
          notificationCustome(api, "Thông báo", "Admin key không chính xác");
        }
      }
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
          className="mb-4"
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

        <Form.Item
          className="mb-4"
          validateStatus={
            formLogin.touched.email && formLogin.errors.email ? "error" : ""
          }
          help={formLogin.touched.email && formLogin.errors.email}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Email"
            name="email"
            defaultValue={formLogin.initialValues.email}
            onChange={formLogin.handleChange}
          />
        </Form.Item>

        <Form.Item
          className="mb-4"
          validateStatus={
            formLogin.touched.soDt && formLogin.errors.soDt ? "error" : ""
          }
          help={formLogin.touched.soDt && formLogin.errors.soDt}
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Số điện thoại"
            name="soDt"
            type="number"
            defaultValue={formLogin.initialValues.soDt}
            onChange={formLogin.handleChange}
          />
        </Form.Item>

        <Form.Item
          className="mb-4"
          validateStatus={
            formLogin.touched.hoTen && formLogin.errors.hoTen ? "error" : ""
          }
          help={formLogin.touched.hoTen && formLogin.errors.hoTen}
        >
          <Input
            prefix={<UserSwitchOutlined />}
            placeholder="Họ tên"
            name="hoTen"
            defaultValue={formLogin.initialValues.hoTen}
            onChange={formLogin.handleChange}
          />
        </Form.Item>

        <Form.Item className="mb-4">
          <Input
            prefix={<AntDesignOutlined />}
            placeholder="Nhập admin key để tạo tài khoản admin"
            onChange={(e) => {
              setAdminKey(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item className="mt-5">
          <Button type="primary" className="w-full" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
        <Flex justify="center" gap={3} className="mt-3">
          <p>Bạn đã có tài khoản?</p>
          <NavLink
            to="/auth"
            className="text-primary hover:underline transition-all duration-500 ease-in-out"
          >
            Đăng nhập
          </NavLink>
        </Flex>
      </Form>
    </div>
  );
};

export default AdminRegister;

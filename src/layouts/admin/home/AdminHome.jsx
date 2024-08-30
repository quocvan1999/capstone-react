import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getCookie } from "../../../utils/method/method";
import LoadingComponent from "../../../components/admin/LoadingComponent/LoadingComponent";

const AdminHome = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const checkLogin = () => {
    const accessToken = getCookie("accessToken");
    if (accessToken !== null) {
      setIsLogin(true);
    } else {
      navigate("/auth");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      {isLogin === true ? (
        <div>
          AdminHome
          <div>
            <Outlet />
          </div>
        </div>
      ) : (
        <LoadingComponent type="page" />
      )}
    </>
  );
};

export default AdminHome;

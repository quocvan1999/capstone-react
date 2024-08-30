import { Outlet } from "react-router-dom";

const AdminHome = () => {
  return (
    <div>
      AdminHome
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminHome;

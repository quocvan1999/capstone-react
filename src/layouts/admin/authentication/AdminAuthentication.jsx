import { Outlet } from "react-router-dom";

const AdminAuthentication = () => {
  return (
    <div className="w-full min-h-[100vh] bg-gray-200 flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AdminAuthentication;

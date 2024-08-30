import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHome from "./layouts/admin/home/AdminHome";
import Users from "./pages/admin/user/users/Users";
import AdminAuthentication from "./layouts/admin/authentication/AdminAuthentication";
import AdminLogin from "./pages/admin/login/AdminLogin";
import AdminRegister from "./pages/admin/register/AdminRegister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* ADMIN HOME ROUTER */}
        <Routes>
          <Route path="/admin" element={<AdminHome />}>
            <Route index element={<Users />} />
          </Route>
          {/* AUTH ROUTER */}
          <Route path="/auth" element={<AdminAuthentication />}>
            <Route index element={<AdminLogin />} />
            <Route path="register" element={<AdminRegister />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

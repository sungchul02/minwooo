import { BrowserRouter, Routes, Route } from "react-router-dom";

// Guide
import Guide from "./guide/Guide";

// Client
import ClientList from "./client/ClientList";
import ClientWrite from "./client/ClientWrite";
import ClientDetail from "./client/ClientDetail";

// Counselor
import CounselorList from "./counselor/CounselorList";
import CounselorDetail from "./counselor/CounselorDetail";
import CounselorLogin from "./login/CounselorLogin";

// 보호 라우터
function ProtectedRoute({ element }) {
  const role = localStorage.getItem("role");
  if (role === "counselor") return element;
  return <CounselorLogin />;
}

function Router() {
  return (
    <BrowserRouter basename="/minwooo">
      <Routes>
        <Route path="/guide" element={<Guide />} />
        <Route path="/client" element={<ClientList />} />
        <Route path="/client/write" element={<ClientWrite />} />
        <Route path="/client/detail/:id" element={<ClientDetail />} />

        <Route path="/counselor-login" element={<CounselorLogin />} />

        <Route
          path="/counselor"
          element={<ProtectedRoute element={<CounselorList />} />}
        />

        <Route
          path="/counselor/detail/:id"
          element={<ProtectedRoute element={<CounselorDetail />} />}
        />

        <Route path="*" element={<Guide />} />
      </Routes>
    </BrowserRouter>
  );
}


export default Router;

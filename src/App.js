import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sign from "./components/SignComponents/register_login";
import ForgotPassword from "./components/SignComponents/ForgotPassword";
import VerifyCode from "./components/SignComponents/VerifyCode";
import ResetPassword from "./components/SignComponents/ResetPassword";
import DoctorProfile from "./components/Profiles/DoctorProfile";
import Profile from "./components/Profiles/profile";
import UpdateInfo from "./components/Profiles/Updateinfo";
import { Header, Footer } from "./components/HomePage/HomePage"; 
import HomePage from "./components/HomePage/HomePageMain"; 
import SymptomForm from "./components/Check_Symptoms/SymptomForm";
import DiseaseReport from "./components/Check_Symptoms/DiseaseReport";
import { AuthProvider } from "./context/AuthContext"; 
import NotFoundPage from "./components/NotFound/NotFoundPage";
function App() {
  const location = useLocation();

  const hideHeaderFooterRoutes = ["/login", "/forgot", "/verify-code", "/reset-password","/register"];
  const hideFooterRoutes = ["/login", "/forgot", "/verify-code", "/reset-password", "/disease-report", 
    "/symptom-form", "/update-info", "/profile", "/not-found", "/register"];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      {!shouldHideHeaderFooter && <Header />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Sign defaultMode="login" />} />
        <Route path="/register" element={<Sign defaultMode="register" />} /> 
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-info" element={<UpdateInfo />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/symptom-form" element={<SymptomForm />} />
        <Route path="/disease-report" element={<DiseaseReport />} />
        <Route path="/not-found" element={<NotFoundPage />} /> 
        <Route path="*" element={<NotFoundPage />} />

      </Routes>

      {!shouldHideHeaderFooter && !shouldHideFooter && <Footer />}
    </AuthProvider>
  );
}

export default App;

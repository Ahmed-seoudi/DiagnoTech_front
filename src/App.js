import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sign from "./components/SignComponents/register_login";
import ForgotPassword from "./components/SignComponents/ForgotPassword";
import VerifyCode from "./components/SignComponents/VerifyCode";
import ResetPassword from "./components/SignComponents/ResetPassword";
import DoctorProfile from "./components/Profiles/DoctorProfile";
import Profile from "./components/Profiles/profile";
import UpdateInfo from "./components/Profiles/Updateinfo";
import HomePage from "./components/HomePage/HomePage";
import Header from "./components/HomePage/Header";
import Footer from "./components/HomePage/Footer";
import SymptomForm from "./components/Check_Symptoms/SymptomForm";
import DiseaseReport from "./components/Check_Symptoms/DiseaseReport";

function App() {
  const location = useLocation();

// Hide Footer And Header From Login Page
  const hideHeaderFooterRoutes = ["/login" , "/forgot" , "/verify-code" , "/reset-password"];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Sign />} />
        <Route path="/doctor" element={<DoctorProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-info" element={<UpdateInfo />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/symptom-form" element={<SymptomForm />} />
        <Route path="/disease-report" element={<DiseaseReport/>} />
      </Routes>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
}

export default App;

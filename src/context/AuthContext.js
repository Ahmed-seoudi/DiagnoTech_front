import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ اقرأ من localStorage وقت تشغيل الصفحة
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("jwt");
    return !!token; // true إذا فيه توكن
  });

  // ✅ لما يدخل المستخدم يتم تخزين التوكن وتغيير حالة isLoggedIn
  const login = (token) => {
    localStorage.setItem("jwt", token);
    setIsLoggedIn(true);
  };

  // ✅ عند تسجيل الخروج يتم حذف التوكن وتحديث الحالة
  const logout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



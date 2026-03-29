import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Predict from "./pages/Predict";
import Success from "./pages/Success";
import Dashboard from "./pages/Dashboard";
import Loading from "./components/Loading";
import useAuth from "./context/auth";

import { useEffect } from "react";
import { BACKEND_URL } from './context/constants'

function App() {

  const { checkAuth, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/success" element={<Success />} />

        <Route path="/predict" element={
          isAuthenticated ? <Predict /> : <Navigate to="/signin" />}
        />
        <Route path="/dashboard" element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

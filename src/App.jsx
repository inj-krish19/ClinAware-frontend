import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Success from "./pages/Success";

import Predict from "./pages/Predict";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";

import News from "./pages/News";
import { useEffect } from "react";
import useAuth from "./context/auth";

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
        <Route path="/news" element={<News />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/success" element={<Success />} />


        <Route path="/predict" element={
          isAuthenticated ? <Predict /> : <Navigate to="/signin" />}
        />
        <Route path="/history" element={
          isAuthenticated ? <History /> : <Navigate to="/signin" />}
        />

        <Route path="/analysis" element={
          isAuthenticated ? <Analysis /> : <Navigate to="/signin" />}
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

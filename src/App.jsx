import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Predict from "./pages/Predict";

function App() {
  return (
    <div className="bg-stone-50 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-stone-100 selection:bg-cyan-400 selection:text-slate-900">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/predict" element={<Predict />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
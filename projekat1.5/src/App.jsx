 import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Onama from "./pages/Onama";
import Zaposleni from "./pages/Zaposleni";

import Register from "./Auth/Register";
import Login from "./Auth/Login";
import LogOut from "./Auth/LogOut";
import Rezervacija from "./pages/Rezervacija";
import MainLayout from "./components/MainLayout";
import Cenovnik from "./pages/Cenovnik";
import { useEffect, useState } from "react";
import Loader from "./components/loader";
import AdminRezervacije from "./pages/AdminRezervacije";
const ADMIN_EMAIL = "vuk";
function App() {
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulacija ili global init (firebase, auth, itd.)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // možeš i bez timeout-a

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  return (
    <BrowserRouter>
      <Routes>

         
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="o-nama" element={<Onama />} />
          <Route path="zaposleni" element={<Zaposleni />} />
         
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogOut />} />
         <Route path="/rezervacija" element={<Rezervacija/>} />
         <Route path="/cenovnik" element={<Cenovnik />} />
         <Route path="/admin" element={<AdminRezervacije />} />
         </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
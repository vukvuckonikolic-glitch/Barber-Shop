 import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";

import { CSSTransition, SwitchTransition } from "react-transition-group";

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const nodeRef = useRef(null); // 🔥 DODAJ OVO

  const [authLoading, setAuthLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        if (
          location.pathname !== "/login" &&
          location.pathname !== "/register"
        ) {
          navigate("/register");
        }
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  useEffect(() => {
    setRouteLoading(true);

    const timer = setTimeout(() => {
      setRouteLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (authLoading || routeLoading) {
    return <Loader />;
  }

  return (
    <div className="layout">
      <Header />

      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          timeout={250}
          classNames="fade"
          unmountOnExit
          nodeRef={nodeRef} 
        >
          <div ref={nodeRef} className="main">
            <Outlet />
          </div>
        </CSSTransition>
      </SwitchTransition>

      <Footer />
    </div>
  );
}

export default MainLayout;
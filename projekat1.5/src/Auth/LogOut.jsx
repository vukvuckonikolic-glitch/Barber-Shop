 
 import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await signOut(auth);
        navigate("/login");
      } catch (err) {
        console.log(err.message);
      }
    };

    logout();
  }, [navigate]);

  return <h2>Logging out...</h2>;
}

export default LogOut;
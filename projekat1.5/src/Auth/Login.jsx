import { useState } from "react";
import { auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

 
  const login = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      console.log("Ulogovan si");
      navigate("/");
    } catch (err) {
      console.log("LOGIN ERROR:", err.code, err.message);
      alert("Greška pri logovanju");
    }
  };

  
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);

      console.log("Google login OK");
      navigate("/");
    } catch (error) {
      console.log("GOOGLE ERROR:", error.code, error.message);
      alert("Google login greška");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <div className="auth-box">

          <h2>LOGIN</h2>

          {/* EMAIL LOGIN */}
          <form onSubmit={login}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="logindugme">
              Login
            </button>

            <p>
              Nemas nalog?{" "}
              <Link className="link" to="/register">
                Register
              </Link>
            </p>
          </form>

          {/* GOOGLE LOGIN */}
          <button
            type="button"
            className="google-login-btn"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </button>

        </div>
      </div>
    </div>
  );
}

export default Login;
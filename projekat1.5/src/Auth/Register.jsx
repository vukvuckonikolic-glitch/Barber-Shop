 import { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const register = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      navigate("/");
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <div className="auth-box">

          <h2>REGISTER</h2>

          <form onSubmit={register}>
            <input
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
              Registruj se
            </button>

            <p>
              Imas nalog? <Link className="link" to="/login">Login</Link>
            </p>
          </form>

          <button
            type="button"
            className="google-login-btn"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />
            Continue with Google
          </button>

        </div>
      </div>
    </div>
  );
}

export default Register;
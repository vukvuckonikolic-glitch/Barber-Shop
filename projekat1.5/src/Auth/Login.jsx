import { useState } from "react";
import { auth, db } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const configRef = doc(db, "system", "config");
    const configSnap = await getDoc(configRef);

    let isFirstAdmin = false;

    if (!configSnap.exists()) {
      await setDoc(configRef, { isAdminCreated: true });
      isFirstAdmin = true;
    } else {
      const data = configSnap.data();

      if (!data.isAdminCreated) {
        isFirstAdmin = true;
        await setDoc(configRef, { isAdminCreated: true }, { merge: true });
      }
    }

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: isFirstAdmin ? "admin" : "user",
      createdAt: new Date(),
    });

    navigate("/");
  } catch (error) {
    console.log(error.code, error.message);
  }
};

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <div className="auth-box">

          <h2>LOGIN</h2>

        
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
 import { FaPhone, FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loadingRole, setLoadingRole] = useState(true);

  const navigate = useNavigate();

  function toggleMenu() {
    setOpen((prev) => !prev);
  }

  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        try {
          const snap = await getDoc(doc(db, "users", user.uid));

          if (snap.exists()) {
            setRole(snap.data().role);
          } else {
            setRole(null);
          }
        } catch (err) {
          console.log(err);
          setRole(null);
        }
      } else {
        setRole(null);
      }

      setLoadingRole(false);
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/register");
  };

  return (
    <header>
      <div className="prenav">
        <div className="div1">
          <li className="broj">
            <FaPhone className="icon" />
            <a href="tel:+381691206677">+381 69 120 66 77</a>
          </li>

          <li className="kuca">
            <FaHome className="icon" />
            <a
              href="https://www.google.com/maps?q=Kragujevac+Ilindenska+40"
              target="_blank"
              rel="noreferrer"
            >
              Kragujevac Ilindenska 40
            </a>
          </li>
        </div>

        <div className="div2">
          <li className="kontakt">
            <FaPhone className="icon" />
            <a href="tel:+381693351885">+381 69 335 1885</a>
          </li>

          <li className="kuca">
            <FaHome className="icon" />
            <a
              href="https://www.google.com/maps?q=Petra+Karadjordjevica+15"
              target="_blank"
              rel="noreferrer"
            >
              Petra Karadjordjevica 15
            </a>
          </li>
        </div>

        <div className="izlogujse">
          {user && (
            <li className="logout-item">
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </div>
      </div>

      <nav>
        <div className="paragraf">
          <p>BRICKO</p>
        </div>

        <div className="burger" onClick={toggleMenu}>
          ☰
        </div>

        <ul className={`nav-links ${open ? "active" : ""}`}>
          <li>
            <Link to="/">Pocetna</Link>
          </li>

          <li>
            <Link to="/o-nama">O nama</Link>
          </li>

          <li>
            <Link to="/zaposleni">Zaposleni</Link>
          </li>

          <li>
            <Link to="/cenovnik">Cenovnik</Link>
          </li>
 
          {role === "admin" && (
            <li>
              <Link to="/admin">Admin Panel</Link>
            </li>
          )}

          <li className="rezervacija">
            <Link to="/rezervacija" className="rezervacija1">
              Rezervacija
            </Link>
          </li>
 
          {!loadingRole && !user && (
            <div className="reglogin">
              <li className="rezervacija regi">
                <Link to="/register">Register</Link>
              </li>

              <li className="separator">/</li>

              <li className="rezervacija logi">
                <Link to="/login">Login</Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
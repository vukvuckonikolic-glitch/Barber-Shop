 import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function AdminRezervacije() {
  const [rezervacije, setRezervacije] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const navigate = useNavigate();

 
  useEffect(() => {
    const auth = getAuth();

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/");
        return;
      }

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          navigate("/");
          return;
        }

        const role = (snap.data().role || "").trim();

        if (role !== "admin") {
          navigate("/");
        }

      } catch (err) {
        console.log(err);
        navigate("/");
      }
    });

    return () => unsub();
  }, [navigate]);
 
  const fetchRezervacije = async () => {
    const snap = await getDocs(collection(db, "reservations"));

    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setRezervacije(data);
  };
 
  const fetchSlots = async () => {
    const snap = await getDocs(collection(db, "availableSlots"));

    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setSlots(data);
  };
 
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchRezervacije();
      await fetchSlots();
      setLoading(false);
    };

    load();
  }, []);
 
  const addSlot = async () => {
    if (!newDate || !newTime) {
      alert("Izaberi datum i vreme");
      return;
    }

    await addDoc(collection(db, "availableSlots"), {
      date: newDate,
      time: newTime,
    });

    setNewDate("");
    setNewTime("");

    await fetchSlots();
  };
 
  const obrisiSlot = async (id) => {
    if (!window.confirm("Obrisati termin?")) return;

    await deleteDoc(doc(db, "availableSlots", id));
    await fetchSlots();
  };
 
  const obrisiRezervaciju = async (id) => {
    if (!window.confirm("Obrisati rezervaciju?")) return;

    await deleteDoc(doc(db, "reservations", id));
    await fetchRezervacije();
  };

  return (
    <div className="admin-container">
      <h1>ADMIN PANEL</h1>
 
    <div className="adminglavni">
  <h3 className="admin-title">Dodaj termin</h3>

  <div className="admin-form">
    <input
      type="date"
      value={newDate}
      onChange={(e) => setNewDate(e.target.value)}
      className="admin-input"
    />

    <input
      type="time"
      value={newTime}
      onChange={(e) => setNewTime(e.target.value)}
      className="admin-input"
    />

    <button onClick={addSlot} className="admin-btn">
      Dodaj termin
    </button>
  </div>
</div>

     
      <h2>TERMINI</h2>

      <table className="admin-table" style={{ marginBottom: "40px" }}>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Vreme</th>
            <th>Akcija</th>
          </tr>
        </thead>

        <tbody>
          {slots.length === 0 ? (
            <tr>
              <td colSpan="3">Nema termina</td>
            </tr>
          ) : (
            slots.map((s) => (
              <tr key={s.id}>
                <td>{s.date}</td>
                <td>{s.time}</td>
                <td>
                  <button onClick={() => obrisiSlot(s.id)}>
                    Obriši
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
 
      <h2>REZERVACIJE</h2>

      {loading ? (
        <p>Učitavanje...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Ime</th>
              <th>Telefon</th>
              <th>Email</th>
              <th>Datum</th>
              <th>Vreme</th>
              <th>Usluga</th>
              <th>Akcija</th>
            </tr>
          </thead>

          <tbody>
            {rezervacije.length === 0 ? (
              <tr>
                <td colSpan="7">Nema rezervacija</td>
              </tr>
            ) : (
              rezervacije.map((r) => (
                <tr key={r.id}>
                  <td>{r.ime} {r.prezime}</td>
                  <td>{r.telefon}</td>
                  <td>{r.email}</td>
                  <td>{r.date}</td>
                  <td>{r.time}</td>
                  <td>{r.usluga}</td>
                  <td>
                    <button onClick={() => obrisiRezervaciju(r.id)}>
                      Obriši
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminRezervacije;
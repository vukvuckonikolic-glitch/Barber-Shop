 import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

function Rezervacija() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [slots, setSlots] = useState([]);
  const [booked, setBooked] = useState([]);

  const [form, setForm] = useState({
    ime: "",
    prezime: "",
    telefon: "",
    email: "",
    usluga: "",
  });

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const fetchSlots = async () => {
    const snap = await getDocs(collection(db, "availableSlots"));

    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setSlots(data);
  };

   
  const fetchBooked = async (selectedDate) => {
    const q = query(
      collection(db, "reservations"),
      where("date", "==", selectedDate)
    );

    const snap = await getDocs(q);

    setBooked(snap.docs.map((d) => d.data().time));
  };
 
  useEffect(() => {
    fetchSlots();
  }, []);
 
  const handleDateChange = (e) => {
    const selected = e.target.value;
    setDate(selected);
    setTime("");
    fetchBooked(selected);
  };
 
  const filteredSlots = slots.filter((s) => s.date === date);
 
  const isFormValid =
    date &&
    time &&
    form.ime &&
    form.prezime &&
    form.telefon &&
    form.email &&
    form.usluga;
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Popuni sva polja!");
      return;
    }
 
    const checkQuery = query(
      collection(db, "reservations"),
      where("date", "==", date),
      where("time", "==", time)
    );

    const snap = await getDocs(checkQuery);

    if (!snap.empty) {
      alert("Termin je već zauzet!");
      return;
    }

   
    await addDoc(collection(db, "reservations"), {
      ...form,
      date,
      time,
      createdAt: new Date(),
    });

    
    await fetchBooked(date);

    // 🧹 RESET
    setForm({
      ime: "",
      prezime: "",
      telefon: "",
      email: "",
      usluga: "",
    });

    setTime("");

    alert("Rezervisano!");
  };

  return (
    <div className="rezervacija-form">
      <form onSubmit={handleSubmit}>
        <h2>Rezerviši termin</h2>

        
        <input
          type="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={handleDateChange}
        />

      
        {date && (
          <div className="dropdown-termini">
            <p>Izaberi termin</p>

            <select value={time} onChange={(e) => setTime(e.target.value)}>
              <option value="">-- slobodni termini --</option>

              {filteredSlots
                .filter((slot) => !booked.includes(slot.time))
                .map((slot) => (
                  <option key={slot.id} value={slot.time}>
                    {slot.time}
                  </option>
                ))}
            </select>
          </div>
        )}

        
        <input name="ime" placeholder="Ime" value={form.ime} onChange={handleChange} />
        <input name="prezime" placeholder="Prezime" value={form.prezime} onChange={handleChange} />
        <input name="telefon" placeholder="Telefon" value={form.telefon} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />

         
        <select name="usluga" value={form.usluga} onChange={handleChange}>
          <option value="">Izaberi uslugu</option>
          <option value="sisanje">Klasično šišanje - 500 din</option>
          <option value="brijanje">Brijanje glave - 500 din</option>
          <option value="fade">Fade šišanje - 1000 din</option>
          <option value="fade-brada">Fade + brada - 1500 din</option>
          <option value="klasicno-brada">Klasično šišanje + brada - 1200 din</option>
        </select>

       
        <button type="submit" disabled={!isFormValid}>
          Zakaži
        </button>
      </form>
    </div>
  );
}

export default Rezervacija;
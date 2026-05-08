 import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Cenovnik() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      const querySnapshot = await getDocs(collection(db, "cenovnik"));

      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setPrices(data);
    };

    fetchPrices();
  }, []);
 
 return (
  <div className="container">
    <h1 className="title">Cenovnik</h1>

    <div className="box">

  
      <div className="row header">
        <div className="col c">Usluga</div>
        <div className="col center c">Vreme</div>
        <div className="col right c">Cena</div>
      </div>

    
      {prices.map((item) => (
        <div key={item.id} className="row">

          <div className="col service">
            {item.usluga} <span className="sub">{item.name}</span>
          </div>

          <div className="col center time">
            {item.vreme} min
          </div>

          <div className="col right price">
            {item.cena} RSD
          </div>

        </div>
      ))}

    </div>
  </div>
);
}

export default Cenovnik
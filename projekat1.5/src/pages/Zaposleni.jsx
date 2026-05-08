
function Zaposleni() {
  return (
    <section className="zaposleni">

      <h1 className="naslovzaposleni">Naši Frizeri</h1>

      <p className="adresa">Ilindenska 40, Kragujevac</p>

      <div className="grid">

        <div className="card-prva">
          <div className="img-box prva">
            <img src="/slike"   />
            <div className="overlay">Marko Marković</div>
          </div>
        </div>

        <div className="card">
          <div className="img-box druga">
            <img src="/slike/2.jpg"   />
            <div className="overlay">Nemanja Jovanović</div>
          </div>
        </div>

        <div className="card">
          <div className="img-box treca">
            <img src="/slike/3.jpg"   />
            <div className="overlay">Stefan Petrović</div>
          </div>
        </div>

        <div className="card">
          <div className="img-box cetvrta">
            <img src="/slike/4.jpg"   />
            <div className="overlay">Luka Ilić</div>
          </div>
        </div>

      </div>

    </section>
  );
}

export default Zaposleni;
import Cenovnik from "./Cenovnik";
 import { Link } from "react-router-dom";
 
function Home(){
    return(
        <div>
        <div className="home">
             <div className="center-box">

  <h1>BRICKO</h1>

  <p>1.Kragujevac Ilindenska 40-Kragujevac</p>

  <p>2.Petra Karadjordjevica 15-Kragujevac</p>
 
  <Link to="/rezervacija">
  <button>Zakazi termin</button>
</Link>

</div>

        </div>
        
        <div className="rodrod">
                <div className="onamarod"> 
                <p className="onama-tekst-jedinstven">
                    Zanimljiva istorija berberskog zanata počinje još u starom Egiptu, a mi tu tradiciju nastavljamo danas u samom srcu grada. Bricko berbernica nije samo mesto za šišanje, već prostor gde se spajaju autentična atmosfera, vrhunska usluga i pravi muški hedonizam. Naš cilj je da svaki klijent oseti miris najkvalitetnije kozmetike i preciznost britve koja čuva stari zanat. Od klasičnih frizura do modernog oblikovanja brade, posvećeni smo svakom detalju jer vaša kosa i brada zaslužuju najbolje. Vidimo se u stolici!
                </p>

                </div>
            </div>
            
    <section className="zaposleni">

      <h1>Naši Frizeri</h1>

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
    <Cenovnik></Cenovnik>
        </div>
        
    )
}

export default Home;
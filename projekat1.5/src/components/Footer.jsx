 import {
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope,
  FaInstagram
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="contact-section">
      <div className="contact-grid">
        <div className="contact-brand">
          <div className="brand-title">
            <h2>BRICKO</h2>
            <span>BARBER SHOP</span>
          </div>

          <p>
            Premium iskustvo gde se preciznost, stil i tradicija spajaju u jednu formu modernog barber arta.
          </p>

          <a
            className="insta"
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram /> Prati nas
          </a>
        </div>

        
        <div className="contact-info">
          <h3>Kontakt</h3>

          <a href="tel:+38160000000">
            <FaPhone /> +381 60 000 000
          </a>

          <a href="mailto:kontakt@bricko.com">
            <FaEnvelope /> kontakt@bricko.com
          </a>

          <p>
            <FaMapMarkerAlt /> Kragujevac, Srbija
          </p>

          <p>
            <FaClock /> Pon - Sub | 09:00 - 20:00
          </p>
        </div>

        <div className="contact-map">
           <iframe
  title="Bricko Barber Shop"
  src="https://www.google.com/maps?q=Kragujevac%20Ilindenska%2040&output=embed"
  loading="lazy"
  allowFullScreen
/>
        </div>

      </div>
      
      <div className="footer-bottom">
        <p>© 2026 Bricko Barber Shop — All rights reserved</p>
      </div>

    </footer>
  );
}

export default Footer;
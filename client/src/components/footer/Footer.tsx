import React from "react";
import "./footer.scss";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">  
      <p><strong>© {year} A&E Boutique</strong></p>
      <p>Todos los derechos reservados</p>
    </footer>
  );
};

export default Footer;
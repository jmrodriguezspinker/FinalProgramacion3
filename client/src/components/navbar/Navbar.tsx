import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AboutIcon, CatalogIcon, ContactIcon, LoginIcon, ProfileIcon } from "../icons";
import { Menu } from "../menu/Menu";
import logo from "../../assets/images/logo.jpg";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import useWindowDimensions from "../../hooks/WindowDimension";
import { isTokenValid } from "../../utilities/isTokenvalid";
import "./navbar.scss";


function DesktopNavbar() {
  const { openCart, cartQuantity } = useShoppingCart();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid());

  useEffect(() => {
    setIsLoggedIn(isTokenValid());
  }, [location]);

  return (
    <nav className="navbar-container">
      <div className="navbar-inner container">
        <NavLink to="/" className="logo-link">
          <img src={logo} alt="Logo A&E Boutique" width={75} />
          <span>Altura y Estilo</span>
        </NavLink>

        <div className="nav-links">
          <NavLink to="/store" className="nav-link">
            <CatalogIcon />
            <span>Catálogo</span>
          </NavLink>
          <NavLink to="/about" className="nav-link">
            <AboutIcon />
            <span>Sobre nosotros</span>
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            <ContactIcon />
            <span>Contacto</span>
          </NavLink>
        </div>

        <div className="nav-actions">
          {cartQuantity > 0 && (
            <button className="cart-button" onClick={openCart} aria-label="Abrir carrito">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="30" height="40" fill="#C8AD7F">
                <path d="M528.12 301.319l47.273-208C578.806 79.403 564.611 64 547.28 64H143.64l-6.34-32.63A16 16 0 00121.5 16H16A16 16 0 000 32v16a16 16 0 0016 16h83.022l70.28 362.76C163.858 445.906 184.387 464 208 464h320a16 16 0 0016-16v-16a16 16 0 00-16-16H222.93l-9.4-48H494a32 32 0 0034.12-26.681zM208 512a48 48 0 1048-48 48 48 0 00-48 48zm288 0a48 48 0 1048-48 48 48 0 00-48 48z" />
              </svg>

              <div className="cart-badge">{cartQuantity}</div>
            </button>
          )}

          <NavLink to={isLoggedIn ? "/profile" : "/login"} className="nav-link">
            {isLoggedIn ? <ProfileIcon /> : <LoginIcon />}
            <span>{isLoggedIn ? "Perfil" : "Conectarme"}</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export const Navbar = () => {
  const { width } = useWindowDimensions();
  if (width < 691) {
    return <Menu />;
  }
  return <DesktopNavbar />;
};

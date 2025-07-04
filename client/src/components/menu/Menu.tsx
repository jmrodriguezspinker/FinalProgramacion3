import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import {
  HomeIcon,
  ProjectsIcon,
  ContactIcon,
  MenuHamburger,
  PersonIcon,
} from "../icons/Icons";
import "./menu.scss";

interface MenuItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface ClickEvent extends MouseEvent {
  target: EventTarget & HTMLElement;
}

export const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { openCart, cartQuantity } = useShoppingCart();

  const menuItems: MenuItem[] = [
    {
      name: "Inicio",
      href: "/",
      icon: (
        <HomeIcon className={location.pathname === "/" ? "active-icon" : ""} />
      ),
    },
    {
      name: "Catálogo",
      href: "/store",
      icon: (
        <ProjectsIcon
          className={location.pathname === "/store" ? "active-icon" : ""}
        />
      ),
    },
    {
      name: "Contacto",
      href: "/contact",
      icon: (
        <ContactIcon
          className={location.pathname === "/contact" ? "active-icon" : ""}
        />
      ),
    },
    {
      name: "Cuenta",
      href: "/profile",
      icon: (
        <PersonIcon
          className={location.pathname === "/profile" ? "active-icon" : ""}
        />
      ),
    },
  ];

  const handleClickOutside = (e: ClickEvent) => {
    if (!e.target.closest) return;

    const menuToggle = e.target.closest(".menu-toggle");
    if (menuToggle) return;

    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside as EventListener);

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside as EventListener
      );
    };
  }, []);

  const handleNavigate = (href: string) => {
    navigate(href);
  };

  return (
    <>
      <header id="mobile-header">
        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          id="menu-button"
          aria-label="Menu button"
        >
          <MenuHamburger />
        </button>
        <div className="nav-actions">
          {cartQuantity > 0 && (
            <button
              className="cart-button"
              onClick={openCart}
              aria-label="Open cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
              >
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
              </svg>
              <div className="cart-badge">{cartQuantity}</div>
            </button>
          )}
        </div>
      </header>

      <nav className={`menu ${isOpen ? "open" : ""}`} id="mobileNavbar">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.href}
              onClick={() => handleNavigate(item.href)}
              className={location.pathname === item.href ? "active-li" : ""}
            >
              {item.icon} {item.name}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // 👈 Asegúrate de tener Navigate
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import {
  Home,
  Store,
  AboutUs,
  ContactUs,
  Checkout,
  Login,
  Signup,
  Dashboard,
  TestLogin,
  Profile,
  OrderSuccess, 
  UserOrders
} from "./pages";
import { Navbar } from "./components/navbar/Navbar";
import { Spinner } from "./components/spinner/Spinner";
import Footer from "./components/footer/Footer";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import '@fontsource/cormorant-garamond';
import '@fontsource/montserrat';

import "./app.scss";

function App() {
  return (
    <ShoppingCartProvider>
      <Suspense fallback={<Spinner />}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          /**
          * * Rutas de pruebas
          **=============================================================
           */
          <Route path="/testlogin" element={<TestLogin />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order-success/:id" element={<OrderSuccess />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/user/:id" element={<UserOrders />} />
            {/* Agrega más rutas privadas aquí si quieres */}
          </Route>

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" />} />

          /**
          **=============================================================
           */
        </Routes>
        <Footer />
      </Suspense>
    </ShoppingCartProvider>
  );
}

export default App;

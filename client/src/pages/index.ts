import React from "react";

export const Home = React.lazy(() => import("./home/Home"));
export const Store = React.lazy(() => import("./store/Store"));
export const AboutUs = React.lazy(() => import("./aboutUs/About"));
export const ContactUs = React.lazy(() => import("./contact/ContactUs"));
export const Checkout = React.lazy(() => import("./checkout/Checkout"));
export const Login = React.lazy(() => import("./login/Login"));
export const Signup = React.lazy(() => import("./signup/SignUp"));

/**
 * *Rutas de prueba
 */
export const Dashboard = React.lazy(() => import("./dashboard/Dashboard"));
export const TestLogin = React.lazy(() => import("./login/TestLogin"));
export const Profile = React.lazy(() => import("./profile/Profile"));
export const OrderSuccess = React.lazy(() => import("./orderSuccess/OrderSuccess"));
export const UserOrders = React.lazy(() => import("./userOrders/UserOrders"));

// Login.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password
      });

      if (response.data.success && response.data.token) {
        // ✅ Guardar el token en localStorage
        localStorage.setItem('token', response.data.token);

        // Redirigir al dashboard o página protegida
        navigate('/dashboard');
      } else {
        setError("Credenciales incorrectas.");
      }
    } catch (err) {
      setError("Error al iniciar sesión.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Iniciar Sesión</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;

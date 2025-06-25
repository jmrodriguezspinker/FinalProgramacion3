import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importar SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // Importar los estilos de SweetAlert2
import "./login.scss";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      });

      if (response.data.token) {
        // Guardar token en localStorage o sessionStorage si es necesario
        localStorage.setItem("token", response.data.token);

        // Mostrar SweetAlert de éxito
        Swal.fire({
          title: '¡Bienvenido!',
          text: 'Has iniciado sesión correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          // Redirigir al usuario a la página principal (o dashboard)
          navigate("/");
        });
      } else {
        setError(response.data.message || 'Error al iniciar sesión.');
        // Mostrar SweetAlert de error
        Swal.fire({
          title: 'Error',
          text: response.data.message || 'Correo o contraseña incorrectos.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (err) {
      setError('Error al conectar con el servidor. Intenta más tarde.');
      // Mostrar SweetAlert de error en caso de fallo en la petición
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al intentar iniciar sesión. Intenta más tarde.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      console.error(err);
    }
  };

  return (
    <section className="login-container-wrapper">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Inicio de Sesión</legend>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Indique su email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Indique su contraseña"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Iniciar Sesión
            </button>
          </fieldset>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p className="create-account-link">
          ¿No tienes una cuenta? <Link to="/signup">Crea una Cuenta Aquí</Link>.
        </p>
      </div>
    </section>
  );
};

export default Login;

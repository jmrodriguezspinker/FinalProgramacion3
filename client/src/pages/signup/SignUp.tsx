import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate
import Swal from "sweetalert2"; // Importar SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css';
import "./signup.scss";

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Inicializar useNavigate para redirigir

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        email,
        password,
      });

      // Verificar el código de estado HTTP
      if (response.status === 201) {
        // Si el código de estado es 201, el registro fue exitoso
        setSuccess('¡Registro exitoso! Ya puedes iniciar sesión.');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        // Mostrar SweetAlert en caso de éxito
        Swal.fire({
          title: '¡Éxito!',
          text: 'Te has registrado correctamente. Ya puedes iniciar sesión.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          // Redirigir a la página principal después de hacer clic en "Aceptar"
          navigate('/'); // Redirige a '/'
        });
      } else if (response.status === 400 || response.status === 409) {
        // Si el código de estado es 400 o 409, hubo un error en la validación o el usuario ya existe
        setError(response.data.message || 'Hubo un problema al registrarte.');
        
        // Mostrar SweetAlert en caso de error
        Swal.fire({
          title: 'Error',
          text: response.data.message || 'Hubo un problema al registrarte. Intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (err) {
      setError('Ocurrió un error durante el registro. Intenta más tarde.');
      
      // Mostrar SweetAlert en caso de error en la solicitud
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al registrar tu cuenta. Intenta más tarde.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });

      console.error(err);
    }
  };

  return (
    <section className="login-container-wrapper">
      <div className="signup-container">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Inscríbete</legend>
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
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Indique su contraseña"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita la contraseña"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Inscribirse
            </button>
          </fieldset>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <p className="login-link">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión Aquí</Link>.
        </p>
      </div>
    </section>
  );
};

export default Signup;

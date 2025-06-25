// Dashboard.tsx
import React, { useEffect/* , useState */ } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  //const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/testlogin'); // 🔐 Si no hay token, redirigir
    } else {
      // Opcional: validar el token llamando al backend
      // fetchUserData(token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // ❌ Borrar token
    navigate('/testlogin'); // Redirigir al login
  };

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;

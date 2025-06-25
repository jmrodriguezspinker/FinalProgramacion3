import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { UserType } from "../../types/types";
import "./profile.scss";

const Profile: React.FC = () => {
    const [user, setUser] = useState<UserType | null>(null);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
       const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
    }

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response.data;
        setUser(userData);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
    } catch (err: any) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 401) {
                // Token expirado o no autorizado
                localStorage.removeItem("token");
                navigate("/login", { replace: true });
                return;
            }
        }
        console.error(err);
        setError("Error al obtener los datos del perfil.");
    }
};


        fetchProfile();
    }, [navigate]);

    const handleSave = async () => {
        if (!user) return;
        const token = localStorage.getItem("token");
        setSaving(true);

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/auth/profile`,
                { firstName, lastName },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setUser(response.data);
            setEditMode(false);
        } catch (err) {
            console.error(err);
            setError("Error al guardar los cambios.");
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/auth/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            localStorage.removeItem("token");
            navigate("/signup", { replace: true }); // o "/" si prefieres
        } catch (err) {
            console.error(err);
            setError("Error al eliminar la cuenta.");
        }
    };

    if (error) return <p className="error-message">{error}</p>;
    if (!user) return <p className="loading-message">Cargando perfil...</p>;

    return (
  <section className="profile-container-wrapper">
    <div className="profile-container">
      <h2>Perfil del Usuario</h2>

      {editMode ? (
        <>
          <div className="form-group">
            <label htmlFor="firstName">Nombre</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="button-group">
            <button onClick={handleSave} disabled={saving} className="primary-btn">
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
            <button onClick={() => setEditMode(false)} className="secondary-btn">
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <>
          <p><strong>Nombre:</strong> {user.firstName}</p>
          <p><strong>Apellido:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setEditMode(true)} className="primary-btn">Editar</button>
        </>
      )}

      <div className="action-buttons">
        <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
        <button onClick={handleDeleteAccount} className="delete-btn">Eliminar cuenta</button>
      </div>
    </div>
  </section>
);

};

export default Profile;



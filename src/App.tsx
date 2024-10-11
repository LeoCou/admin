import React, { useState } from 'react';
import Login from './components/Login';
import ImageUpload from './components/ImageUpload';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (loggedInUsername: string) => {
    setIsLoggedIn(true);
    setUsername(loggedInUsername);
  };

  const handleLogout = () => {
    // Implement Keycloak logout here
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {isLoggedIn ? (
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-md mb-4">
            <img src="https://intranet.credicapital.mx/assets/logos/logocred.png" alt="Credicapital Logo" className="mx-auto mb-6 w-48" />
            <h1 className="text-2xl font-bold mb-4 text-[#1F4A63] text-center">Bienvenido, {username}!</h1>
            <button
              onClick={handleLogout}
              className="w-full btn-secondary mb-4"
            >
              Cerrar Sesión
            </button>
          </div>
          <ImageUpload username={username} />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
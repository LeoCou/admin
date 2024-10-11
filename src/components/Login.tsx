import React, { useEffect, useState } from 'react';
import { LogIn } from 'lucide-react';
import Keycloak from 'keycloak-js';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const initKeycloak = new Keycloak({
      url: 'https://intranet.credicapital.mx/service/keycloak',
      realm: 'credicapital',
      clientId: 'image-upload-app' // Replace with your actual client ID
    });

    initKeycloak.init({ onLoad: 'check-sso' })
      .then((authenticated) => {
        setKeycloak(initKeycloak);
        if (authenticated) {
          onLogin(initKeycloak.tokenParsed?.preferred_username || '');
        }
      })
      .catch((error) => {
        console.error('Keycloak initialization error:', error);
        setError('Error al inicializar la autenticación');
      });
  }, [onLogin]);

  const handleLogin = () => {
    if (keycloak) {
      keycloak.login();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <img src="https://intranet.credicapital.mx/assets/logos/logocred.png" alt="Credicapital Logo" className="mx-auto mb-6 w-48" />
      <h2 className="text-2xl font-bold mb-4 text-[#1F4A63] text-center">Iniciar Sesión</h2>
      <button
        onClick={handleLogin}
        className="w-full btn-primary flex justify-center items-center"
      >
        <LogIn className="mr-2" size={20} />
        Iniciar Sesión con Keycloak
      </button>
      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Login;
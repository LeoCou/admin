import React, { useState, ChangeEvent } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  username: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ username }) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const isValidFile = username === 'normatividad' 
        ? selectedFile.name === 'tasas.png' && selectedFile.type === 'image/png'
        : selectedFile.name === 'recuerdaque.png' && selectedFile.type === 'image/png';

      if (isValidFile) {
        setFile(selectedFile);
        setError('');
      } else {
        setFile(null);
        setError(`Por favor, selecciona un archivo .png con el nombre ${username === 'normatividad' ? 'tasas.png' : 'recuerdaque.png'}.`);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Por favor, selecciona un archivo válido.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('username', username);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message);
        setError('');
      } else {
        setError('La subida ha fallado. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      setError('Ha ocurrido un error. Por favor, inténtalo de nuevo.');
    }
  };

  const getInstructions = () => {
    if (username === 'normatividad') {
      return (
        <>
          <li>Selecciona una imagen para subir.</li>
          <li>Solo se permiten archivos en formato .png</li>
          <li>El nombre del archivo debe ser exactamente: tasas.png</li>
        </>
      );
    } else {
      return (
        <>
          <li>Selecciona una imagen para subir.</li>
          <li>Solo se permiten archivos en formato .png</li>
          <li>El nombre del archivo debe ser exactamente: recuerdaque.png</li>
        </>
      );
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#1F4A63]">Subir Imagen</h2>
      <div className="mb-4 p-4 bg-[#1F4A63] bg-opacity-10 rounded-lg">
        <p className="text-[#1F4A63] font-medium mb-2">Instrucciones:</p>
        <ul className="list-disc list-inside text-sm text-[#1F4A63]">
          {getInstructions()}
        </ul>
      </div>
      <div className="mb-4">
        <label htmlFor="file-upload" className="cursor-pointer btn-secondary inline-flex items-center">
          <Upload className="mr-2" size={20} />
          <span>Elegir archivo</span>
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".png"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {file && (
        <p className="mb-4 text-sm text-[#1F4A63]">
          Archivo seleccionado: {file.name}
        </p>
      )}
      <button
        onClick={handleUpload}
        className="btn-primary"
        disabled={!file}
      >
        Subir
      </button>
      {error && (
        <p className="mt-4 text-sm text-red-600 flex items-center">
          <AlertCircle className="mr-2" size={16} />
          {error}
        </p>
      )}
      {message && (
        <p className="mt-4 text-sm text-green-600">{message}</p>
      )}
    </div>
  );
};

export default ImageUpload;
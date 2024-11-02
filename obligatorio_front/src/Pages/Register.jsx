import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Register.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [telephone, setTelephone] = useState('');
  const [ci, setCi] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password || !username) {
      setError('Por favor, completa todos los campos');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Ingresa un email válido');
      return false;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) return;

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Ocurrió un error en el registro');
      }
    } catch (error) {
      setError('Error de servidor. Intenta más tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0mHTSm37W4mp-tlLh8OQrx-LpOiwptxLmRg&s" 
          alt="UCU logo" 
          className={styles.logo}
        />
      </div>
      <h2 className={styles.title}>Crear una Cuenta</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>Cuenta creada exitosamente.</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
          className={styles.input}
          required
        />
        <input
          type = "text"
          value = {ci}
          onChange = {(e) => setCi(e.target.value)}
          placeholder = "Cédula de identidad"
          className = {styles.input}
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className={styles.input}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className={styles.input}
          required
        />
        <input
          type = "text"
          value = {telephone}
          onChange = {(e) => setTelephone(e.target.value)}
          placeholder = "Teléfono"
          className = {styles.input}
          required
        />
        <input
          type = "date"
          value = {birthday}
          onChange = {(e) => setBirthday(e.target.value)}
          placeholder = "Fecha de nacimiento"
          className = {styles.input}
          required
        />
        <button type="submit" className={styles.button}>Registrar</button>
      </form>
    </div>
  );
};

export default Register;
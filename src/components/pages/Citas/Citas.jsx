import React, { useState, useEffect } from 'react';
import '../Inicio/Inicio.css';
import './Citas.css';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/citas`;

const Citas = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    estilo: '',
    fecha: '',
    hora: '',
    comentarios: '',
  });

  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorServidor, setErrorServidor] = useState('');

  useEffect(() => {
    cargarCitas();
  }, []);

  const cargarCitas = async () => {
    try {
      setCargando(true);
      setErrorServidor('');
      const respuesta = await fetch(API_URL);
      if (!respuesta.ok) throw new Error('Error al cargar citas');
      const datos = await respuesta.json();
      setCitas(datos);
    } catch (error) {
      setErrorServidor('No se pudo conectar al servidor. Verifica que el backend este corriendo.');
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!formData.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = 'Ingresa un email valido';
    }
    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = 'El telefono es obligatorio';
    } else if (!/^\d{7,10}$/.test(formData.telefono)) {
      nuevosErrores.telefono = 'Ingresa un telefono valido (7-10 digitos)';
    }
    if (!formData.estilo) nuevosErrores.estilo = 'Selecciona un estilo de tatuaje';
    if (!formData.fecha) nuevosErrores.fecha = 'Selecciona una fecha';
    if (!formData.hora) nuevosErrores.hora = 'Selecciona una hora';
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      setErrorServidor('');
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        if (datos.errores) {
          setErrores(datos.errores);
        }
        return;
      }

      setCitas([...citas, datos]);
      setEnviado(true);
      setFormData({
        nombre: '', email: '', telefono: '',
        estilo: '', fecha: '', hora: '', comentarios: '',
      });
      setTimeout(() => setEnviado(false), 3000);
    } catch (error) {
      setErrorServidor('Error al enviar. Verifica que el backend este corriendo.');
    }
  };

  const cancelarCita = async (id) => {
    try {
      setErrorServidor('');
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) throw new Error('Error al cancelar');

      setCitas(citas.filter((c) => c.id !== id));
    } catch (error) {
      setErrorServidor('Error al cancelar. Verifica que el backend este corriendo.');
    }
  };

  return (
    <section className="page">
      <h2>Agenda tu Cita</h2>
      <p>
        Cuéntanos qué estilo te interesa y cuándo te queda mejor. Te confirmaremos
        el espacio en el estudio.
      </p>

      {errorServidor && (
        <div className="alerta alerta--error">
          {errorServidor}
          <button className="alerta__retry" onClick={cargarCitas}>Reintentar</button>
        </div>
      )}

      {enviado && (
        <div className="alerta alerta--exito">
          Cita agendada correctamente. Te contactaremos para confirmar.
        </div>
      )}

      <form className="formulario" onSubmit={handleSubmit} noValidate>
        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="nombre">Nombre completo *</label>
          <input type="text" id="nombre" name="nombre"
            className={`formulario__input ${errores.nombre ? 'formulario__input--error' : ''}`}
            value={formData.nombre} onChange={handleChange} placeholder="Ej: Laura Gomez" />
          {errores.nombre && <span className="formulario__error">{errores.nombre}</span>}
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="email">Correo electronico *</label>
          <input type="email" id="email" name="email"
            className={`formulario__input ${errores.email ? 'formulario__input--error' : ''}`}
            value={formData.email} onChange={handleChange} placeholder="Ej: laura@correo.com" />
          {errores.email && <span className="formulario__error">{errores.email}</span>}
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="telefono">Telefono *</label>
          <input type="tel" id="telefono" name="telefono"
            className={`formulario__input ${errores.telefono ? 'formulario__input--error' : ''}`}
            value={formData.telefono} onChange={handleChange} placeholder="Ej: 3001234567" />
          {errores.telefono && <span className="formulario__error">{errores.telefono}</span>}
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="estilo">Estilo de tatuaje *</label>
          <select id="estilo" name="estilo"
            className={`formulario__input ${errores.estilo ? 'formulario__input--error' : ''}`}
            value={formData.estilo} onChange={handleChange}>
            <option value="">-- Selecciona un estilo --</option>
            <option value="Linea fina">Linea fina</option>
            <option value="Minimalista">Minimalista</option>
            <option value="Blackwork">Blackwork</option>
            <option value="Geometrico">Geometrico</option>
          </select>
          {errores.estilo && <span className="formulario__error">{errores.estilo}</span>}
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="fecha">Fecha *</label>
          <input type="date" id="fecha" name="fecha"
            className={`formulario__input ${errores.fecha ? 'formulario__input--error' : ''}`}
            value={formData.fecha} onChange={handleChange} />
          {errores.fecha && <span className="formulario__error">{errores.fecha}</span>}
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="hora">Hora *</label>
          <input type="time" id="hora" name="hora"
            className={`formulario__input ${errores.hora ? 'formulario__input--error' : ''}`}
            value={formData.hora} onChange={handleChange} />
          {errores.hora && <span className="formulario__error">{errores.hora}</span>}
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="comentarios">Comentarios (opcional)</label>
          <textarea id="comentarios" name="comentarios"
            className="formulario__input formulario__textarea"
            value={formData.comentarios} onChange={handleChange}
            placeholder="Cuentanos una idea, referencia o zona del cuerpo..." rows="3" />
        </div>

        <button type="submit" className="formulario__btn">Agendar Cita</button>
      </form>

      {cargando ? (
        <p className="cargando">Cargando citas...</p>
      ) : citas.length > 0 ? (
        <div className="citas-lista">
          <h3>Citas agendadas ({citas.length})</h3>
          <div className="citas-lista__items">
            {citas.map((cita) => (
              <div key={cita.id} className="citas-lista__card">
                <div className="citas-lista__info">
                  <p className="citas-lista__nombre">{cita.nombre}</p>
                  <p className="citas-lista__detalle">{cita.estilo}</p>
                  <p className="citas-lista__detalle">{cita.fecha} - {cita.hora}</p>
                </div>
                <button className="citas-lista__cancelar" onClick={() => cancelarCita(cita.id)}>
                  Cancelar
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Citas;

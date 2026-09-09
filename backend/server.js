import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'data', 'citas.json');

app.use(cors());
app.use(express.json());

const leerCitas = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const guardarCitas = (citas) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(citas, null, 2), 'utf-8');
};

app.get('/api/citas', (req, res) => {
  const citas = leerCitas();
  res.json(citas);
});

app.post('/api/citas', (req, res) => {
  const { nombre, email, telefono, estilo, fecha, hora, comentarios } = req.body;

  const errores = {};
  if (!nombre || !nombre.trim()) errores.nombre = 'El nombre es obligatorio';
  if (!email || !email.trim()) {
    errores.email = 'El email es obligatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errores.email = 'Email invalido';
  }
  if (!telefono || !telefono.trim()) {
    errores.telefono = 'El telefono es obligatorio';
  } else if (!/^\d{7,10}$/.test(telefono)) {
    errores.telefono = 'Telefono invalido';
  }
  if (!estilo) errores.estilo = 'Selecciona un estilo de tatuaje';
  if (!fecha) errores.fecha = 'Selecciona una fecha';
  if (!hora) errores.hora = 'Selecciona una hora';

  if (Object.keys(errores).length > 0) {
    return res.status(400).json({ errores });
  }

  const citas = leerCitas();
  const ocupado = citas.find((c) => c.fecha === fecha && c.hora === hora);
  if (ocupado) {
    return res.status(400).json({
      errores: { hora: 'Ya hay una cita agendada en ese horario' },
    });
  }

  const nuevaCita = {
    id: Date.now(),
    nombre: nombre.trim(),
    email: email.trim(),
    telefono: telefono.trim(),
    estilo,
    fecha,
    hora,
    comentarios: comentarios ? comentarios.trim() : '',
    creada: new Date().toLocaleString('es-CO'),
  };

  citas.push(nuevaCita);
  guardarCitas(citas);

  console.log(`Nueva cita: ${nuevaCita.nombre} - ${nuevaCita.fecha} ${nuevaCita.hora}`);
  res.status(201).json(nuevaCita);
});

app.delete('/api/citas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let citas = leerCitas();

  const index = citas.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Cita no encontrada' });
  }

  const eliminada = citas[index];
  citas = citas.filter((c) => c.id !== id);
  guardarCitas(citas);

  console.log(`Cita cancelada: ${eliminada.nombre} - ${eliminada.fecha} ${eliminada.hora}`);
  res.json({ mensaje: 'Cita cancelada', eliminada });
});

app.listen(PORT, () => {
  console.log('');
  console.log('===========================================');
  console.log(`  Backend corriendo en http://localhost:${PORT}`);
  console.log('');
  console.log('  Endpoints disponibles:');
  console.log(`    GET    http://localhost:${PORT}/api/citas`);
  console.log(`    POST   http://localhost:${PORT}/api/citas`);
  console.log(`    DELETE http://localhost:${PORT}/api/citas/:id`);
  console.log('===========================================');
  console.log('');
});

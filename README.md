# Arte Minimalista — Estudio de Tatuajes (React + Vitest)

Migración de tu proyecto original en HTML/CSS/JS plano (`min spa tatto`) a una
arquitectura de componentes en **React**, con **tests automatizados** usando
**Vitest** y **React Testing Library**, siguiendo el mismo patrón del proyecto
de referencia que compartiste.

## Qué cambió respecto al proyecto original

| Original (vanilla JS) | Ahora (React) |
|---|---|
| `document.querySelectorAll` + manipulación manual del DOM | Componentes con `useState` / `props` |
| Un solo `script.js` con toda la lógica | Un componente por responsabilidad |
| Sin tests | 12 tests automatizados |

La funcionalidad es la misma: navegación entre "Inicio", "Acerca de" y
"Galería", hora de la visita, contador de personas interesadas, y el botón
que sugiere una idea de tatuaje al azar. Se agregó además una nueva pestaña,
**"Agendar Cita"**, con un formulario completo conectado a un backend propio
(igual patrón que el formulario de Inscripción del proyecto de referencia).

## Estructura de componentes

```
src/
  App.jsx                        # Orquesta la navegación y el estado del contador
  components/
    Navbar/                      # Barra de navegación reutilizable
    Layout/                      # Contenedor de la página activa
    pages/
      Inicio/                    # Bienvenida + hora de la visita
      AcercaDe/                  # Estilo + contador de interesados
      Galeria/                   # Bocetos + generador de ideas
      Citas/                     # Formulario para agendar cita (conectado al backend)
  __tests__/
    navegacion.test.jsx          # Cambia de página, marca el botón activo
    responsive.test.jsx          # Estructura semántica (nav/main/section/img)
    contador.test.jsx            # El contador sube en cada clic y no se reinicia
    galeria.test.jsx             # El botón muestra una idea (con Math.random mockeado)
    hora.test.jsx                # Se reemplaza el placeholder "--:--:--" por la hora real
    citas.test.jsx               # Validación del formulario y envío al backend (fetch mockeado)

backend/
  server.js                      # API REST en Express: GET/POST/DELETE /api/citas
  data/citas.json                # "Base de datos" en JSON de las citas agendadas
```

## Cómo correrlo

Este proyecto ahora tiene **dos partes**: el frontend (React) y el backend
(Express) que guarda las citas agendadas.

```bash
# Terminal 1: backend
cd backend
npm install
npm start           # http://localhost:3001

# Terminal 2: frontend (desde la raíz del proyecto)
npm install
npm run dev          # http://localhost:5173 (o el puerto que indique Vite)
```

Si no levantas el backend, el resto del sitio (Inicio, Acerca de, Galería)
funciona igual, pero la pestaña "Agendar Cita" mostrará un mensaje de error
de conexión.

## Cómo correr los tests

```bash
npm run test        # modo watch
npm run test:run    # una sola corrida (usado en CI)
npm run test:coverage
```

> Nota: en este entorno de chat no hay acceso a internet, así que no pude
> ejecutar `npm install` aquí para correrte los tests en vivo. Revisa el
> resultado apenas los corras localmente — si algo falla, pégame el error y
> lo ajustamos.

## Pendiente / decisiones que tomé

- El formulario de citas valida en el frontend (React) y también en el
  backend (Express), igual que el proyecto de referencia: nombre, email,
  teléfono, estilo, fecha y hora son obligatorios, y el backend además
  rechaza dos citas en la misma fecha y hora.
- Las citas se guardan en `backend/data/citas.json`. Para producción real
  cambiarías esto por una base de datos, pero para el ejercicio funciona
  igual que `inscritos.json` en el proyecto de referencia.
- Se incluyó el mismo pipeline de CI (`.github/workflows/ci-cd.yml`) que
  instala dependencias, corre los tests, hace el build y despliega a GitHub
  Pages en cada push a `main`.

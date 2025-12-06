# Web App Implementation: Cosmic Oracle 

Instrucciones Principales
Genera una aplicación web completa dentro de un nuevo directorio /app. Objetivo: Crear una experiencia de Tarot Cyberpunk inmersiva y "Mobile-First".

Referencia Visual: Usa las imágenes adjuntas y las generadas en pasos anteriores (scripts/output/cards/) como base estética.

1. Preparación de Assets (Integración)
Instruye al usuario explícitamente para realizar la siguiente operación antes de iniciar:

Origen: scripts/output/cards/

Destino: /app/public/assets/cards/

Validación: El código debe esperar archivos nombrados 1.png hasta 15.png y back.png.

2. Stack Tecnológico 
Framework: React 19.2 con Vite.

Estilos: Tailwind CSS v4.

Importante: Tailwind v4 usa una configuración centrada en CSS. No generes un tailwind.config.js complejo a menos que sea estrictamente necesario. Usa variables CSS y la directiva @theme dentro de index.css para la configuración.

Paleta: Define estas variables de color: --color-neon-cyan (#00f3ff), --color-neon-magenta (#ff00ff), --color-void-black (#050510), --color-gold-accent (#ffd700).

Fuentes: Inyecta <link> para 'Cinzel' y 'Inter' en index.html.

Animaciones: Framer Motion (versión más reciente compatible con React 19).

Iconos: lucide-react.

Utilidades: clsx, tailwind-merge.

3. Arquitectura de Datos (src/data/deck_data.js)
Genera el archivo con la data. NO copies el JSON crudo del paso de Python. Debes REDACTAR creativamente el campo prophecy para cada una de las 15 cartas.

Instrucción de Redacción: Escribe 5 líneas poéticas, crípticas y tecnológicas para cada carta.

Formato:

JavaScript

export const DECK_DATA = [
  {
    id: 1,
    title: "El Glitch",
    image: "/assets/cards/1.png",
    prophecy: "El sistema de tu realidad presenta fallas hermosas.\nLo que parece un error es tu ruta de escape.\nNo reinicies, permite que el caos reconfigure tu código.\nLa perfección es estática; el error es evolución.\nHoy, rompe el patrón preestablecido."
  },
  // ... (Generar las 15 entradas únicas)
];
4. Arquitectura de la Aplicación
A. Gestión de Estado (App.jsx)
Implementa un flujo de estado robusto.

gameState: 'ALTAR' (Selección) | 'REVEAL' (Animación) | 'PROPHECY' (Lectura).

reading: Array de 3 cartas seleccionadas aleatoriamente al montar el componente.

selectedCard: Objeto de la carta seleccionada.

B. Componentes UI
1. Layout Principal

Fondo: bg-void-black (usando la variable definida).

Contenedor: min-h-screen, text-white, overflow-hidden.

2. <AltarView /> (Pantalla Selección)

Muestra las 3 cartas del estado reading.

Responsive: Columna en Móvil, Fila en Desktop.

Estado: Cartas "Boca Abajo" (back.png).

Interacción: Hover escala y brillo neón. Click transiciona a 'REVEAL'.

3. <Card /> (Componente 3D)

CSS 3D: El contenedor padre DEBE tener la propiedad perspective aplicada.

Estructura:

Contenedor con transform-style: preserve-3d.

Front: Imagen de la carta ({id}.png).

Back: Reverso (back.png).

Ambas caras deben tener backface-visibility: hidden.

Estilo: Marco tecnológico dorado/neón, padding interno negro, bordes redondeados.

Loading: Skeleton pulsante mientras carga la imagen.

4. <ProphecyView /> (Pantalla Lectura)

Layout: Carta revelada a la izquierda/arriba, Texto a la derecha/abajo.

Texto: Título en fuente 'Cinzel' (Dorado). Profecía en 'Inter' con whitespace-pre-line y animación de aparición gradual.

Botones:

"Compartir": Usa navigator.share con fallback a clipboard.writeText.

"Reset": Primero baraja las cartas (reading) INMEDIATAMENTE y limpia la selección. SOLO DESPUÉS cambia el gameState a 'ALTAR'. Esto es crítico para evitar que el usuario vea las cartas viejas parpadear durante la transición.

5. Configuración y Archivos
Genera el código completo para:

vite.config.js: Asegúrate de incluir el plugin @tailwindcss/vite (necesario para Tailwind v4).

src/index.css: Aquí es donde debes configurar Tailwind v4. Importa tailwind y define el @theme con los colores personalizados aquí.

README.md: Documentación breve.

Instala todas las dependencias necesarias.

6. Genera la infraestructura necesaria para desplegar esta aplicación React en Google Cloud Run en un archivo deploy.sh afuera del directorio app/

A.  **Dockerfile:** Crea un `Dockerfile` multi-stage:
    * Etapa 1: Imagen de Node para instalar dependencias y ejecutar `npm run build`.
    * Etapa 2: Imagen `nginx:alpine` para servir la carpeta `dist` (o `build`).
B.  **Configuración Nginx:** Genera un archivo `nginx.conf` que maneje el enrutamiento de una SPA (Single Page Application), redirigiendo todas las rutas desconocidas al `index.html` para evitar errores 404 al recargar.
C.  **Dockerignore:** Crea un `.dockerignore` que excluya `node_modules` y archivos de entorno locales.
D.  **Deploy:** Coloca todo lo necesario en deploy.sh para
    * Construir la imagen usando Cloud Build (`gcloud builds submit`).
    * Desplegar el servicio en Cloud Run (región `us-central1`, acceso público habilitado)."



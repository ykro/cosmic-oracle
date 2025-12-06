Script de Generación de Assets: Cosmic Oracle 
Instrucciones Principales
Genera los archivos solicitados dentro de un directorio llamado scripts/. Debes generar 4 archivos:

scripts/generate_assets.py (Lógica principal)

scripts/deck_data.json (Fuente de datos)

scripts/requirements.txt (Dependencias)

scripts/README.md (Documentación)

Modelo: Debes usar estrictamente gemini-3-pro-image-preview. Entorno: El script debe estar preparado para correr en un entorno uv.

1. Archivo de Datos (scripts/deck_data.json)
Genera este archivo JSON en la carpeta scripts con el siguiente contenido exacto:

JSON

[
    {"id": 1, "title": "El Glitch", "visual_core": "A digital angel fragmenting into colorful static noise and pixel dust."},
    {"id": 2, "title": "El Cortafuegos", "visual_core": "A glowing hexagonal energy shield blocking aggressive red data projectiles."},
    {"id": 3, "title": "La Singularidad", "visual_core": "A black hole formed by circuit boards absorbing light and time."},
    {"id": 4, "title": "El Codigo Fuente", "visual_core": "An ancient holographic scroll floating in a void, displaying glowing binary gold text."},
    {"id": 5, "title": "La Latencia", "visual_core": "A hourglass where the sand floats upwards, defying gravity, made of neon particles."},
    {"id": 6, "title": "El Nodo", "visual_core": "A glowing network hub connecting thousands of fiber optic threads."},
    {"id": 7, "title": "El Encriptador", "visual_core": "A hooded cyberpunk monk holding a key made of pure laser light."},
    {"id": 8, "title": "La Actualizacion", "visual_core": "A mechanical butterfly emerging from a rusted metal cocoon."},
    {"id": 9, "title": "El Bucle Infinito", "visual_core": "A robotic snake eating its own tail (Ouroboros) in a perfect green neon circle."},
    {"id": 10, "title": "La CPU", "visual_core": "A realistic human heart made entirely of gold processors and pulsating wires."},
    {"id": 11, "title": "El Error 404", "visual_core": "A majestic door standing open in a white void, leading to absolutely nothing."},
    {"id": 12, "title": "El Algoritmo", "visual_core": "A giant holographic wheel of fortune floating over a futuristic cyberpunk city."},
    {"id": 13, "title": "El Hacker", "visual_core": "A figure manipulating floating virtual reality cubes with glowing hands."},
    {"id": 14, "title": "La Nube", "visual_core": "A castle made of clouds and data streams floating in a digital sky."},
    {"id": 15, "title": "El Bot", "visual_core": "A sleek, porcelain-faced android looking curiously at a small organic flower."}
]
2. Dependencias (scripts/requirements.txt)
Incluye:

google-genai

python-dotenv

pillow

3. Lógica del Script (scripts/generate_assets.py)
A. Configuración del Entorno (.env Auto-setup)
Al inicio del script, verifica si existe el archivo .env en el mismo directorio del script.

Si no existe, créalo automáticamente y escribe la variable GOOGLE_API_KEY (puedes dejar un valor placeholder o pedir al usuario que lo rellene).

Carga las variables usando dotenv.load_dotenv().

Inicializa el cliente genai usando os.getenv("GOOGLE_API_KEY").

B. Configuración de Generación 
Configura el modelo para usar gemini-3-pro-image-preview. Es obligatorio usar la siguiente configuración para asegurar resolución 4K y aspecto 9:16:

Python

config = types.GenerateContentConfig(
    image_config=types.ImageConfig(
        aspect_ratio="9:16",
        image_size="4K"
    )
)
C. Definición del Estilo Maestro
Define la siguiente constante MASTER_STYLE_PROMPT exactamente como se muestra a continuación para garantizar la estética Neo-Arcane Cyberpunk:

Python

MASTER_STYLE_PROMPT = (
    "High-fidelity Tarot card design, Neo-Arcane Cyberpunk aesthetic. "
    "STYLE: Flat 2D vector art, clean lines, symmetrical composition, head-on orthographic view. NO perspective, NO 3D tilting. "
    "FRAME: A heavy, ornate gold and neon filigree border framing the entire card, resembling ancient tech-relics. "
    "BACKGROUND: Deep midnight blue to obsidian gradient with faint glowing circuit board patterns and constellations. "
    "MATERIALS: Polished crystal, bioluminescent neon tubes (cyan/magenta), and etched gold circuitry. "
    "COLOR PALETTE: Gold, Cyan, Magenta, Deep Blue, Obsidian. "
    "TEXT PLACEMENT: A distinct, decorative technological plaque at the BOTTOM CENTER containing the title in glowing gold letters. "
    "ATMOSPHERE: Mystical, ancient technology, premium, polished, like an alien artifact."
)
D. Flujo de Ejecución
Crea el directorio output/cards/ (relativo a la ejecución) si no existe.

Itera sobre la lista cargada desde deck_data.json.

Lógica de Salto (Skip Logic): Antes de generar, verifica si el archivo de salida (ej. output/cards/1.png) ya existe.

Si existe: Imprime Skipping [ID]... y NO llames a la API.

Si no existe: Procede a generar.

Construcción del Prompt:

Combina: MASTER_STYLE_PROMPT + visual_core + Instrucción de texto.

Ejemplo: "... {MASTER_STYLE_PROMPT}. Visual subject: {item['visual_core']}. TEXT INSTRUCTION: Include Main Title: '{item['title']}' in glowing gold text at the bottom plaque."

Llama a client.models.generate_content con el modelo y la configuración definidos.

Guarda la imagen usando el ID: output/cards/1.png, etc.

E. Generación del Reverso 
Al finalizar el bucle, intenta generar output/cards/back.png.

Aplica la misma Lógica de Salto: Si output/cards/back.png ya existe, imprime mensaje y no generes.

Si no existe, usa el siguiente prompt estricto:

Prompt: MASTER_STYLE_PROMPT combinado con: "SPECIFIC INSTRUCTION FOR BACK: A SINGLE Tarot card back. The image must show ONLY ONE rectangular card back centered in the frame. Symmetrical sacred geometry mandala. Abstract. NO text. NO characters. NO multiple cards. NO split view. Close-up flat view."

Entregables
Proporciona el código completo para los siguientes archivos:

scripts/deck_data.json

scripts/generate_assets.py (Código Python completo y robusto)

scripts/requirements.txt

scripts/README.md (Instrucciones de uso con uv en español)

Instala todo lo necesario y abre el archivo para agregar el API key antes de ejecutar el script.

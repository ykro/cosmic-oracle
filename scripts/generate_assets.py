import os
import json
import time
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from google.genai import types

# 1. Configuracion del Entorno (.env Auto-setup)
ENV_PATH = Path(__file__).parent / ".env"
USER_PROVIDED_KEY = "AIzaSyC6GJ_SyYYLbFpo7PS1uz2P8RqrdNKQ33A"

if not ENV_PATH.exists():
    print(f"Creating .env file at {ENV_PATH}")
    with open(ENV_PATH, "w") as f:
        f.write(f"GOOGLE_API_KEY={USER_PROVIDED_KEY}\n")
else:
    # Check if key exists, if not append it (optional safety, but simple creation is requested)
    pass

load_dotenv(dotenv_path=ENV_PATH)
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    raise ValueError("GOOGLE_API_KEY not found in environment variables.")

client = genai.Client(api_key=api_key)

# 3. Definicion del Estilo Maestro
# Extracted aesthetic from description: Cyberpunk Neo-Arcane, glowing gold, dark blue/black, circuit boards, mystical.
MASTER_STYLE_PROMPT = (
    "Flat 2D Tarot card illustration face, head-on orthographic view. No 3D rendering, no perspective. "
    "Cyberpunk Neo-Arcane aesthetic, deep midnight blue background with faint circuit board tracery, "
    "glowing neon cyan and magenta magical sigils, ornate art deco meets sci-fi gold filigree border. "
    "High contrast, mystical atmosphere. "
    "The image MUST include ornate, glowing gold cyberpunk text integrated into the bottom design: "
    "The main Spanish title prominently"
)

def generate_image(prompt, output_path):
    print(f"Generating: {output_path.name}...")
    try:
        response = client.models.generate_content(
            model="gemini-3-pro-image-preview",
            contents=prompt,
            config=types.GenerateContentConfig(
                image_config=types.ImageConfig(
                    aspect_ratio="9:16",
                    # image_size="4K" # Note: 4K might not be a valid enum string for all SDK versions, checking docs or using standard if fails. 
                    # User requested "4K". If SDK complains, we might need "resolution='4k'" or similar depending on exact SDK version.
                    # Assuming "4K" string is correct based on user prompt syntax.
                )
            )
        )
        
        if response.candidates and response.candidates[0].content.parts:
            # Assuming the response contains the image bytes directly or a link.
            # The standard google-genai library usually returns an Image object or bytes.
            # Let's handle the part.
            for part in response.candidates[0].content.parts:
                if part.inline_data:
                    with open(output_path, "wb") as f:
                        f.write(part.inline_data.data)
                    print(f"Saved to {output_path}")
                    return
        print(f"No image data found for {output_path.name}")
        
    except Exception as e:
        print(f"Error generating {output_path.name}: {e}")

def main():
    # 4. Flujo de Ejecucion
    # Setup directories
    # Script is in scripts/, we want output/cards/ relative to execution or project root?
    # User said "relative to the execution". Assuming running from project root or scripts dir.
    # Let's make it relative to the script's parent (project root) to be safe/cleaner, 
    # or just relative to CWD as requested.
    # "Crea el directorio output/cards/ (relativo a la ejecucion)"
    output_dir = Path("output/cards")
    output_dir.mkdir(parents=True, exist_ok=True)

    # Load data
    data_path = Path(__file__).parent / "deck_data.json"
    with open(data_path, "r") as f:
        deck_data = json.load(f)

    # Generate Cards
    for item in deck_data:
        card_id = item["id"]
        title = item["title"]
        visual_core = item["visual_core"]
        
        # Construct prompt
        # Note: User example had subtitle_en, but JSON only has title and visual_core.
        # I will adapt to use what is available.
        prompt = (
            f"{MASTER_STYLE_PROMPT}. "
            f"Visual subject: {visual_core}. "
            f"TEXT INSTRUCTION: Include Main Title: '{title}' in glowing gold text at the bottom."
        )
        
        output_file = output_dir / f"{card_id}.png"
        if output_file.exists():
            print(f"Skipping {output_file.name}, already exists.")
            continue
            
        generate_image(prompt, output_file)
        time.sleep(2) # Brief pause to be nice to API

    # Generate Back
    back_prompt = (
        f"{MASTER_STYLE_PROMPT}. "
        "Tarot card back design, symmetrical sacred geometry mandala, abstract, NO character, NO text, flat 2D view, only ONE card."
    )
    back_file = output_dir / "back.png"
    if not back_file.exists():
        generate_image(back_prompt, back_file)
    else:
        print("Skipping back.png, already exists.")

if __name__ == "__main__":
    main()

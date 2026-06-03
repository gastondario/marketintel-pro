# MarketIntel PRO — Guía de Instalación Completa

## Archivos incluidos
- index.html       → La app completa
- manifest.json    → Configuración PWA
- sw.js            → Service Worker (modo sin internet + notificaciones)
- worker.js        → Proxy seguro para la IA
- icon-192.png     → Ícono de la app
- icon-512.png     → Ícono alta resolución
- INSTRUCCIONES.md → Esta guía

---

## PASO 1 — Crear cuenta en GitHub (si no tenés)
1. Andá a https://github.com
2. Click en "Sign up"
3. Elegí un nombre de usuario
4. Completá email y contraseña
5. Verificá tu email

---

## PASO 2 — Crear el repositorio
1. En GitHub, click en el "+" arriba a la derecha
2. Click en "New repository"
3. En "Repository name" escribí: marketintel-pro
4. Dejalo en "Public"
5. Click en "Create repository"

---

## PASO 3 — Subir los archivos
En la página del repositorio vacío:
1. Click en "uploading an existing file"
2. Arrastrá estos 6 archivos:
   - index.html
   - manifest.json
   - sw.js
   - worker.js
   - icon-192.png
   - icon-512.png
3. Click en el botón verde "Commit changes"

---

## PASO 4 — Activar GitHub Pages
1. En tu repositorio, click en "Settings" (arriba a la derecha)
2. En el menú de la izquierda, click en "Pages"
3. En "Source" seleccioná "Deploy from a branch"
4. En "Branch" seleccioná "main" y dejá "/ (root)"
5. Click en "Save"
6. Esperá 2-3 minutos
7. Recargá la página — aparece un cartel verde con tu URL

Tu URL pública queda así:
https://TU-USUARIO.github.io/marketintel-pro

---

## PASO 5 — Instalar en el teléfono

### iPhone (Safari):
1. Abrí la URL en Safari
2. Tocá el botón de compartir ⬆️ (abajo en el centro)
3. Scrolleá y tocá "Agregar a pantalla de inicio"
4. Nombre: MarketIntel PRO
5. Tocá "Agregar"

### Android (Chrome):
1. Abrí la URL en Chrome
2. Tocá los tres puntitos ⋮ arriba a la derecha
3. Tocá "Instalar app" o "Agregar a pantalla de inicio"
4. Confirmás y listo

---

## PASO 6 — Configurar la IA (para que funcione el escaneo)

### Parte A — Conseguir tu clave API de Anthropic
1. Andá a https://console.anthropic.com
2. Registrate gratis
3. Click en "API Keys" → "Create Key"
4. Copiá la clave (empieza con sk-ant-...)

### Parte B — Crear el proxy en Cloudflare Workers
1. Andá a https://workers.cloudflare.com
2. Registrate gratis con cualquier email
3. Click en "Create a Worker"
4. Borrá el código de ejemplo que aparece
5. Pegá el contenido del archivo worker.js (incluido en el ZIP)
6. Click en "Save and Deploy"
7. Copiá la URL que te da (ej: https://marketintel.tu-usuario.workers.dev)

### Parte C — Agregar tu clave API de forma segura
1. En tu Worker → click en "Settings"
2. Click en "Variables"
3. Click en "Add variable"
   - Nombre: ANTHROPIC_API_KEY
   - Valor: sk-ant-... (tu clave)
   - Activá la opción "Encrypt" para que quede protegida
4. Click en "Save"

### Parte D — Conectar el Worker con tu app
1. En GitHub, abrí el archivo index.html
2. Click en el ícono del lápiz ✏️ para editar
3. Buscá esta línea (Ctrl+F):
   : '/api/analyze';
4. Cambiála por:
   : 'https://marketintel.TU-USUARIO.workers.dev';
5. Click en "Commit changes"
6. Esperá 2 minutos y la app se actualiza sola

---

## Cómo actualizar la app en el futuro
1. Entrá a tu repositorio en GitHub
2. Click en el archivo que querés cambiar
3. Click en el ícono del lápiz ✏️
4. Hacé los cambios
5. Click en "Commit changes"
6. En 2 minutos se actualiza automáticamente en tu teléfono


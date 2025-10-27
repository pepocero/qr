# 🚀 Cómo Probar en Local

El archivo `index.html` **NO** se puede abrir directamente con `file://` protocolo porque los navegadores bloquean la carga de scripts desde CDNs por seguridad (CORS).

## ✅ Solución: Usar XAMPP (ya lo tienes instalado)

1. **Ubicación:** Tu proyecto está en `C:\xampp\htdocs\qr`
2. **Abre XAMPP** y asegúrate de que Apache esté ejecutándose (clic en Start)
3. **Abre tu navegador** y ve a:
   ```
   http://localhost/qr
   ```
   o
   ```
   http://localhost/qr/index.html
   ```

## 🌐 Alternativa: Usar un Servidor HTTP Simple

Si no quieres usar XAMPP, puedes usar Python:

```bash
# En la carpeta del proyecto
cd C:\xampp\htdocs\qr

# Si tienes Python instalado
python -m http.server 8000
```

Luego abre: `http://localhost:8000`

## 🔧 O usar VS Code Live Server

Si usas VS Code:
1. Instala la extensión "Live Server"
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

## ⚠️ ¿Por qué no funciona con `file://`?

- Los navegadores modernos bloquean la carga de scripts desde CDNs cuando usas `file://` por seguridad
- Esto es normal y es un comportamiento de seguridad de los navegadores
- En producción (Cloudflare Pages) funciona perfectamente porque usa `https://`

## 🎯 Prueba Ahora

1. Abre XAMPP
2. Ve a http://localhost/qr
3. ¡Disfruta del generador de códigos QR!


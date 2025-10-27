# Generador de Códigos QR Completo

Un generador de códigos QR completo y robusto con múltiples funcionalidades, optimizado para despliegue en Cloudflare Pages.

## 🚀 Características

### Tipos de Contenido
- ✅ **Texto**: Cualquier texto personalizado
- ✅ **URL**: Enlaces web con validación automática
- ✅ **Email**: Email con asunto y cuerpo del mensaje
- ✅ **SMS**: Mensajes SMS con número de teléfono
- ✅ **WiFi**: Credenciales de red WiFi (SSID, contraseña, tipo de seguridad)
- ✅ **Contacto (vCard)**: Tarjetas de contacto completas

### Personalización
- 🎨 **Colores**: Personaliza el color del código y el fondo
- 📏 **Tamaño**: Ajusta el tamaño del QR de 200px a 1000px
- 🛡️ **Niveles de corrección de errores**: L, M, Q, H (7% a 30%)
- 🔷 **Tipos de punto**: Cuadrado o redondeado
- 🖼️ **Logo/Imagen**: Sube tu logo para mostrarlo en el centro del QR
- 📐 **Tamaño del logo**: Ajusta el tamaño del logo (10% a 30%)

### Descarga
- 💾 Descargar como PNG
- 💾 Descargar como SVG

## 🛠️ Tecnologías

- HTML5
- CSS3 (con Grid y Flexbox)
- JavaScript ES6+
- [qrcode.js](https://github.com/soldair/node-qrcode) - Biblioteca para generación de QR

## 📦 Instalación Local

**La biblioteca QRCode ya está incluida** (qrcode.min.js), así que puedes:

1. Abre `index.html` directamente en tu navegador (doble clic)
2. **¡Listo!** No necesitas servidor ni instalación de dependencias
3. Funciona perfectamente con el protocolo `file://`

## ☁️ Despliegue en Cloudflare Pages

### Opción 1: GitHub Integration
1. Crea un repositorio en GitHub
2. Sube estos archivos al repositorio
3. Ve a Cloudflare Dashboard > Pages
4. Conecta tu repositorio de GitHub
5. Cloudflare Pages detectará automáticamente que es un sitio estático
6. Despliega

### Opción 2: Wrangler CLI
```bash
npm install -g wrangler
wrangler pages publish .
```

### Opción 3: Arrastra y Suelta
1. Ve a Cloudflare Dashboard > Pages
2. Haz clic en "Create a project"
3. Selecciona "Upload assets"
4. Arrastra la carpeta del proyecto
5. ¡Despliega!

## 📱 Características Adicionales

- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Soporte para eventos táctiles (touch)
- ✅ Interfaz moderna y atractiva
- ✅ Validación de datos
- ✅ Feedback visual
- ✅ Sin dependencias externas complejas (solo CDN)
- ✅ Carga rápida
- ✅ Funciona offline (después de la primera carga)

## 🎯 Uso

1. Selecciona el tipo de contenido que deseas codificar
2. Completa los campos correspondientes
3. Personaliza los colores, tamaño y opciones
4. (Opcional) Sube un logo
5. Haz clic en "Generar QR"
6. Descarga tu código QR como PNG o SVG

## 📄 Licencia

MIT License - Libre para uso personal y comercial

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

---

**Desarrollado con ❤️ para Cloudflare Pages**


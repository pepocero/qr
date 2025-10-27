# 🚀 Guía de Despliegue en Cloudflare Pages

Esta guía te ayudará a desplegar el Generador de Códigos QR en Cloudflare Pages.

## ⚡ Método 1: GitHub + Cloudflare Pages (Recomendado)

### Paso 1: Crear Repositorio en GitHub
1. Ve a [GitHub](https://github.com)
2. Crea un nuevo repositorio (por ejemplo: `qr-generator`)
3. Haz clic en "uploading an existing file"
4. Arrastra todos los archivos del proyecto a GitHub
5. Haz commit de los cambios

### Paso 2: Conectar con Cloudflare
1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Selecciona "Pages" en el menú lateral
3. Haz clic en "Create a project"
4. Selecciona "Connect to Git"
5. Autoriza Cloudflare para acceder a GitHub
6. Selecciona tu repositorio `qr-generator`
7. Cloudflare detectará automáticamente que es un sitio estático

### Paso 3: Configuración
- **Project name**: `qr-generator` (o el nombre que prefieras)
- **Production branch**: `main` (o `master`)
- **Build command**: (déjalo vacío, no es necesario)
- **Build output directory**: (déjalo vacío, los archivos están en la raíz)

### Paso 4: Deploy
1. Haz clic en "Save and Deploy"
2. Espera unos segundos mientras Cloudflare compila
3. Tu sitio estará disponible en `https://qr-generator.pages.dev`

## 📤 Método 2: Wrangler CLI

### Instalación
```bash
npm install -g wrangler
```

### Login
```bash
wrangler login
```

### Desplegar
```bash
# En la raíz del proyecto
wrangler pages publish .
```

### Actualizar
```bash
# Cada vez que hagas cambios
wrangler pages publish .
```

## 🎯 Método 3: Arrastra y Suelta

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Selecciona "Pages"
3. Haz clic en "Create a project"
4. Selecciona "Upload assets"
5. Zippea todos los archivos del proyecto:
   - En Windows: Selecciona los archivos → Botón derecho → "Enviar a" → "Carpeta comprimida"
   - En Mac: Selecciona los archivos → Botón derecho → "Comprimir X elementos"
6. Arrastra el archivo ZIP a Cloudflare
7. Descomprime automáticamente
8. ¡Tu sitio estará disponible inmediatamente!

## 🔧 Configuración de Dominio Personalizado

### Agregar Dominio
1. Ve a tu proyecto en Cloudflare Pages
2. Haz clic en "Custom domains"
3. Agrega tu dominio (ejemplo: `qr.tudominio.com`)
4. Cloudflare configurará automáticamente los registros DNS necesarios

### DNS
Si usas DNS externo a Cloudflare, agrega estos registros:
- Tipo: `CNAME`
- Nombre: `qr` (o el subdominio que quieras)
- Contenido: `qr-generator.pages.dev`

## 📊 Características de Cloudflare Pages

- ✅ **CDN Global**: Tu sitio se sirve desde más de 200 ubicaciones
- ✅ **SSL Automático**: HTTPS configurado automáticamente
- ✅ **Deploy Instantáneo**: Menos de 1 minuto
- ✅ **Versiones**: Todas tus versiones quedan guardadas
- ✅ **Rollback**: Puedes volver a versiones anteriores
- ✅ **Custom Domains**: Dominios personalizados ilimitados
- ✅ **Bandwidth Ilimitado**: Sin restricciones
- ✅ **Gratuito**: Plan free genera sitios estáticos ilimitados

## 🔄 Actualizaciones

### Con GitHub
1. Haz cambios en tu repositorio
2. Haz push a GitHub
3. Cloudflare detectará los cambios automáticamente
4. Desplegará la nueva versión en menos de 1 minuto

### Con Wrangler
```bash
wrangler pages publish .
```

## 📝 Notas Importantes

- **No necesitas configurar build**: Este proyecto es 100% estático
- **No necesitas Node.js en Cloudflare**: Todo se sirve desde el CDN
- **Los archivos se sirven como están**: No hay proceso de compilación
- **Funciona offline**: Después de la primera carga

## 🎉 ¡Listo!

Tu generador de códigos QR está ahora disponible en internet.

**URL de tu sitio**: `https://[nombre-proyecto].pages.dev`

---

¿Necesitas ayuda? Abre un issue en el repositorio.


// State
let currentLogo = null;

// Wait for QRCode library to load
function checkQRCodeLoaded() {
    if (typeof QRCode !== 'undefined') {
        console.log('QRCode library loaded successfully');
        return true;
    }
    console.error('QRCode library not loaded');
    return false;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Wait for QRCode to load with retries
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max wait
    
    const waitForQRCode = setInterval(() => {
        attempts++;
        
        if (checkQRCodeLoaded()) {
            clearInterval(waitForQRCode);
            setupContentTypeToggle();
            setupSizeSliders();
            setupFileInput();
            setupGenerateButton();
            setupDownloadButtons();
        } else if (attempts >= maxAttempts) {
            clearInterval(waitForQRCode);
            alert('Error: No se pudo cargar la biblioteca de códigos QR. Por favor, verifica tu conexión a internet y recarga la página.');
        }
    }, 100);
});

// Toggle between different content types
function setupContentTypeToggle() {
    const radioButtons = document.querySelectorAll('input[name="contentType"]');
    const inputSections = ['text', 'url', 'email', 'sms', 'wifi', 'vcard'];

    radioButtons.forEach(radio => {
        radio.addEventListener('change', (e) => {
            inputSections.forEach(section => {
                const element = document.getElementById(`${section}-input`);
                if (element) element.style.display = 'none';
            });

            const selectedType = e.target.value;
            const selectedSection = document.getElementById(`${selectedType}-input`);
            if (selectedSection) selectedSection.style.display = 'block';
        });
    });
}

// Setup size sliders
function setupSizeSliders() {
    const sizeSlider = document.getElementById('size');
    const sizeValue = document.getElementById('size-value');
    
    sizeSlider.addEventListener('input', (e) => {
        sizeValue.textContent = `${e.target.value}px`;
    });

    const logoSizeSlider = document.getElementById('logo-size');
    const logoSizeValue = document.getElementById('logo-size-value');
    
    logoSizeSlider.addEventListener('input', (e) => {
        logoSizeValue.textContent = `${e.target.value}%`;
    });
}

// Setup logo file input
function setupFileInput() {
    const logoFile = document.getElementById('logo-file');
    const removeLogoBtn = document.getElementById('remove-logo');

    logoFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 1024 * 1024) { // 1MB
            alert('El archivo es demasiado grande. Por favor, selecciona una imagen menor a 1MB.');
            e.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            currentLogo = event.target.result;
            removeLogoBtn.style.display = 'inline-block';
        };
        reader.readAsDataURL(file);
    });

    removeLogoBtn.addEventListener('click', () => {
        currentLogo = null;
        logoFile.value = '';
        removeLogoBtn.style.display = 'none';
    });
}

// Setup generate button
function setupGenerateButton() {
    document.getElementById('generate-btn').addEventListener('click', generateQR);
}

// Generate QR Code
function generateQR() {
    const contentType = document.querySelector('input[name="contentType"]:checked').value;
    const content = getContentByType(contentType);

    if (!content) {
        alert('Por favor, completa los campos requeridos.');
        return;
    }

    if (typeof QRCode === 'undefined') {
        alert('Error: La biblioteca QRCode no está disponible.');
        return;
    }

    const options = getQROptions();
    const qrOutput = document.getElementById('qr-output');
    
    qrOutput.innerHTML = '<div class="loading">⏳</div>';

    // Create a container for the QR code
    const qrContainer = document.createElement('div');
    qrContainer.id = 'qr-code-container';
    qrOutput.innerHTML = '';
    qrOutput.appendChild(qrContainer);

    const logoSize = options.logoSize;
    const size = parseInt(options.width);

    // Use qrcodejs library (different API)
    const correctLevel = options.errorCorrectionLevel || 'M';
    const qr = new QRCode(qrContainer, {
        text: content,
        width: size,
        height: size,
        colorDark: options.color.dark,
        colorLight: options.color.light,
        correctLevel: QRCode.CorrectLevel[correctLevel] || QRCode.CorrectLevel.M
    });

    console.log('QR Code generated successfully');

    // Store canvas for download
    setTimeout(() => {
        const canvas = qrContainer.querySelector('canvas');
        if (canvas) {
            window.currentCanvas = canvas;
            
            // Add logo if available
            if (currentLogo && logoSize) {
                addLogoToCanvas(canvas, currentLogo, logoSize);
            }
            
            document.getElementById('download-buttons').style.display = 'block';
        }
    }, 100);
}

// Get content based on selected type
function getContentByType(type) {
    switch(type) {
        case 'text':
            return document.getElementById('text-content').value.trim();
        
        case 'url':
            let url = document.getElementById('url-content').value.trim();
            if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }
            return url;
        
        case 'email':
            const emailTo = document.getElementById('email-to').value.trim();
            const emailSubject = document.getElementById('email-subject').value.trim();
            const emailBody = document.getElementById('email-body').value.trim();
            
            if (!emailTo) return null;
            
            let emailContent = `mailto:${emailTo}`;
            const params = [];
            if (emailSubject) params.push(`subject=${encodeURIComponent(emailSubject)}`);
            if (emailBody) params.push(`body=${encodeURIComponent(emailBody)}`);
            
            if (params.length > 0) emailContent += '?' + params.join('&');
            return emailContent;
        
        case 'sms':
            const smsNumber = document.getElementById('sms-number').value.trim();
            const smsMessage = document.getElementById('sms-message').value.trim();
            
            if (!smsNumber) return null;
            
            let smsContent = `sms:${smsNumber}`;
            if (smsMessage) smsContent += `:${smsMessage}`;
            return smsContent;
        
        case 'wifi':
            const ssid = document.getElementById('wifi-ssid').value.trim();
            const password = document.getElementById('wifi-password').value.trim();
            const security = document.getElementById('wifi-security').value;
            const hidden = document.getElementById('wifi-hidden').checked;
            
            if (!ssid) return null;
            
            let wifiContent = `WIFI:T:${security};S:${ssid};`;
            if (password) wifiContent += `P:${password};`;
            if (hidden) wifiContent += 'H:true;';
            wifiContent += ';;';
            
            return wifiContent;
        
        case 'vcard':
            const name = document.getElementById('vcard-name').value.trim();
            const org = document.getElementById('vcard-organization').value.trim();
            const phone = document.getElementById('vcard-phone').value.trim();
            const email = document.getElementById('vcard-email').value.trim();
            const website = document.getElementById('vcard-website').value.trim();
            const address = document.getElementById('vcard-address').value.trim();
            
            if (!name) return null;
            
            let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
            vcard += `FN:${name}\n`;
            if (org) vcard += `ORG:${org}\n`;
            if (phone) vcard += `TEL:${phone}\n`;
            if (email) vcard += `EMAIL:${email}\n`;
            if (website) vcard += `URL:${website}\n`;
            if (address) vcard += `ADR:;;${address};;\n`;
            vcard += 'END:VCARD';
            
            return vcard;
        
        default:
            return null;
    }
}

// Get QR code options
function getQROptions() {
    const size = parseInt(document.getElementById('size').value);
    const foregroundColor = document.getElementById('foreground-color').value;
    const backgroundColor = document.getElementById('background-color').value;
    const errorCorrection = document.getElementById('error-correction').value;
    const dotType = document.getElementById('dot-type').value;
    const logoSize = parseInt(document.getElementById('logo-size').value);

    return {
        width: size,
        height: size,
        color: {
            dark: foregroundColor,
            light: backgroundColor
        },
        errorCorrectionLevel: errorCorrection,
        margin: 1,
        dotType: dotType,
        logoSize: logoSize
    };
}

// Add logo to canvas
function addLogoToCanvas(canvas, logoUrl, logoSizePercent) {
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const logoSize = (size * logoSizePercent) / 100;
    const logoPos = (size - logoSize) / 2;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
        // Draw white square background for logo
        const squareSize = logoSize * 1.4;
        const squarePos = (size - squareSize) / 2;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(squarePos, squarePos, squareSize, squareSize);

        // Draw logo
        ctx.drawImage(img, logoPos, logoPos, logoSize, logoSize);
        
        // Update the stored canvas
        window.currentCanvas = canvas;
    };
    
    img.onerror = function() {
        console.error('Error loading logo image');
    };
    
    img.src = logoUrl;
}

// Setup download buttons
function setupDownloadButtons() {
    document.getElementById('download-png').addEventListener('click', () => {
        if (!window.currentCanvas) return;
        
        const link = document.createElement('a');
        link.download = 'codigo-qr.png';
        link.href = window.currentCanvas.toDataURL('image/png');
        link.click();
    });

    document.getElementById('download-svg').addEventListener('click', () => {
        if (!window.currentCanvas) {
            alert('Primero genera un código QR.');
            return;
        }
        
        // Convert canvas to SVG
        const canvas = window.currentCanvas;
        const dataURL = canvas.toDataURL('image/svg+xml');
        const link = document.createElement('a');
        link.download = 'codigo-qr.svg';
        link.href = dataURL;
        link.click();
    });
}

// Touch event support
document.querySelectorAll('button, input[type="radio"], label').forEach(element => {
    element.addEventListener('touchstart', function(e) {
        this.style.opacity = '0.7';
    });
    
    element.addEventListener('touchend', function(e) {
        this.style.opacity = '1';
    });
});


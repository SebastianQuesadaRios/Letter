document.addEventListener('DOMContentLoaded', function() {
    // Prevenir clic derecho
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
    
    // Prevenir teclas
    document.addEventListener('keydown', function (e) {
        if (e.key === 'F12') {
            e.preventDefault();
        }
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
        }
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
        }
    });

    // Agregar event listener al botón de descarga
    const descargarBtn = document.getElementById('descargarBtn');
    if (descargarBtn) {
        console.log('Botón de descarga encontrado');
        descargarBtn.addEventListener('click', function() {
            console.log('Botón clickeado');
            descargarPDF();
        });
    } else {
        console.error('No se encontró el botón de descarga');
    }
});

function descargarPDF() {
    console.log('Iniciando descarga del PDF');
    
    // Intentar primero con la ruta relativa
    fetch('public/pdf/Love.pdf')
        .then(response => {
            console.log('Estado de la respuesta:', response.status);
            if (!response.ok) {
                // Si falla, intentar con la ruta absoluta
                return fetch('/pdf/Love.pdf');
            }
            return response;
        })
        .then(response => {
            if (!response.ok) {
                console.error('Error en la respuesta:', response.status, response.statusText);
                throw new Error('No se pudo descargar el PDF. Estado: ' + response.status);
            }
            console.log('PDF encontrado, creando blob...');
            return response.blob();
        })
        .then(blob => {
            console.log('Blob creado, iniciando descarga...');
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Love.pdf';
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
            console.log('Descarga iniciada');
        })
        .catch(error => {
            console.error('Error detallado:', error);
            alert('Lo siento, hubo un error al descargar el PDF. Por favor, intenta de nuevo.\nError: ' + error.message);
        });
} 
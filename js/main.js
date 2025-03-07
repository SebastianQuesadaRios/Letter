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
        descargarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón clickeado');
            descargarPDF();
        });
    } else {
        console.error('No se encontró el botón de descarga');
    }
});

function descargarPDF() {
    console.log('Iniciando descarga del PDF');
    
    const pdfUrl = '/pdf/Love.pdf';
    console.log('Intentando descargar desde:', pdfUrl);

    // Crear un elemento iframe oculto
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    try {
        // Intentar abrir el PDF directamente
        iframe.src = pdfUrl;
        
        // También intentar con fetch como respaldo
        fetch(pdfUrl)
            .then(response => {
                console.log('Estado de la respuesta:', response.status);
                if (!response.ok) {
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
                
                // Limpieza
                setTimeout(() => {
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(link);
                    document.body.removeChild(iframe);
                }, 100);
                
                console.log('Descarga iniciada');
            })
            .catch(error => {
                console.error('Error detallado:', error);
                document.body.removeChild(iframe);
                
                // Intentar abrir en una nueva pestaña como último recurso
                window.open(pdfUrl, '_blank');
            });
    } catch (error) {
        console.error('Error al intentar descargar:', error);
        document.body.removeChild(iframe);
        alert('Lo siento, hubo un error al descargar el PDF. Por favor, intenta de nuevo.');
    }
} 
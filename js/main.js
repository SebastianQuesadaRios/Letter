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
        descargarBtn.addEventListener('click', descargarPDF);
    }
});

function descargarPDF() {
    fetch('/pdf/Love.pdf')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo descargar el PDF');
            }
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Love.pdf';
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        })
        .catch(error => {
            console.error('Error al descargar el PDF:', error);
            alert('Lo siento, hubo un error al descargar el PDF. Por favor, intenta de nuevo.');
        });
} 
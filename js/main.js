document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});
  
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

function descargarPDF() {
    // Crear un enlace temporal
    const link = document.createElement('a');
    link.href = 'public/pdf/Love.pdf';
    link.download = 'Love.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
} 
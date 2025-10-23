/**
 * Manejo de mensajes de WhatsApp para ofertas
 * Versión 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Función para manejar el clic en los enlaces de ofertas
    function manejarClicOferta(event) {
        // Prevenir el comportamiento por defecto del enlace
        event.preventDefault();
        
        // Obtener el enlace original
        const enlace = event.currentTarget.getAttribute('href');
        
        // Obtener el texto alternativo de la imagen
        const imagen = event.currentTarget.querySelector('img');
        if (!imagen) return;
        
        const textoAlt = imagen.getAttribute('alt') || 'Oferta Especial';
        
        // Extraer el nombre de la oferta (eliminando "Oferta Especial" del texto alt)
        let nombreOferta = textoAlt.replace('Oferta Especial', '').trim();
        
        // Si no hay nombre de oferta después de eliminar "Oferta Especial", usar un valor por defecto
        if (!nombreOferta) {
            nombreOferta = 'Oferta Especial';
        }
        
        // Crear el mensaje personalizado con formato
        const mensaje = `¡Hola *PC Soluciones*! \n\n` +
                      `Acabo de ver su oferta especial de *${nombreOferta}* en la sección de *Ofertas Especiales* y me gustaría obtener más información.\n\n` +
                      `¿Podrían brindarme más detalles?`;
        
        // Codificar el mensaje para URL
        const mensajeCodificado = encodeURIComponent(mensaje);
        
        // Crear el enlace de WhatsApp con el mensaje personalizado
        const phoneNumber = '3046599425'; // Número de teléfono de PC Soluciones
        const urlWhatsApp = `https://wa.me/${phoneNumber}?text=${mensajeCodificado}`;
        
        // Abrir WhatsApp en una nueva pestaña
        window.open(urlWhatsApp, '_blank');
    }
    
    // Agregar manejadores de eventos a todos los enlaces de ofertas
    function configurarEnlacesOfertas() {
        // Seleccionar todos los enlaces con la clase oferta-link
        const enlacesOfertas = document.querySelectorAll('a.oferta-link');
        
        // Agregar manejador de eventos a cada enlace
        enlacesOfertas.forEach(enlace => {
            // Remover cualquier manejador previo para evitar duplicados
            enlace.removeEventListener('click', manejarClicOferta);
            // Agregar el manejador de eventos
            enlace.addEventListener('click', manejarClicOferta);
        });
    }
    
    // Configurar los enlaces cuando el DOM esté listo
    configurarEnlacesOfertas();
    
    // Si se usa AJAX o carga dinámica de contenido, podrías necesitar volver a configurar los enlaces
    // después de cargar nuevo contenido. Por ejemplo:
    // document.addEventListener('contenidoCargado', configurarEnlacesOfertas);
});

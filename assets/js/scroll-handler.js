document.addEventListener('DOMContentLoaded', function() {
  const ofertasLink = document.getElementById('ofertas-link');
  const ofertasSection = document.getElementById('ofertas');
  
  if (ofertasLink && ofertasSection) {
    ofertasLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Obtener la posición de la sección de ofertas
      const ofertasPosition = ofertasSection.getBoundingClientRect().top + window.pageYOffset;
      
      // Calcular la posición de desplazamiento (ajustar según sea necesario)
      const headerHeight = document.querySelector('header').offsetHeight;
      // Reducir el espacio adicional para acercar más al título
      const scrollToPosition = ofertasPosition - headerHeight + 20; // Ajuste para acercar más al título
      
      // Realizar el desplazamiento suave
      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
      });
    });
  }
});

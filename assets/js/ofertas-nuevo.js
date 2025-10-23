document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.ofertas-track');
  const items = document.querySelectorAll('.oferta-item');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let currentIndex = 0;
  let autoSlideInterval;
  const slideCount = items.length;
  let isMobile = window.innerWidth <= 768;
  const itemsToShow = isMobile ? 1 : 3;
  const itemsToMove = isMobile ? 1 : 3;
  const autoSlideDelay = 40000; // 40 segundos
  
  // Función para mover el carrusel a un índice específico
  function moveToIndex(index) {
    // Asegurarse de que el índice sea un número entero
    index = parseInt(index);

    // Ajustar el índice según el modo (móvil o escritorio)
    if (!isMobile) {
      // En escritorio, asegurarse de que el índice sea múltiplo de itemsToMove
      index = Math.floor(index / itemsToMove) * itemsToMove;
      // Asegurarse de no pasarse del final
      if (index + itemsToShow > slideCount) {
        index = Math.max(0, slideCount - itemsToShow);
      }
    } else {
      // En móvil, comportamiento normal de uno en uno
      index = Math.max(0, Math.min(index, slideCount - 1));
    }

    // Si ya estamos en el índice solicitado, no hacer nada
    if (index === currentIndex) return;

    // Actualizar el índice actual
    currentIndex = index;

    // Calcular el desplazamiento
    const container = track.parentElement;
    const containerWidth = container.offsetWidth;
    const itemWidth = containerWidth / itemsToShow;
    const offset = -currentIndex * itemWidth;
    
    // Aplicar la transición suave
    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform = `translateX(${offset}px)`;
    
    // Actualizar puntos de navegación
    updateDots();
    
    // Aplicar la transición suave
    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform = `translateX(${offset}px)`;
    
    // Actualizar puntos de navegación
    updateDots();
  }
  
  // Función para actualizar los puntos de navegación
  function updateDots() {
    // Calcular qué punto debe estar activo (0, 1 o 2)
    let activeDotIndex;
    if (currentIndex < 3) {
      activeDotIndex = 0; // Primer punto (ofertas 1-3)
    } else if (currentIndex < 6) {
      activeDotIndex = 1; // Segundo punto (ofertas 4-6)
    } else {
      activeDotIndex = 2; // Tercer punto (ofertas 7-9)
    }
    
    // Actualizar las clases de los puntos
    dots.forEach((dot, index) => {
      if (index === activeDotIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  // Función para avanzar al siguiente grupo de elementos
  function nextSlide() {
    if (isMobile) {
      moveToIndex(currentIndex + 1);
    } else {
      // En escritorio, avanzar al siguiente grupo de 3
      let nextIndex = currentIndex + itemsToMove;

      // Si el siguiente índice excede el número de slides, volver al inicio
      if (nextIndex >= slideCount) {
        nextIndex = 0;
      }

      moveToIndex(nextIndex);
    }
  }
  
  // Función para retroceder al grupo anterior de elementos
  function prevSlide() {
    if (isMobile) {
      moveToIndex(currentIndex - 1);
    } else {
      // En escritorio, retroceder al grupo anterior de 3
      let prevIndex = currentIndex - itemsToMove;

      // Si el índice es menor a 0, ir al último grupo
      if (prevIndex < 0) {
        // Calcular el inicio del último grupo completo
        const lastGroupStart = Math.max(0, slideCount - itemsToShow);
        // Asegurarse de que sea múltiplo de 3
        prevIndex = Math.floor(lastGroupStart / itemsToMove) * itemsToMove;
      }

      moveToIndex(prevIndex);
    }
  }
  
  // Configuración inicial del ancho de los elementos
  function setupItemsWidth() {
    // Obtener dimensiones del contenedor
    const container = track.parentElement;
    const containerWidth = container.offsetWidth;
    
    // Calcular dimensiones exactas
    const gap = 10; // Mismo valor que en el CSS
    const containerPadding = 10; // Ajustado para coincidir con el CSS
    
    // Calcular el ancho exacto de cada elemento
    const itemWidth = (containerWidth - (gap * (itemsToShow - 1)) - (containerPadding * 2) - 10) / itemsToShow; // -10 para el margen izquierdo
    
    // Aplicar estilos a cada elemento
    items.forEach((item, index) => {
      item.style.minWidth = `${itemWidth}px`;
      item.style.flex = `0 0 ${itemWidth}px`;
      item.style.margin = '0';
      item.style.boxSizing = 'border-box';
      item.style.flexShrink = '0';
      
      // Añadir margen izquierdo al primer elemento de cada grupo
      if (index % itemsToShow === 0) {
        item.style.marginLeft = '10px'; // Ajustado para coincidir con el CSS
      } else {
        item.style.marginLeft = '0';
      }
    });
    
    // Calcular el ancho total del track
    const totalWidth = (itemWidth * slideCount) + (gap * (slideCount - 1)) + 10; // +10 para el margen izquierdo
    track.style.width = `${totalWidth}px`;
    track.style.padding = `0 ${containerPadding}px 0 0`; // Ajustamos el padding
    
    // Asegurarse de que el carrusel esté en la posición inicial
    track.style.transform = `translateX(${containerPadding}px)`;
    currentIndex = 0;
    updateDots();
  }
  
  // Manejar redimensionamiento de la ventana
  function handleResize() {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 768;
    
    // Recalcular los anchos cuando cambia el tamaño de la ventana
    setupItemsWidth();
    
    if (wasMobile !== isMobile || true) { // Siempre forzar actualización
      // Si cambió el modo (móvil/escritorio), reiniciar la posición
      currentIndex = 0;
      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';
      updateDots();
      
      // Forzar un reflow para asegurar que los cambios se apliquen
      void track.offsetWidth;
      
      // Mover al índice actual para asegurar que todo se muestre correctamente
      moveToIndex(currentIndex);
    }
  }
  
  // Iniciar autoplay
  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
  }
  
  // Detener autoplay
  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }
  
  // Inicialización
  function init() {
    setupItemsWidth();
    updateDots();
    
    // Configurar event listeners
    prevBtn.addEventListener('click', () => {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });
    
    // Navegación por puntos
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopAutoSlide();
        // Mapear el índice del punto (0,1,2) a la posición correspondiente (0,3,6)
        const targetIndex = index * 3;
        moveToIndex(targetIndex);
        startAutoSlide();
      });
    });
    
    // Manejar redimensionamiento
    window.addEventListener('resize', handleResize);
    
    // Iniciar autoplay
    startAutoSlide();
  }
  
  // Iniciar el carrusel
  init();
});

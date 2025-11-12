document.addEventListener('DOMContentLoaded', function() {
  const toggleMenu = document.querySelector("header .toggle-menu");
  const mobileMenuContainer = document.querySelector(".page-header-mobile");
  
  if (!toggleMenu || !mobileMenuContainer) return;

  const menuWrapper = mobileMenuContainer.querySelector(".menu-wrapper");
  const level1Links = mobileMenuContainer.querySelectorAll(".level-1 > li > a");
  const listWrapper2 = mobileMenuContainer.querySelector(".list-wrapper:nth-child(2)");
  const listWrapper3 = mobileMenuContainer.querySelector(".list-wrapper:nth-child(3)");
  const subMenuWrapper2 = listWrapper2.querySelector(".sub-menu-wrapper");
  const subMenuWrapper3 = listWrapper3.querySelector(".sub-menu-wrapper");
  const backOneLevelBtns = mobileMenuContainer.querySelectorAll(".back-one-level");
  const closeMenuBtn = mobileMenuContainer.querySelector(".close-menu");

  const isVisibleClass = "is-visible";
  const isActiveClass = "is-active";

  function closeAllLevels() {
    listWrapper2.classList.remove(isVisibleClass);
    listWrapper3.classList.remove(isVisibleClass);
    const menuLinks = menuWrapper.querySelectorAll("a");
    for (const menuLink of menuLinks) {
      menuLink.classList.remove(isActiveClass);
    }
  }

  // El botón principal solo abre el menú
  toggleMenu.addEventListener("click", function () {
    menuWrapper.classList.add(isVisibleClass);
    closeMenuBtn.classList.add(isActiveClass); // Muestra la 'X' en el botón de cerrar
    document.body.style.overflow = 'hidden';
  });

  // El botón de cerrar solo cierra el menú
  closeMenuBtn.addEventListener('click', function () {
    menuWrapper.classList.remove(isVisibleClass);
    closeMenuBtn.classList.remove(isActiveClass); // Revierte la 'X'
    document.body.style.overflow = '';
    setTimeout(closeAllLevels, 300);
  });

  for (const level1Link of level1Links) {
    level1Link.addEventListener("click", function (e) {
      const siblingList = level1Link.nextElementSibling;
      if (siblingList) {
        e.preventDefault();
        this.classList.add(isActiveClass);
        const cloneSiblingList = siblingList.cloneNode(true);
        subMenuWrapper2.innerHTML = "";
        subMenuWrapper2.append(cloneSiblingList);
        listWrapper2.classList.add(isVisibleClass);
      }
    });
  }

  listWrapper2.addEventListener("click", function (e) {
    const target = e.target.closest('a');
    if (target && target.nextElementSibling) {
      const siblingList = target.nextElementSibling;
      e.preventDefault();
      target.classList.add(isActiveClass);
      const cloneSiblingList = siblingList.cloneNode(true);
      subMenuWrapper3.innerHTML = "";
      subMenuWrapper3.append(cloneSiblingList);
      listWrapper3.classList.add(isVisibleClass);
    }
  });

  for (const backOneLevelBtn of backOneLevelBtns) {
    backOneLevelBtn.addEventListener("click", function () {
      const parent = this.closest(".list-wrapper");
      parent.classList.remove(isVisibleClass);
      const activeLink = parent.previousElementSibling.querySelector("a.is-active");
      if(activeLink) {
          activeLink.classList.remove(isActiveClass);
      }
    });
  }
});

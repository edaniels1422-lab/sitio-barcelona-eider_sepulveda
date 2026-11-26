const mensajes = {
  es: { manana: "¡Buenos días, culer!", tarde: "¡Buenas tardes, culer!", noche: "¡Buenas noches, culer!" },
  ca: { manana: "Bon dia, culer!", tarde: "Bona tarda, culer!", noche: "Bona nit, culer!" },
  en: { manana: "Good morning, culer!", tarde: "Good afternoon, culer!", noche: "Good evening, culer!" }
};

function mostrarSaludo(idioma) {
  const saludo = document.getElementById("saludo");
  if (!saludo) return;

  const hora = new Date().getHours();
  let momento;

  if (hora < 12) {
    momento = "manana";
  } else if (hora < 19) {
    momento = "tarde";
  } else {
    momento = "noche";
  }

  saludo.textContent = mensajes[idioma][momento];
  saludo.lang = idioma;
}

function iniciarSelectorIdioma() {
  const selector = document.getElementById("idioma");
  if (!selector) return;

  selector.addEventListener("change", function () {
    mostrarSaludo(selector.value);
  });

  mostrarSaludo(selector.value);
}

iniciarSelectorIdioma();
function iniciarMenuDesplegable() {
  const item = document.querySelector(".con-submenu");
  if (!item) return;

  const submenu = item.querySelector(".submenu");

  function mostrar() {
    submenu.classList.add("visible");
  }

  function ocultar() {
    submenu.classList.remove("visible");
  }

  // Ratón: mouseover muestra, mouseout oculta
  item.addEventListener("mouseover", mostrar);
  item.addEventListener("mouseout", function (e) {
    // No ocultar si el ratón solo pasa a un elemento hijo del menú
    if (!item.contains(e.relatedTarget)) {
      ocultar();
    }
  });

  // Teclado: para que también funcione con Tab (accesibilidad)
  item.addEventListener("focusin", mostrar);
  item.addEventListener("focusout", function (e) {
    if (!item.contains(e.relatedTarget)) {
      ocultar();
    }
  });
}

iniciarMenuDesplegable();
function iniciarSlider() {
  const slider = document.querySelector(".slider");
  if (!slider) return;

  const slides = slider.querySelectorAll(".slide");
  const btnAnterior = slider.querySelector(".anterior");
  const btnSiguiente = slider.querySelector(".siguiente");

  let actual = 0;
  let intervalo;

  function mostrarSlide(indice) {
    slides[actual].classList.remove("activa");
    actual = (indice + slides.length) % slides.length;
    slides[actual].classList.add("activa");
  }

  function siguiente() {
    mostrarSlide(actual + 1);
  }

  function anterior() {
    mostrarSlide(actual - 1);
  }

  function iniciarAutomatico() {
    detenerAutomatico();
    intervalo = setInterval(siguiente, 4000);
  }

  function detenerAutomatico() {
    clearInterval(intervalo);
  }

  // Navegación manual
  btnSiguiente.addEventListener("click", function () {
    siguiente();
    iniciarAutomatico();
  });

  btnAnterior.addEventListener("click", function () {
    anterior();
    iniciarAutomatico();
  });

  // Pausar el cambio automático al pasar el ratón o enfocar con teclado
  slider.addEventListener("mouseenter", detenerAutomatico);
  slider.addEventListener("mouseleave", iniciarAutomatico);
  slider.addEventListener("focusin", detenerAutomatico);
  slider.addEventListener("focusout", iniciarAutomatico);

  // Cambio automático cada 4 segundos
  iniciarAutomatico();
}

iniciarSlider();
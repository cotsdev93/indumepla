const menu = document.querySelector(".fa-bars");
const ul = document.querySelector("ul");
const lis = document.querySelectorAll("li");

menu.addEventListener("click", () => {
  ul.classList.toggle("animation");
});

lis.forEach((li) => {
  li.addEventListener("click", () => {
    ul.classList.toggle("animation");
  });
});

class BaseDeDatosManijas {
  constructor() {
    this.manijas = [];
    this.cargarRegistrosManijas();
  }

  async cargarRegistrosManijas() {
    const resultado = await fetch("./JSON/manijas.json");
    this.manijas = await resultado.json();
    cargarProductos(this.manijas, "manijas");
  }
}

const bdh = new BaseDeDatosManijas();

const manijas = document.getElementById("manijas");

function cargarProductos(productosArray, containerId = "manijas") {
  const container = document.getElementById(containerId);

  // if (!container) {
  //   console.error(`Container with id '${containerId}' not found`);
  //   return;
  // }

  // Clear the container first
  container.innerHTML = `
    <div class="overlay"></div>
    <div class="zoom-view">
      <div class="close-btn">
        <i class="fa-solid fa-xmark"></i>
      </div>
      <img src="" alt="Zoom view" />
      <div class="zoom-info">
        <h3 class="zoom-title"></h3>
        <p class="zoom-medidas"></p>
      </div>
    </div>
  `;

  // Add products
  productosArray.forEach((producto) => {
    container.innerHTML += `
      <div class="card">
        <div class="imgContainer">
          <img class="img" src="${producto.img}" alt="${producto.nombre}" />
        </div>
        <div class="infoContainer">
          <h3>${producto.nombre}</h3> <p class="medidas">${producto.medidas}</p>
        </div>
      </div>
    `;
  });

  // Only setup zoom handlers if container exists
  if (container) {
    setupZoomHandlers(container);
  }
}

function setupZoomHandlers(container) {
  const images = container.querySelectorAll(".imgContainer img");
  const zoomView = container.querySelector(".zoom-view");
  const zoomImage = zoomView.querySelector("img");
  const zoomTitle = zoomView.querySelector(".zoom-title");
  const zoomMedidas = zoomView.querySelector(".zoom-medidas");
  const overlay = container.querySelector(".overlay");
  const closeBtn = container.querySelector(".close-btn");

  // Función para abrir el zoom
  const openZoom = (imgSrc, title, medidas) => {
    zoomView.style.display = "block";
    overlay.style.display = "block";
    // Forzar un reflow para que la animación funcione
    void zoomView.offsetWidth;
    void overlay.offsetWidth;

    zoomImage.src = imgSrc;
    zoomTitle.textContent = title;
    zoomMedidas.textContent = medidas;
    zoomView.classList.add("active");
    overlay.classList.add("active");
  };

  // Función para cerrar el zoom
  const closeZoom = () => {
    zoomView.classList.remove("active");
    overlay.classList.remove("active");

    // Esperar a que termine la animación antes de ocultar los elementos
    setTimeout(() => {
      zoomView.style.display = "none";
      overlay.style.display = "none";
    }, 300); // 300ms = duración de la transición
  };

  // Event listeners
  images.forEach((img) => {
    const card = img.closest(".card");
    const title = card.querySelector("h3").textContent;
    const medidas = card.querySelector(".medidas").textContent;
    img.addEventListener("click", () => openZoom(img.src, title, medidas));
  });

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeZoom();
  });

  overlay.addEventListener("click", closeZoom);
  zoomView.addEventListener("click", closeZoom);
}

document.addEventListener("DOMContentLoaded", function () {
  const manijasContainer = document.getElementById("manijas");
  const btnLeft = document.querySelector(".fa-chevron-left");
  const btnRight = document.querySelector(".fa-chevron-right");

  function getScrollAmount() {
    // Obtener el ancho total del contenedor y dividirlo por 4
    return manijasContainer.offsetWidth / 4;
  }

  btnRight.addEventListener("click", () => {
    manijasContainer.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });
  });

  btnLeft.addEventListener("click", () => {
    manijasContainer.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });
  });
});
////////////////////////////////////////////////////////////////////////////
/////////////////////     PLACAS      //////////////////////////////////////

class BaseDeDatosPlacas {
  constructor() {
    this.placas = [];
    this.cargarRegistrosPlacas();
  }

  async cargarRegistrosPlacas() {
    const resultado = await fetch("./JSON/placas.json");
    this.placas = await resultado.json();
    cargarProductos(this.placas, "placas");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const bda = new BaseDeDatosPlacas();

  // FLECHAS PLACAS
  const placasContainer = document.getElementById("placas");
  const btnLeftAcc = document.querySelector(".fa-chevron-left-acc");
  const btnRightAcc = document.querySelector(".fa-chevron-right-acc");

  if (placasContainer && btnLeftAcc && btnRightAcc) {
    function getScrollAmount() {
      return placasContainer.offsetWidth / 4;
    }

    btnRightAcc.addEventListener("click", () => {
      placasContainer.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
    });

    btnLeftAcc.addEventListener("click", () => {
      placasContainer.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth",
      });
    });
  }
});

/////////////////////////////////////////////////////////////////////////////
//////////////////////// CRUCES /////////////////////////////////////////////

class BaseDeDatosCruces {
  constructor() {
    this.cruces = [];
    this.cargarRegistrosCruces();
  }

  async cargarRegistrosCruces() {
    const resultado = await fetch("./JSON/cruces.json");
    this.cruces = await resultado.json();
    cargarProductos(this.cruces, "cruces");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const bdc = new BaseDeDatosCruces();

  // FLECHAS CRUCES
  const crucesContainer = document.getElementById("cruces");
  const btnLeftCruces = document.querySelector(".fa-chevron-left-cruces");
  const btnRightCruces = document.querySelector(".fa-chevron-right-cruces");

  if (crucesContainer && btnLeftCruces && btnRightCruces) {
    function getScrollAmount() {
      return crucesContainer.offsetWidth / 4;
    }

    btnRightCruces.addEventListener("click", () => {
      crucesContainer.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
    });

    btnLeftCruces.addEventListener("click", () => {
      crucesContainer.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth",
      });
      console.log("funca")
    });
  }
});


const menu = document.querySelector(".fa-bars");
const ul = document.querySelector("ul");
const lis = document.querySelectorAll("li");

menu.addEventListener("click", () => {
  ul?.classList.toggle("animation");
});

lis.forEach((li) => {
  li.addEventListener("click", () => {
    ul?.classList.toggle("animation");
  });
});

class BaseDeDatosManijas {
  constructor() {
    this.manijas = [];
    this.cargarRegistrosManijas();
  }

  async cargarRegistrosManijas() {
    try {
      const resultado = await fetch("./JSON/manijas.json");
      if (!resultado.ok) throw new Error(`Error ${resultado.status}: ${resultado.statusText}`);
      this.manijas = await resultado.json();
      cargarProductos(this.manijas, "manijas");
    } catch (error) {
      console.error("Error al cargar las manijas:", error.message);
    }
  }
}

const bdh = new BaseDeDatosManijas();

function cargarProductos(productosArray, containerId = "manijas") {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`El contenedor con id '${containerId}' no fue encontrado`);
    return;
  }

  // Limpiar el contenedor primero
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

  // Agregar productos
  productosArray.forEach((producto) => {
    container.innerHTML += `
      <div class="card">
        <div class="imgContainer">
          <img class="img" src="${producto.img}" alt="${producto.nombre}" />
        </div>
        <div class="infoContainer">
          <h3>${producto.nombre}</h3>
          <p class="medidas">${producto.medidas}</p>
        </div>
      </div>
    `;
  });

  setupZoomHandlers(container);
}

function setupZoomHandlers(container) {
  const images = container.querySelectorAll(".imgContainer img");
  const zoomView = container.querySelector(".zoom-view");
  const zoomImage = zoomView.querySelector("img");
  const zoomTitle = zoomView.querySelector(".zoom-title");
  const zoomMedidas = zoomView.querySelector(".zoom-medidas");
  const overlay = container.querySelector(".overlay");
  const closeBtn = container.querySelector(".close-btn");

  const openZoom = (imgSrc, title, medidas) => {
    zoomImage.src = imgSrc;
    zoomTitle.textContent = title;
    zoomMedidas.textContent = medidas;
    zoomView.style.display = "block";
    overlay.style.display = "block";
    void zoomView.offsetWidth;
    void overlay.offsetWidth;
    zoomView.classList.add("active");
    overlay.classList.add("active");
  };

  const closeZoom = () => {
    zoomView.classList.remove("active");
    overlay.classList.remove("active");
    setTimeout(() => {
      zoomView.style.display = "none";
      overlay.style.display = "none";
    }, 300);
  };

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
  const btnLeft = document.querySelector(".fa-chevron-left-manijas");
  const btnRight = document.querySelector(".fa-chevron-right-manijas");

  function getScrollAmount(container) {
    return container.offsetWidth / 4;
  }

  btnRight?.addEventListener("click", () => {
    manijasContainer.scrollBy({ left: getScrollAmount(manijasContainer), behavior: "smooth" });
  });

  btnLeft?.addEventListener("click", () => {
    manijasContainer.scrollBy({ left: -getScrollAmount(manijasContainer), behavior: "smooth" });
  });
});

class BaseDeDatosPlacas {
  constructor() {
    this.placas = [];
    this.cargarRegistrosPlacas();
  }

  async cargarRegistrosPlacas() {
    try {
      const resultado = await fetch("./JSON/placas.json");
      if (!resultado.ok) throw new Error(`Error ${resultado.status}: ${resultado.statusText}`);
      this.placas = await resultado.json();
      cargarProductos(this.placas, "placas");
    } catch (error) {
      console.error("Error al cargar las placas:", error.message);
    }
  }
}

const bda = new BaseDeDatosPlacas();

class BaseDeDatosCruces {
  constructor() {
    this.cruces = [];
    this.cargarRegistrosCruces();
  }

  async cargarRegistrosCruces() {
    try {
      const resultado = await fetch("./JSON/cruces.json");
      if (!resultado.ok) throw new Error(`Error ${resultado.status}: ${resultado.statusText}`);
      this.cruces = await resultado.json();
      cargarProductos(this.cruces, "cruces");
    } catch (error) {
      console.error("Error al cargar las cruces:", error.message);
    }
  }
}

const bdc = new BaseDeDatosCruces();

document.addEventListener("DOMContentLoaded", function () {
  const crucesContainer = document.getElementById("cruces");
  const btnLeftCruces = document.querySelector(".fa-chevron-left-cruces");
  const btnRightCruces = document.querySelector(".fa-chevron-right-cruces");

  function getScrollAmount(container) {
    return container.offsetWidth / 4;
  }

  btnRightCruces?.addEventListener("click", () => {
    crucesContainer.scrollBy({ left: getScrollAmount(crucesContainer), behavior: "smooth" });
  });

  btnLeftCruces?.addEventListener("click", () => {
    crucesContainer.scrollBy({ left: -getScrollAmount(crucesContainer), behavior: "smooth" });
  });
});

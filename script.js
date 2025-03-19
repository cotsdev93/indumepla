const menu = document.querySelector(".fa-bars");
const ul = document.querySelector("ul");
const lis = document.querySelectorAll("li");

menu.addEventListener("click", () => {
  ul.classList.toggle("animation");
});

lis.forEach(li => {
  li.addEventListener("click", () => {
    ul.classList.toggle("animation")
  });
});

class BaseDeDatosHerrajes {
  constructor() {
    this.herrajes = [];
    this.cargarRegistros();
  }

  async cargarRegistros() {
    const resultado = await fetch("./JSON/herrajes.json");
    this.herrajes = await resultado.json();
    cargarProductos(this.herrajes); // Pasa el array de productos aquí
  }
}

const bdh = new BaseDeDatosHerrajes();

console.log(bdh);

const herrajes = document.getElementById("herrajes");

function cargarProductos(productosArray, containerId = 'herrajes') {
  const container = document.getElementById(containerId);
  
  // Agregar el overlay y zoom-view si no existen
  if (!container.querySelector('.overlay')) {
    container.innerHTML = `
      <div class="overlay"></div>
      <div class="zoom-view">
        <div class="close-btn">
          <i class="fa-solid fa-xmark"></i>
        </div>
        <img src="" alt="Zoom view" />
      </div>
      ${container.innerHTML}
    `;
  }

  // Agregar los productos
  for (const producto of productosArray) {
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
  }

  // Configurar los event listeners
  setupZoomHandlers(container);
}

function setupZoomHandlers(container) {
  const images = container.querySelectorAll('.imgContainer img');
  const zoomView = container.querySelector('.zoom-view');
  const zoomImage = zoomView.querySelector('img');
  const overlay = container.querySelector('.overlay');
  const closeBtn = container.querySelector('.close-btn');

  // Función para abrir el zoom
  const openZoom = (imgSrc) => {
    zoomView.style.display = 'block';
    overlay.style.display = 'block';
    // Forzar un reflow para que la animación funcione
    void zoomView.offsetWidth;
    void overlay.offsetWidth;
    
    zoomImage.src = imgSrc;
    zoomView.classList.add('active');
    overlay.classList.add('active');
  };

  // Función para cerrar el zoom
  const closeZoom = () => {
    zoomView.classList.remove('active');
    overlay.classList.remove('active');
    
    // Esperar a que termine la animación antes de ocultar los elementos
    setTimeout(() => {
      zoomView.style.display = 'none';
      overlay.style.display = 'none';
    }, 300); // 300ms = duración de la transición
  };

  // Event listeners
  images.forEach(img => {
    img.addEventListener('click', () => openZoom(img.src));
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeZoom();
  });

  overlay.addEventListener('click', closeZoom);
  zoomView.addEventListener('click', closeZoom);
}

// Para usar en herrajes
cargarProductos(bdh.herrajes, 'herrajes');

document.addEventListener("DOMContentLoaded", function () {
  const herrajesContainer = document.getElementById("herrajes");
  const btnLeft = document.querySelector(".fa-chevron-left");
  const btnRight = document.querySelector(".fa-chevron-right");

  function getScrollAmount() {
    // Obtener el ancho total del contenedor y dividirlo por 4
    return herrajesContainer.offsetWidth / 4;
  }

  btnRight.addEventListener("click", () => {
    herrajesContainer.scrollBy({ 
      left: getScrollAmount(), 
      behavior: "smooth" 
    });
  });

  btnLeft.addEventListener("click", () => {
    herrajesContainer.scrollBy({ 
      left: -getScrollAmount(), 
      behavior: "smooth" 
    });
  });
});

class BaseDeDatosAccesorios {
  constructor() {
    this.accesorios = [];
    this.cargarRegistros();
  }

  async cargarRegistros() {
    const resultado = await fetch("./JSON/accesorios.json");
    this.accesorios = await resultado.json();
    cargarProductos(this.accesorios, 'accesorios');
  }
}

const bda = new BaseDeDatosAccesorios();

console.log(bda);

const accesorios = document.getElementById("accesorios");

function cargarProductosAccesorios(productosArray) {
  accesorios.innerHTML = ""; 

  for (const producto of productosArray) {
    accesorios.innerHTML += `
        <div class="card">
          <div class="imgContainer">
            <img class="img" src="${producto.img}" alt="${producto.nombre}" />
          </div>
          <div class="infoContainer">
            <h3>${producto.nombre}</h3> <p class="medidas">${producto.medidas}</p>
          </div>
        </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const accesoriosContainer = document.getElementById("accesorios");
  const btnLeftAcc = document.querySelector(".fa-chevron-left-acc");
  const btnRightAcc = document.querySelector(".fa-chevron-right-acc");

  function getScrollAmount() {
    return accesoriosContainer.offsetWidth / 4;
  }

  btnRightAcc.addEventListener("click", () => {
    accesoriosContainer.scrollBy({ 
      left: getScrollAmount(), 
      behavior: "smooth" 
    });
  });

  btnLeftAcc.addEventListener("click", () => {
    accesoriosContainer.scrollBy({ 
      left: -getScrollAmount(), 
      behavior: "smooth" 
    });
  });
});

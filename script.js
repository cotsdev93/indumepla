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

function cargarProductos(productosArray) {
  herrajes.innerHTML = ""; 

  for (const producto of productosArray) {
    herrajes.innerHTML += `
        <div class="card">
          <div class="imgContainer">
            <img class="img" src="${producto.img}" alt="${producto.nombre}" />
          </div>
          <div class="infoContainer">
            <h3>${producto.nombre}</h3>
          </div>
        </div>
    `;
  }
}

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
    cargarProductosAccesorios(this.accesorios);
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
            <h3>${producto.nombre}</h3>
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

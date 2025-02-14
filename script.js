class BaseDeDatosProductos {
  constructor() {
    this.productos = [];
    this.cargarRegistros();
  }

  async cargarRegistros() {
    const resultado = await fetch("./JSON/herrajes.json");
    this.productos = await resultado.json();
    cargarProductos(this.productos); // Pasa el array de productos aquí
  }
}

const bdp = new BaseDeDatosProductos();

console.log(bdp);

const productos = document.getElementById("herrajes");

function cargarProductos(productosArray) {  // Cambié el nombre a productosArray para evitar confusión
  productos.innerHTML = "";  // Limpia el contenido antes de agregar nuevos productos

  // Recorre el array de productos
  for (const producto of productosArray) {  // Ahora iteramos sobre el array 'productosArray'
    productos.innerHTML += `
        <div class="card">
          <div class="imgContainer">
            <img class="img" src="${producto.img}" alt="${producto.nombre}" />
          </div>
          <h3>${producto.nombre}</h3>
        </div>
    `;
  }
}


document.addEventListener("DOMContentLoaded", function () {
  const herrajesContainer = document.getElementById("herrajes");
  const btnLeft = document.querySelector(".fa-chevron-left");
  const btnRight = document.querySelector(".fa-chevron-right");
  
  function updateCardWidth() {
    const card = herrajesContainer.querySelector(".card");
    return card ? card.offsetWidth + 5 : 100; // Ajuste para márgenes
  }
  
  btnRight.addEventListener("click", () => {
    herrajesContainer.scrollBy({ left: updateCardWidth(), behavior: "smooth" });
  });
  
  btnLeft.addEventListener("click", () => {
    herrajesContainer.scrollBy({ left: -updateCardWidth(), behavior: "smooth" });
  });
});

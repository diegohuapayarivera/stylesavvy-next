// Función para agrupar los productos
function agruparProductos(productos) {
  const agrupados = [];
  let idCounter = 1;

  productos.forEach((producto, index) => {
    const existente = agrupados.find((p) => p.image === producto.image);

    if (existente) {
      existente.code.push(producto.code);
      if (!existente.sizes.includes(producto.sizes)) {
        existente.sizes.push(producto.sizes);
      }
      if (!existente.colors.includes(producto.colors)) {
        existente.colors.push(producto.colors);
      }
      existente.cantidad += 1;
    } else {
      agrupados.push({
        id: idCounter++,
        code: [producto.code],
        name: producto.name,
        price: producto.price,
        image: producto.image,
        categorys: [producto.categorys],
        sizes: [producto.sizes],
        colors: [producto.colors],
        cantidad: 1,
      });
    }
  });

  return agrupados;
}

module.exports = { agruparProductos };
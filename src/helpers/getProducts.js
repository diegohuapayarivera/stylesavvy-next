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


function groupByCodeClothe(data) {
  const result = [];

  data.forEach((item) => {
    // Buscar si ya existe un objeto con el mismo code_clothe
    let existing = result.find((obj) => obj.code_clothe === item.code_clothe);

    if (existing) {
      // Si existe, agregar el nuevo "clothe" al array "clothes"
      existing.colors.push(item.colors);
      existing.sizes.push(item.sizes);
      
      existing.clothes.push({
        code: item.code,
        sizes: item.sizes,
        colors: item.colors,
        image: item.image,
      });
    } else {
      // Si no existe, crear un nuevo objeto y agregarlo al resultado
      result.push({
        code_clothe: item.code_clothe,
        name: item.name,
        price: item.price,
        categorys: item.categorys,
        colors: [item.colors],
        sizes: [item.sizes],
        estado: item.estado,
        clothes: [
          {
            code: item.code,
            sizes: item.sizes,
            colors: item.colors,
            image: item.image,
          },
        ],
      });
    }
  });

  return result;
}


module.exports = { agruparProductos, groupByCodeClothe };
// URL de la que obtendrás los datos JSON
const url = "https://script.google.com/macros/s/AKfycbxWVVD2tOQJ6iueTdGIiO1OGxeghIA7jTKur2xoVgLDLn7jyI3AvTRlmz0ug31ALmT2/exec";

// Función para obtener los datos desde la URL
 async function obtenerDatos() {
    try {
        const respuesta = await fetch(url);
        const productos = await respuesta.json();

        // Aquí puedes llamar a la función de agrupación con los datos obtenidos
        const productosAgrupados = agruparProductos(productos);
        //console.log(productosAgrupados)
        return productosAgrupados;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return [];
    }
    
}

// Llamar a la función para obtener los datos y procesarlos


// Función para agrupar los productos
function agruparProductos(productos) {
    const agrupados = [];
    let idCounter = 1;

    productos.forEach((producto, index) => {
        //console.log(`Producto ${index + 1}:`, producto);
        //console.log(`Codigo del producto ${index + 1}:`, producto.Codigo);

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
                cantidad: 1
            });
        }
    });

    return agrupados;
}

module.exports = { obtenerDatos, agruparProductos };

import { useState } from "react";
import toast from "react-hot-toast";

export default function useProduct() {
  const [products, setproducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [cart, setCart] = useState([]);

  const addItem = (item, product) => {
    const itemExists = cart.find(
      (productoItem) => productoItem.item.code === item.code
    );
    if (itemExists) {
      const updateItem = cart.map((productoItem) =>
        productoItem.item.code === item.code
          ? {
              ...productoItem,
              quantity: productoItem.quantity + 1,
            }
          : productoItem
      );
      setCart(updateItem);
    } else {
      const newItem = {
        item,
        name: product.name,
        price: product.price,
        quantity: 1,
      };
      setCart([...cart, newItem]);
    }
    toast.success("Producto agregado")
  };

  function deleteItem(codeItem) {
    setCart(cart.filter(
      (carItemExist) => carItemExist.item.code !== codeItem
    ));
    toast.error("Producto Eliminado")
  }

  const getCategoryesUniques = (type) => {
    const result = new Set();
    switch (type) {
      case "Categoria":
        products.forEach((product) => {
          result.add(product.categorys);
        });
        break;
      case "Color":
        products.forEach((product) => {
          product.clothes.forEach((clothe) => {
            result.add(clothe.colors);
          });
        });
        break;
      case "Talla":
        products.forEach((product) => {
          product.clothes.forEach((clothe) => {
            result.add(clothe.sizes);
          });
        });
        break;
    }
    return Array.from(result);
  };

  const handleCategoryesChange = (itemCategory, type) => {
    switch (type) {
      case "Categoria":
        if (selectedCategory.includes(itemCategory)) {
          setSelectedCategory(
            selectedCategory.filter((item) => item !== itemCategory)
          );
        } else {
          setSelectedCategory([...selectedCategory, itemCategory]);
        }
        break;
      case "Color":
        if (selectedColor.includes(itemCategory)) {
          setSelectedColor(
            selectedColor.filter((item) => item !== itemCategory)
          );
        } else {
          setSelectedColor([...selectedColor, itemCategory]);
        }
        break;
      case "Talla":
        if (selectedSize.includes(itemCategory)) {
          setSelectedSize(selectedSize.filter((item) => item !== itemCategory));
        } else {
          setSelectedSize([...selectedSize, itemCategory]);
        }
        break;
    }
  };

  return {
    products,
    setproducts,
    selectedCategory,
    selectedColor,
    selectedSize,
    cart,
    addItem,
    deleteItem,
    getCategoryesUniques,
    handleCategoryesChange,
  };
}

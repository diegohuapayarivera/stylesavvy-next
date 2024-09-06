import { useState } from "react";
import toast from "react-hot-toast";

export default function useProduct() {
  const [products, setproducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [cart, setCart] = useState([]);

  const ITEM_MAX_SIZE = 5;
  const QUANTITY_ITEM_MAX_SIZE = 3;

  const addItem = (item, product) => {
    console.log(cart);
    const itemExists = cart.find(
      (productoItem) => productoItem.item.code === item.code
    );
    if (itemExists) {
      const itemExists = cart.find(
        (productoItem) => productoItem.quantity >= QUANTITY_ITEM_MAX_SIZE
      );
      if (itemExists){
        toast.error("¡Ups! Has superado la cantidad máxima permitida de este producto. 😅");
        return
      }
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
      if (cart.length >= ITEM_MAX_SIZE) {
        toast.error("¡Lo sentimos! Has superado el límite en el carrito. 😔");
        return;
      }
      const newItem = {
        item,
        name: product.name,
        price: product.price,
        quantity: 1,
      };
      setCart([...cart, newItem]);
    }
    toast.success("¡Excelente elección! Producto agregado. 🚀");
  };

  function deleteItem(codeItem) {
    setCart(cart.filter((carItemExist) => carItemExist.item.code !== codeItem));
    toast.error("¡Cuidado! Has eliminado un producto. 😔");
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
    setCart,
    addItem,
    deleteItem,
    getCategoryesUniques,
    handleCategoryesChange,
  };
}

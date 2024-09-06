/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function CartItem({ cart, deleteItem , setCart}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const totalAmount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  const isDisabled = !name || !phone;

  const encodedMessage = useMemo(() => {
    let message = `Hola StyleSavvy, me llamo ${name} y estoy interesado en estos productos:%0A%0A`;
    let totalPrice = 0;

    for (let i = 0; i < cart.length; i++) {
      const product = cart[i];
      const { name, price, quantity, item } = product;
      const subtotal = price * quantity;
      totalPrice += subtotal;

      // Agregar el producto al mensaje con salto de línea
      message += `${i + 1}. Nombre: ${name} | Código: ${item.code} | Talla: ${
        item.sizes
      } | Color: ${item.colors} | Precio: S/ ${subtotal.toFixed(2)} %0A%0A`;
    }

    message += `Total a pagar: S/ ${totalPrice.toFixed(2)}`;
    return `https://api.whatsapp.com/send/?phone=51978764913&text=${message}`;
  }, [name, cart]);


  const handleSubmitData = async () => {
    const data = {
      nombre: name,
      celular: phone,
      carrito: cart
    };

    try {
       await fetch("https://script.google.com/macros/s/AKfycbz8RtMz31ETl_emXSeaQuPC50qp_SGqIYaKLO6mO9opFBmPP8l3G7_GcK9iHU0zMOmX/exec", {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
    setCart([])
  }

  return (
    <>
      {cart.length === 0 ? (
        <div className="p-4 text-center">
          <p className="text-muted-foreground">Tu carrito esta vacio.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {cart.map((product) => (
            <div key={product.item.image} className="flex items-center gap-4">
              <img
                src={product.item.image}
                alt={product.item.name}
                width={20}
                height={20}
                className="object-cover w-10 pl-2 rounded-md aspect-square"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    {product.name} - {product.item.colors}
                  </h3>
                  <span className="font-semibold">
                    S/{(product.price * product.quantity).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Cantidad: </span>
                  {product.quantity}
                  <span>Talla: </span>
                  {product.item.sizes}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteItem(product.item.code)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="none"
                    d="M296 64h-80a7.91 7.91 0 0 0-8 8v24h96V72a7.91 7.91 0 0 0-8-8"
                  />
                  <path
                    fill="currentColor"
                    d="M432 96h-96V72a40 40 0 0 0-40-40h-80a40 40 0 0 0-40 40v24H80a16 16 0 0 0 0 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 0 0 0-32M192.57 416H192a16 16 0 0 1-16-15.43l-8-224a16 16 0 1 1 32-1.14l8 224A16 16 0 0 1 192.57 416M272 400a16 16 0 0 1-32 0V176a16 16 0 0 1 32 0Zm32-304h-96V72a7.91 7.91 0 0 1 8-8h80a7.91 7.91 0 0 1 8 8Zm32 304.57A16 16 0 0 1 320 416h-.58A16 16 0 0 1 304 399.43l8-224a16 16 0 1 1 32 1.14Z"
                  />
                </svg>
              </Button>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <>
          <Separator className="my-4" />
          <div className="flex items-center justify-between px-4 py-2 bg-muted rounded-b-md">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">S/{totalAmount.toFixed(2)}</span>
          </div>
          <div className="px-4 py-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="flex items-center justify-center w-full gap-2 border-2 border-white"
                  size="icon"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
                    />
                  </svg>
                  Comprar
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[425px] bg-primary text-secondary">
                <DialogHeader>
                  <DialogTitle>Escogiste el outfit Perfecto 😍</DialogTitle>
                  <DialogDescription>
                    Ahora necesitamos que coloques tu nombre y celular para
                    hacer el pedido✨.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid items-center grid-cols-4 gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nombre
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Juan Perez Soto"
                      className="col-span-3 text-primary"
                    />
                  </div>
                  <div className="grid items-center grid-cols-4 gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Celular
                    </Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="col-span-3 text-primary"
                      placeholder="999888777"
                    />
                  </div>
                </div>
                <DialogFooter>
                <DialogClose asChild>
                <a
                    href={encodedMessage}
                    target="_blank"
                    style={{
                      pointerEvents: isDisabled ? "none" : "auto",
                      color: isDisabled ? "gray" : "white",
                    }}
                    onClick={handleSubmitData}
                  >
                    Enviar mensaje por WhatsApp
                  </a>
                
                </DialogClose>
              
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
    </>
  );
}

export default CartItem;

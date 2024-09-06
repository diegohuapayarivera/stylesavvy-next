/* eslint-disable @next/next/no-img-element */
import { useMemo } from "react";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

function ProductItem({
  products,
  selectedCategory,
  selectedColor,
  selectedSize,
  addItem
}) {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        selectedCategory.length > 0 &&
        !selectedCategory.some((category) =>
          product.categorys.includes(category)
        )
      ) {
        return false;
      }
      if (
        selectedColor.length > 0 &&
        !selectedColor.some((color) => product.colors.includes(color))
      ) {
        return false;
      }
      if (
        selectedSize.length > 0 &&
        !selectedSize.some((size) => product.sizes.includes(size))
      ) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, selectedColor, selectedSize, products]);

  return (
    <>
      {filteredProducts.map((product) => (
        <div
          key={product.code_clothe}
          className="overflow-hidden rounded-lg shadow-sm bg-card text-card-foreground"
        >
          <div className="grid gap-2 p-4 border-2 rounded-md border-muted">
            <img
              src={product.clothes[0].image}
              alt={product.clothes[0].code}
              width={300}
              height={300}
              className="object-cover w-full rounded-md aspect-square"
            />
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <span className="font-semibold">S/{product.price}</span>
            </div>
            <div className="grid gap-2">
              <div>
                <h4 className="mb-1 text-sm font-semibold">Colores</h4>
                <div className="grid grid-cols-3 sm:flex sm:flex-wrap sm:gap-2">
                  {product.colors
                    .filter(
                      (valor, indice, self) => self.indexOf(valor) === indice
                    )
                    .map((color) => (
                      <Badge
                        key={color}
                        variant="outline"
                        className="px-2 py-1"
                      >
                        {color}
                      </Badge>
                    ))}
                </div>
              </div>
              <div>
                <h4 className="mb-1 text-sm font-semibold">Tallas</h4>
                <div className="grid grid-cols-3 sm:flex sm:flex-wrap sm:gap-2">
                  {product.sizes
                    .filter(
                      (valor, indice, self) => self.indexOf(valor) === indice
                    )
                    .map((size) => {
                      return (
                        <Badge
                          key={size}
                          variant="outline"
                          className={`px-2 py-1 bg-${size}-500 text-${size}-50`}
                        >
                          {size}
                        </Badge>
                      );
                    })}
                </div>
              </div>
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
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
                      />
                    </svg>
                    Ver producto
                  </Button>
                </DialogTrigger>
                <DialogContent className="text-secondary sm:max-w-[425px] max-w-[400px] bg-primary">
                  <DialogHeader>
                    <DialogTitle className="">
                      Colores y tallas disponibles
                    </DialogTitle>
                  </DialogHeader>
                  <Carousel className="relative w-full max-w-4xl">
                    <CarouselContent>
                      {product.clothes.map((clote) => (
                        <CarouselItem key={clote.code}>
                          <div className="grid items-center grid-cols-1 gap-6 md:grid-cols-2 ">
                            <img
                              src={clote.image}
                              alt={clote.code}
                              width={400}
                              height={400}
                              className="object-cover rounded-lg aspect-square"
                            />
                            <div className="grid gap-4">
                              <div className="grid gap-2">
                                <h3 className="text-xl font-bold">
                                  {product.name}
                                </h3>
                                <p>Talla: {clote.sizes}</p>
                              </div>

                              <div className="flex items-center gap-2">
                                <p>Color: {clote.colors}</p>
                              </div>
                              <Button
                                className="bg-secondary text-primary hover:bg-secondary"
                                type="submit"
                                onClick={() => addItem(clote, product)}
                              >
                                Agregar al carrito
                              </Button>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute -translate-y-1/2 left-4 top-1/2" />
                    <CarouselNext className="absolute -translate-y-1/2 right-4 top-1/2" />
                  </Carousel>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductItem;

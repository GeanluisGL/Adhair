import React, { useState, useEffect } from "react";

const OrderProduct = ({ product, quantity, onPriceChange }) => {
  const [subtotal, setSubtotal] = useState(0); // Estado para el subtotal
  const [totalPrice, setTotalPrice] = useState(0); // Estado para el precio total
  const shippingCost = 100; // Costo fijo de envío

  // Efecto para calcular el subtotal y el total cuando el producto o la cantidad cambian
  useEffect(() => {
    if (product && quantity) {
      const productPrice = parseFloat(product.ProductPrice); // Convertir el precio a número
      const calculatedSubtotal = productPrice * quantity; // Calcular el subtotal
      const total = calculatedSubtotal + shippingCost; // Sumar el subtotal y el envío

      setSubtotal(calculatedSubtotal.toFixed(2)); // Actualizar el estado del subtotal
      setTotalPrice(total.toFixed(2)); // Actualizar el estado del total

      // Llamar a la función onPriceChange con el productPrice
      if (onPriceChange) {
        onPriceChange(productPrice);
      }
    }
  }, [product, quantity, onPriceChange]);

  return (
    <div className="p-4 bg-light rounded shadow">
      <h3 className="mb-4">Resumen de la orden</h3>

      {/* Mostrar el precio del producto */}
      <div className="mb-3">
        <strong>Precio del producto:</strong> ${product?.ProductPrice || "0.00"}
      </div>

      {/* Mostrar la cantidad */}
      <div className="mb-3">
        <strong>Cantidad:</strong> {quantity}
      </div>

      {/* Mostrar el subtotal */}
      <div className="mb-3">
        <strong>Subtotal:</strong> ${subtotal}
      </div>

      {/* Mostrar el costo de envío */}
      <div className="mb-3">
        <strong>Costo de envío:</strong> ${shippingCost.toFixed(2)}
      </div>

      {/* Mostrar el precio total */}
      <div className="mb-3">
        <strong>Total a pagar:</strong> ${totalPrice}
      </div>
    </div>
  );
};

export default OrderProduct;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { show_alert } from "../functions";
import ANavbar from "./ANavbar";
import "./Style/OrderView.css"; // Importa el archivo CSS
import {Card, Carousel } from "react-bootstrap";
import jsPDF from "jspdf"; // Importa jsPDF

const OrderView = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]); // Inicializamos como un array vacío
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const CRL = "http://localhost:5000/product";

  // Cargar detalles de la orden
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/${orderId}`);
      if (response.data.success) {
        setOrder(response.data.data);
      } else {
        show_alert("No se pudo obtener la orden", "error");
        navigate("/orders");
      }
    } catch (error) {
      show_alert("Error al cargar la orden", "error");
      navigate("/orders");
    } finally {
      setLoading(false);
    }
  };

  // Cargar lista de productos
  const getWigs = async () => {
    try {
      const response = await axios.get(CRL);
      setData(response.data.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getWigs();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Cargar detalles de la orden cuando orderId cambie
  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  // Buscar el producto asociado a la orden
  useEffect(() => {
    if (order?.WigId && data.length > 0) {
      const foundProduct = data.find((product) => product._id === order.WigId);
      setProduct(foundProduct || null);
    }
  }, [order, data]);

  // Función para enviar correo de confirmación
  const sendConfirmationEmail = async () => {
    setIsSendingEmail(true);

    const emailData = {
      to: order.ClientID, // Correo del cliente (debería estar en el objeto `order`)
      subject: "Confirmación de Orden",
      text: `Hola ${order.ClientName}, tu orden #${order._id} ha sido confirmada. Gracias por tu compra.`,
    };

    try {
      const response = await axios.post("http://localhost:5000/confirmation/send-email", emailData);
      if (response.data.success) {
        setEmailSent(true);
        show_alert("Correo de confirmación enviado con éxito", "success");
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      show_alert("Error al enviar el correo de confirmación", "error");
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Función para generar y descargar el PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Título del PDF
    doc.setFontSize(18);
    doc.text("Detalles de la Orden", 10, 10);

    // Información del Cliente
    doc.setFontSize(12);
    doc.text(`Nombre: ${order.ClientName}`, 10, 20);
    doc.text(`Correo: ${order.ClientID}`, 10, 30);
    doc.text(`Teléfono: ${order.ClientNumber || "No disponible"}`, 10, 40);
    doc.text(`Dirección: ${order.ClientAddress}`, 10, 50);

    // Detalles del Producto
    doc.text(`Producto: ${product?.ProductName || "No disponible"}`, 10, 60);
    doc.text(`Cantidad: ${order.Quantity}`, 10, 70);
    doc.text(`Color: ${order.WigColor}`, 10, 80);
    doc.text(`Tamaño de Cabeza: ${order.HeadSize}`, 10, 100);
    doc.text(`Descripción: ${order.Description || "No disponible"}`, 10, 110);

    // Información de Pago
    doc.text(`Número de Transferencia: ${order.TransferId}`, 10, 120);
    doc.text(
      `Precio Total: ${new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(order.TotalPrice)}`,
      10,
      130
    );

    // Guardar el PDF
    doc.save(`orden_${order._id}.pdf`);
  };

  
  if (loading) {
    return <p className="loading-text">Cargando...</p>;
  }

  if (!order) {
    return <p className="error-text">No se encontró la orden.</p>;
  }

  return (
    <div className="order-view-container">
      <ANavbar />


          <hr />        
          {/* Botón para descargar PDF */}
          <div className="floating-button-container">
            <button
              className="pdf-button btn btn-transparent d-flex align-items-center"
              onClick={downloadPDF}
              style={{
                padding: "10px 20px", // Ajusta el padding para un tamaño normal
                fontSize: "14px", // Tamaño de la fuente
                borderRadius: "5px", // Bordes redondeados
                border: "1px solid #007bff", // Borde azul
                backgroundColor: "#007bff", // Fondo azul
                color: "#fff", // Texto blanco
                cursor: "pointer", // Cambia el cursor al pasar el mouse
                transition: "background-color 0.3s ease", // Transición suave
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")} // Efecto hover
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")} // Efecto hover
            >
              <i className="fa-solid fa-file-arrow-down me-2"></i> {/* Icono de FontAwesome */}
              Descargar PDF
            </button>
          </div> <hr />
      <div className="order-view-content">

        <h2 className="order-view-title">Detalles de la Orden</h2>

        <h3 className="order-view-subtitle">Orden #{order._id}</h3>

        {/* Información del Cliente */}
        <div className="client-info">
          <h4>Información del Cliente</h4>
          <p><strong>Nombre:</strong> {order.ClientName}</p>
          <p><strong>Mail del Cliente:</strong> {order.ClientID}</p>
          <p><strong>Número telefónico:</strong> {order.ClientNumber || "No disponible"}</p>
          <p><strong>Dirección:</strong> {order.ClientAddress}</p>
        </div>

        {/* Detalles del Producto */}

        <div className="product-details">
          <h4>Detalles del Producto</h4>
          <p><strong>Producto:</strong></p>
          <Card className="border-0 product-details mx-auto" style={{ maxWidth: "500px" }}>
            {product && product.images && product.images.length > 0 ? (
              <Carousel className="custom-carousel">
                {product.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100 rounded"
                      src={`http://localhost:5000/${image.replace("\\", "/")}`}
                      alt={`${product.ProductName || "Producto"} ${index + 1}`}
                      onError={(e) => (e.target.src = "https://via.placeholder.com/500")}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <img className="d-block w-100 rounded" src="https://via.placeholder.com/500" alt="Producto" />
            )}
          </Card>
          {product && (
            <p><strong>Nombre del Producto:</strong> {product.ProductName || "Nombre no disponible"}</p>
          )}
          <p><strong>Cantidad:</strong> {order.Quantity}</p>
          <p><strong>Color:</strong> {order.WigColor}</p>

          <p><strong>Tamaño de Cabeza:</strong> {order.HeadSize}</p>
          <p><strong>Descripción de la Orden:</strong> {order.Description || "No disponible"}</p>
        </div>

        {/* Información de Pago */}
        <div className="payment-info">
          <h4>Información de Pago</h4>
          <p><strong>Número de Transferencia:</strong> {order.TransferId}</p>

          {/* Mostrar imágenes de la orden */}
          {order.images && order.images.length > 0 && (
            <div className="order-images">
              <p><strong>Imágenes de la transferencia:</strong></p>
              <div className="image-grid">
                {order.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/${image}`}
                    alt={`Imagen ${index + 1}`}
                    className="img-fluid rounded"
                    style={{ maxWidth: "150px", height: "auto", margin: "10px" }}
                  />
                ))}
              </div>
            </div>
          )}

          <p>
            <strong>Precio Total:</strong>{" "}
            {new Intl.NumberFormat("es-MX", {
              style: "currency",
              currency: "MXN",
            }).format(order.FinalPrice)}
          </p>


          {/* Botón para enviar correo */}
          <div className="floating-button-container">
            <button
              className="email-button"
              onClick={sendConfirmationEmail}
              disabled={isSendingEmail || emailSent}
            >
              {isSendingEmail ? "Enviando..." : emailSent ? "Correo Enviado" : "Enviar correo de Confirmación"}
            </button>
          </div>
        </div>

        <hr />

        {/* Botón para volver */}
        <div className="back-button">
          <button onClick={() => navigate("/orders")}>
            Volver a la lista de órdenes
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
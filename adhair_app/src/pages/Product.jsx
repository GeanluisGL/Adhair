import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner, Alert, Form, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Returnbtn from "../components/returnbtn";
import "../components/Style/product.css";
import { show_alert } from "../functions";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError("ID de producto inválido");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          setError("Producto no encontrado");
        }
      } catch (error) {
        setError("No se pudo cargar el producto. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelection = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleQuantitySelection = (quantity) => {
    setSelectedQuantity(quantity);
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize || !selectedQuantity) {
      show_alert("Por favor, selecciona un color, una talla y la cantidad antes de comprar.", "warning");
      return;
    }
    const productPriceString = product.ProductPrice.toString();
    navigate(`/orderproduct/${id}?color=${selectedColor}&size=${selectedSize}&quantity=${selectedQuantity}&price=${productPriceString}`);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
        <h4 className="ms-3">Cargando producto...</h4>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="w-100 p-4 bg-white shadow-lg rounded" style={{ maxWidth: "1100px" }}>
          {/* Carrusel de Imágenes */}
          <Col md={5} className="d-flex justify-content-center">
            <Card className="border-0">
              {product.images && product.images.length > 0 ? (
                <Carousel className="custom-carousel">
                  {product.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100 rounded"
                        src={`http://localhost:5000/${image.replace("\\", "/")}`} 
                        alt={`${product.ProductName} ${index + 1}`}
                        onError={(e) => (e.target.src = "https://via.placeholder.com/500")}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <img className="d-block w-100 rounded" src="https://via.placeholder.com/500" alt="Producto" />
              )}
            </Card>
          </Col>

          {/* Información del Producto */}
          <Col md={4} className="d-flex flex-column justify-content-center">
            <Returnbtn />
            <h2 className="fw-bold">{product.ProductName}</h2>
            <h3 className="text-success fw-bold">${product.ProductPrice}</h3>
            <p className="text-muted">{product.ProductDescrip}</p>

            {/* Selección de color y cantidad */}
            <Row>
              {/* Color */}
              <Col md={6}>
                <div className="mb-3">
                  <h5 className="fw-bold">Color</h5>
                  <div className="d-flex">
                    <input type="button" className="rounded-circle color-button" style={{ width: 35, height: 35, backgroundColor: "#000000" }} value="" onClick={() => handleColorSelection("Dark")} />
                    <input type="button" className="rounded-circle color-button" style={{ width: 35, height: 35, backgroundColor: "#FAF0BE" }} value="" onClick={() => handleColorSelection("Blonde")} />
                    <input type="button" className="rounded-circle color-button" style={{ width: 35, height: 35, backgroundColor: "#964B00" }} value="" onClick={() => handleColorSelection("Brown")} />
                  </div>
                </div>
              </Col>

              {/* Cantidad */}
              <Col md={6}>
                <div className="mb-3">
                  <h5 className="fw-bold">Cantidad</h5>
                  <input type="number" className="form-control p-2" min="1" defaultValue="1" onChange={(e) => handleQuantitySelection(e.target.value)} />
                </div>
              </Col>
            </Row>

            {/* Selección de talla */}
            <Row>
              <Col>
                <h5 className="fw-bold">Talla</h5>
                <Form.Select className="p-2" onChange={handleSizeSelection}>
                  <option value="">-Select-</option>
                  <option value="Small (21.5')">S(21.5')</option>
                  <option value="Medium (22.5')">M(22.5')</option>
                  <option value="Large (23-23.5')">L(23-23.5')</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>

          {/* Sección de Compra */}
          <Col md={3} className="d-flex flex-column justify-content-center">
            <Card className="p-3 border-0 shadow-sm">
              <h4 className="fw-bold text-success">En stock</h4>
              <Button variant="success" className="w-100 mt-2 p-2 fw-semibold" onClick={handleBuyNow}>
                💳 Comprar Ahora
              </Button>
              <hr />
              <p className="text-muted">📦 Envío en 15-20 días</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Product;

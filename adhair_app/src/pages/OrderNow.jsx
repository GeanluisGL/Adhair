import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { show_alert } from "../functions";
import "../components/Style/OrderNow.css";
import { useLocation } from "react-router-dom";
import BankInfo from "../components/BankInfo";
import OrderProduct from "../components/OrderProduct";

const OrderNow = () => {
  const navigate = useNavigate();
  const URL = "http://localhost:5000/orders";
  const { id } = useParams(); // Obtén el id de la URL
  const [product, setProduct] = useState("");
  const [headsize, setHeadsize] = useState("");
  const [productoPrice, setProductoPrice] = useState(0);
  const [client, setClient] = useState("");
  const [clientId, setClientId] = useState("");
  const [address, setAddress] = useState("");
  const [transferId, setTransferId] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [description, setDescription] = useState("");
  const [operation] = useState(1);
  const [title] = useState("Registrar Orden");
  const [filteredData, setFilteredData] = useState([]); // Estado para datos filtrados
  const [orders, setOrders] = useState(null); // Estado para las órdenes (corregido)
  const [images, setImages] = useState([]); // Estado para almacenar las imágenes seleccionadas
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const color = searchParams.get("color");
  const size = searchParams.get("size");
  const quantity = searchParams.get("quantity");
  const ProductPrice = searchParams.get("price"); // Extraer el precio de la URL

  useEffect(() => {
    if (id) {
      setProduct(id); // Asigna el id de la URL al estado product
    }
  }, [id]);

  const getOrders = useCallback(async () => {
    try {
      const response = await axios.get(URL);
      setOrders(response.data.data); // Actualizar el estado orders
      setFilteredData(response.data.data); // Inicializar filteredData
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
    }
  }, []); // Dependencias vacías para que solo se ejecute una vez

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const handlePriceChange = (price) => {
    setProductoPrice(price); // Actualizar el estado con el nuevo productPrice
  };

  // Manejar la selección de imágenes
  const handleImageChange = (e) => {
    setImages([...e.target.files]); // Guardar las imágenes seleccionadas
  };

  const validar = () => {
    if (!clientId.trim()) return show_alert("Recuerde agregar el email", "warning");
    if (!client.trim()) return show_alert("Recuerde agregar su nombre", "warning");
    if (!clientNumber.trim()) return show_alert("Recuerde agregar su número de teléfono", "warning");
    if (!address.trim()) return show_alert("Recuerde agregar la dirección", "warning");
    if (!product.trim()) return show_alert("Recuerde agregar el nombre del producto", "warning");
    if (!quantity.trim()) return show_alert("Recuerde agregar la cantidad", "warning");
    if (!transferId.trim()) return show_alert("Recuerde agregar el número de transferencia", "warning");
    if (images.length === 0) {
      return show_alert("Debe subir la imagen de la transacción", "warning");
    }

    const parameters = {
      ClientID: clientId.trim(),
      ClientName: client.trim(),
      ClientNumber: clientNumber.trim(),
      ClientAddress: address.trim(),
      WigId: product.trim(),
      Quantity: quantity.trim(),
      HeadSize: size.trim(),
      WigColor: color.trim(),
      TransferId: transferId.trim(),
      Description: description.trim(),
      FinalPrice: productoPrice, // Incluir el precio del producto en los parámetros
    };

    if (operation === 1) {
      sendTOCREATE("POST", parameters);
    } else {
      sendTOCREATE("PATCH", parameters);
    }
  };

  const sendTOCREATE = async (method, parameters) => {
    try {
      const formData = new FormData(); // Crear un FormData para enviar imágenes y datos

      // Agregar los datos de la orden al FormData
      Object.keys(parameters).forEach((key) => {
        formData.append(key, parameters[key]);
      });

      // Agregar las imágenes al FormData
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await axios({
        method,
        url: URL,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data", // Importante para enviar archivos
        },
      });

      show_alert(response.data.message, response.data.success ? "success" : "error");
      if (response.data.success) navigate("/"); // Redirige a la lista de órdenes
    } catch (error) {
      show_alert("Error en la solicitud", "error");
      console.error(error);
    }
  };

  return (
    <div className="order-now-container d-flex flex-row align-items-center justify-content-center min-vh-100 gap-4">
      {/* Primer contenedor */}
      <div className="order-now-card" style={{ maxWidth: "600px", width: "100%", padding: "20px" }}>
        <div className="d-flex gap-2">
          <button
            className="btn btn-secondary d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </div>
        <h2 className="order-now-title text-center">{title}</h2>
        <div className="order-now-form">
          <div className="form-group">
            <label>Email</label>
            <input type="Email" value={clientId} onChange={(e) => setClientId(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nombre del Cliente</label>
            <input type="text" value={client} onChange={(e) => setClient(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Teléfono del Cliente</label>
            <input type="tel" value={clientNumber} onChange={(e) => setClientNumber(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="form-group">
            <label>ID del Producto</label>
            <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} readOnly />
          </div>
          <div className="form-group">
            <label>Tamaño de la Cabeza</label>
            <input type="text" value={size} onChange={(e) => setHeadsize(e.target.value)} readOnly />
          </div>
          <div className="form-group">
            <label>Color</label>
            <input type="text" value={color} readOnly />
          </div>
          <div className="form-group">
            <label>Cantidad</label>
            <input type="text" value={quantity} readOnly />
          </div>
          <div className="form-group">
            <label>Descripción de la Orden</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength="200"
            />
          </div>
        </div>
        <br />
      </div>

      {/* Segundo contenedor */}
      <div className="order-now-card" style={{ maxWidth: "600px", width: "100%", padding: "20px" }}>
        <div className="row g-3">
          {/* Campo: Número de Transferencia */}
          <div className="col-md-6">
            <div className="form-group">
              <label>Número de Transferencia</label>
              <input
                type="number"
                value={transferId}
                onChange={(e) => setTransferId(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          {/* Campo: Imágenes de la transferencia */}
          <div className="col-md-6">
            <div className="form-group">
              <label>Imágenes de la transferencia</label>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="form-control"
              />
            </div>
          </div>

          {/* Componente: BankInfo */}
          <div className="col-12">
            <BankInfo />
          </div>

          {/* Componente: OrderProduct */}
          <div className="col-12">
            {/* Pasar el precio del producto al componente OrderProduct */}
            <OrderProduct product={{ ProductPrice }} quantity={quantity} onPriceChange={handlePriceChange} />
          </div>

          {/* Botón: Realizar Orden */}
          <div className="col-12">
            <button className="order-now-button w-100" onClick={validar}>
              Realizar Orden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderNow;
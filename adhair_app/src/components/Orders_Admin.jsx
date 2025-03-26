import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import ANavbar from "./ANavbar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Card, Carousel } from "react-bootstrap";


import { show_alert } from "../functions";
import './Style/orderAdmin.css'

const Orders_Admin = () => {
  const navigate = useNavigate();
  const URL = "http://localhost:5000/orders"
  const [data] = useState([]);
  const [id, setId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [longitude, setLongitude] = useState("");
  const [headsize, setHeadsize] = useState("");
  const [color, setColor] = useState("");
  const [client, setClient] = useState("");
  const [clientId, setClientId] = useState("");
  const [address, setAddress] = useState("");
  const [transferId, setTransferId] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [description, setDescription] = useState("");
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [userDetails, setUserDetails] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);
  const [order] = useState(null);
  const [orders, setOrders] = useState([]);
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const CRL = "http://localhost:5000/product";
 
  // Cargar datos del usuario
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        show_alert("Usuario no está logeado", "error");
        return;
      }
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      }
    });
  };

  // Cargar órdenes
  const getOrders = async () => {
    try {
      const response = await axios.get(URL);
      setOrders(response.data.data); // Actualizar el estado orders
      setFilteredData(response.data.data); // Inicializar filteredData
      console.log("Datos de órdenes cargados:", response.data.data);
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
    }
  };

  // Cargar productos
  const getWigs = async () => {
    try {
      const response = await axios.get(CRL);
      setProducts(response.data.data);
      // console.log("Datos de productos cargados:", response.data.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // Verificar si el usuario es admin
  const checkAdmin = async () => {
       const user = auth.currentUser;
       if (user) {
         const userDoc = await getDoc(doc(db, "Users", user.uid));
         if (userDoc.exists() && userDoc.data().role === "admin") {
           setIsAdmin(true);
         } else {
           setIsAdmin(false);
           navigate("/"); // Redirigir a la página principal si no es admin
         }
       } else {
         navigate("/"); // Si no hay usuario, redirigir
       }
     };
     

  // Efectos secundarios
  useEffect(() => {
    fetchUserData();
    checkAdmin();
    getOrders();
    getWigs();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(orders); // Usar orders aquí
    } else {
      const filtered = orders.filter((order) => {
        return (
          order.ClientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (order.Description && order.Description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
      setFilteredData(filtered);
    }
  }, [searchTerm, orders]); // orders es una dependencia

  // Buscar el producto asociado a la orden
    useEffect(() => {
      if (order?.WigId && data.length > 0) {
        const foundProduct = data.find((product) => product._id === order.WigId);
        setProduct(foundProduct || null);
      }
    }, [order, data]);

   // Ordenar las órdenes
   useEffect(() => {
    if (orders) {
      const sortedOrders = [...orders].sort((a, b) => {
        const dateA = new Date(a.createdAt); // Asegúrate de que las órdenes tengan un campo `createdAt`
        const dateB = new Date(b.createdAt);
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
      setFilteredData(sortedOrders);
    }
  }, [sortOrder, orders]);


  // Abrir modal
  const openModal = (op, id,  product, quantity, longitude, headsize, color, client, clientId, address, description, clientNumber, transferId) => {
    setId('');
    setProduct('');
    setQuantity('');
    setLongitude('');
    setHeadsize('');
    setColor('');
    setClient('');
    setClientId('');
    setAddress('');
    setTransferId('');
    setClientNumber('');
    setDescription('');
    setOperation(op);
  
    if(op === 1){
      setTitle('Registrar Orden')
  
    } 
    else if(op === 2){
      setTitle('Editar orden')
      setId(id);
      setProduct(product);
      setQuantity(quantity);
      setLongitude(longitude);
      setHeadsize(headsize);
      setColor(color);
      setClient(client);
      setClientId(clientId);
      setAddress(address);
      setClientNumber(clientNumber);  
      setDescription(description);
      setTransferId(transferId);
    }
   
  }
  const validar= () => {
    var parameters;
    if(product.trim() === ''){
        show_alert('Recuerda agregar el nombre del producto', 'warning')
      }
      else if(quantity.trim() === ''){
        show_alert('Recuerda agregar la cantidad', 'warning')
        
      }
      else if(longitude.trim() === ''){
      show_alert('Recuerda agregar la longitud(largo) ', 'warning')
      
    }
    else if(headsize.trim() === ''){
      show_alert('Recuerda agregar el tamaño de la cabeza', 'warning')
  
    }
    else if(color.trim() === ''){
      show_alert('Recuerda agregar el color del producto', 'warning')
  
    }
    else if(client.trim() === ''){
      show_alert('Recuerda agregar el nombre', 'warning')
  
    }
    else if(clientId.trim() === ''){
      show_alert('Recuerda agregar el Email', 'warning')
  
    }
    else if(address.trim() === ''){
      show_alert('Recuerda agregar la direccion', 'warning')
  
    }
    else if(transferId.trim() === ''){
      show_alert('Recuerda agregar el numero de transferencia para confirmar el pago', 'warning')
  
    }
    else {
      if(operation === 1){
        parameters= {Quantity:quantity.trim(), ClientNumber:clientNumber.trim(), Description: description.trim() ,ClientID: clientId.trim(), ClientName: client.trim(), ClientAddress: address.trim(), WigId: product.trim(), WigColor: color.trim(), WigLongitude: longitude.trim(), HeadSize: headsize.trim(), TransferId: transferId.trim()}
        sendTOCREATE("POST", parameters);
      } else if (operation === 2) {
        parameters= { _id:id,Quantity:quantity.trim(), ClientNumber:clientNumber.trim(), Description: description.trim() ,ClientID: clientId.trim(), ClientName: client.trim(), ClientAddress: address.trim(), WigId: product.trim(), WigColor: color.trim(), WigLongitude: longitude.trim(), HeadSize: headsize.trim(), TransferId: transferId.trim()}
        sendTOPATCH('PATCH', id, parameters)
    }
  }}

  // Enviar datos para crear
  const sendTOCREATE = async (method, parameters) => {
    try {
      const response = await axios({ method, url: URL, data: parameters });
      show_alert(response.data.message, response.data.success ? "success" : "error");
      if (response.data.success) {
        document.getElementById("btnCerrar").click();
        getOrders();
      }
    } catch (error) {
      show_alert("Error en la solicitud", "error");
      console.error(error);
    }
  };

  // Enviar datos para actualizar
  const sendTOPATCH = async (method, ordersId, parameters) => {
    // console.log("Este es el id que se envía: ", ordersId); // Para verificar si es correcto
    await axios({ method: method, url: `${URL}/${ordersId}`, data: parameters })
      .then(function (response) {
        var type = response.data.success;
        var mensaje = response.data.message;
  
        show_alert(mensaje, type ? "success" : "error");
  
        if (type) {
          document.getElementById("btnCerrar").click();
          getOrders();
        }
      })
      .catch(function (error) {
        show_alert("ERROR EN LA SOLICITUD", "error");
        console.log(error);
      });
  };
  // Eliminar orden
  const deleteProduct = (id, name) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `¿Seguro de eliminar a ${name}?`,
      icon: "question",
      text: "No se podrá dar marcha atrás",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        sendTODELETE("DELETE", id);
      }
    });
  };

  // Enviar datos para eliminar
  const sendTODELETE = async (method, orderId) => {
    try {
      const response = await axios({ method, url: `${URL}/delete/${orderId}` });
      show_alert(response.data.message, response.data.success ? "success" : "error");
      if (response.data.success) {
        getOrders();
      }
    } catch (error) {
      show_alert("Error en la solicitud", "error");
      console.error(error);
    }
  };

  if (isAdmin === null) {
    return <div>Cargando...</div>;
  }
 
  
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredData(data); // Si está vacío, muestra todos los productos
    } else {
      const filtered = data.filter((order) => {
        // Verifica que el producto y sus propiedades existan
        if (
          order &&
          order.ClientName &&
          order._id &&
          order.Description
        ) {
          return (
            order.ClientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.Description.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        // Si el producto no tiene las propiedades necesarias, no lo incluyas en los resultados
        return false;
      });
      setFilteredData(filtered);
    }
  };

  const generatePDF = () => {
    const input = document.getElementById("table-to-export"); // ID de la tabla

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // Convertir la tabla a imagen
      const pdf = new jsPDF("p", "mm", "a4"); // Crear un PDF en formato A4
      const imgWidth = 210; // Ancho de la página A4 en mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calcular la altura proporcional

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight); // Añadir la imagen al PDF
      pdf.save("orden.pdf"); // Descargar el PDF
    });
  };

  

  return (
    <div className="container mt-5">
    <h2>Panel de configuración: Órdenes</h2>
    <ANavbar />
    <div className="container mt-4">
      <div className="dd-flex justify-content-between align-items-center mb-3">
        <h3 className="text-dark m-0">Hola {userDetails.name}</h3>
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-dark" onClick={handleSearch}>
            <i className="fa-solid fa-search me-1"></i> Buscar
          </button>
        </div>
        <button
          className="buton_A btn btn-dark d-flex align-items-center"
          onClick={() => openModal(1)}
          data-bs-toggle="modal"
          data-bs-target="#modalProducts"
        >
          <i className="fa-solid fa-circle-plus me-2"></i> Añadir Orden
        </button>
        {/* Botón para generar el PDF */}
        <button className="pdf-button btn btn-transparent d-flex align-items-center" onClick={generatePDF}>
          |<i className="fa-solid fa-file-arrow-down"></i>| Descargar PDF
        </button>
        {/* Selector de orden */}
        <select
          className="form-select w-auto"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Más reciente primero</option>
          <option value="oldest">Más antigua primero</option>
        </select>
      </div>
      
        {/* Tabla de órdenes */}
        <div className="table-responsive">
          <table id="table-to-export" className="table table-striped table-hover table-bordered">
            <thead className="table-dark text-center">
              <tr>
                <th>#</th>
                <th>Cantidad</th>
                <th>Nombre del Producto</th>
                <th>Mail </th>
                <th>Cliente</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="align-middle text-center">
              {filteredData.length > 0 ? (
                filteredData.map((orders, i) => (
                  <tr key={orders._id}>
                    <td>{i + 1}</td>
                    <td>{orders.Quantity}</td>
                    <td>{(products.find(p => p._id === orders.WigId)?.ProductName) || "UNKNOW PRODUCT"}</td> 
                    <td>{orders.ClientID}</td>
                    <td>{orders.ClientName}</td>
                    <td>{orders.ClientAddress}</td>
                    <td>
                    <div className="button-container">
                          <Link to={`/orders/${orders._id}`}>
                            <button className="btn btn-sm btn-warning me-2">
                              <i className="fa-solid fa-circle-info"></i>
                            </button>
                          </Link>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteProduct(orders._id, orders.ClientName)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    No hay órdenes registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <div id="modalProducts" className="modal fade" tabIndex="-1" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <label className="h5">{title}</label>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <input type="hidden" id="id" value={id} />
        <div className="modal-grid"> {/* Contenedor para las columnas */}
          <div className="modal-column"> {/* Columna 1 */}
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-id-card-clip"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Mail del Cliente"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-person"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre del Cliente"
                value={client}
                onChange={(e) => setClient(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-phone"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Teléfono del Cliente"
                value={clientNumber}
                onChange={(e) => setClientNumber(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-location-dot"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-barcode"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="ID del producto"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-column"> {/* Columna 2 */}
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-circle-info"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Cantidad"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-circle-info"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Tamaño de la cabeza"
                value={headsize}
                onChange={(e) => setHeadsize(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-circle-info"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Longitud"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-circle-info"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-file-lines"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Descripción de la Orden"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-file-lines"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Numero de Transferencia"
                value={transferId}
                onChange={(e) => setTransferId(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="d-grid col-6 mx-auto">
          <button onClick={validar} className="btn btn-success">
            <i className="fa-solid fa-floppy-disk"></i> Realizar Orden
          </button>
        </div>
      </div>
      <div className="modal-footer">
        <button
          id="btnCerrar"
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};


export default Orders_Admin;
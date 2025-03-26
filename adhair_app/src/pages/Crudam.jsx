// // Importaciones organizadas por tipo
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// // Firebase
// import { auth, db } from '../firebase/firebase';
// import { doc, getDoc } from 'firebase/firestore';
// // Componentes
// import AdminButton from "../components/AdminButton";
// import ExpansiveTextarea from '../components/ExpansiveTextarea.jsx';
// // Utilidades
// import { show_alert } from '../functions';
// // Iconos
// import { FaGift, FaDollarSign, FaImages, FaSave } from "react-icons/fa";

// const MySwal = withReactContent(Swal);

// const Crudam = () => {

//   //#region  Constant
//   const API_BASE_URL = 'http://localhost:5000'
//   const URL ='http://localhost:5000/product';
//   const [data, setData] = useState([]); // Inicializamos como un array vacío
//   const [id, setId] = useState('');
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [operation, setOperation] = useState(1);
//   const [title, setTitle] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredData, setFilteredData] = useState([]); 
//   const [userDetails, setUserDetails] = useState('');
//   const [images, setImages] = useState([]);
//   const navigate = useNavigate();

// //#endregion

// const fetchUserData = async () => {
//   auth.onAuthStateChanged(async (user) => {
//     const docRef = doc(db, "Users", user.uid);
//     const docSnap = await getDoc(docRef);
//     if(docSnap.exists()) {
//       setUserDetails(docSnap.data());
//       console.log(docSnap.data());
//       } else {
//         console.log("User is not logged in");
//         show_alert('Usuario no esta logeado', 'error')
//       }
//   })
// }
// useEffect(() => {
//   fetchUserData();
// }, []);

// useEffect(() => {
   
// const fetchData = async () => {
//       try {
//         getProducts();
//         // const response = await axios.get(URL);
//         // console.log(response.data); // Para depuración
//         // setData(response.data.data); // Guardamos solo el array `data`
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//   fetchData();
//   }, []);

// useEffect(() => {
//     setFilteredData(data);
// }, [data]
// );


// const getProducts = async () => {
//     try {
//       const response = await axios.get(URL);
//         setData(response.data.data); // Asegurarte de que `data.data` es correcto
//     } catch (error) {
//       console.error("Error al obtener productos:", error);
//     }
//   };

// const loadProductImages = async (productId) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/images/product/${productId}`);
//       if (response.ok) {
//         const imageUrls = await response.json();
//         setImages(imageUrls);
//       } else {
//         setImages([]);
//       }
//     } catch (error) {
//       console.error('Error cargando imágenes:', error);
//       setImages([]);
//     }
//   };

//   useEffect(() => {
//     if (operation === 2 && id) {
//       loadProductImages(id);
//     }
//   }, [operation, id]);

// const handleImageChange = (e) => {
//     setImages([...e.target.files]); // Guardar las imágenes seleccionadas
//   };
  
  

// const openModal = (op, id, name, description, price,  images) => {
//   setId('');
//   setName('');
//   setDescription('');
//   setPrice('');
//   setImages([]);
//   setOperation(op);

//   if(op === 1){
//     setTitle('Registrar Producto')

//   } 
//   else if(op === 2){
//     setTitle('Editar Producto')
//     setId(id);
//     setName(name);
//     setDescription(description);
//     setPrice(price);
//     setImages(images ? [images] : []);
//   }
 
// }

// const validar = () => {
//   var parameters;
//   if (name.trim() === "") {
//     show_alert("Recuerda agregar el nombre del producto", "warning");
//   } else if (description.trim() === "") {
//     show_alert("Recuerda agregar la descripción del producto", "warning");
//   } else if (images.length === 0 && operation === 1) {
//     show_alert("Recuerda agregar al menos una imagen del producto", "warning");
//   } else if (price.trim() === "") {
//     show_alert("Recuerda agregar el precio del producto", "warning");
//   } else {
//     if (operation === 1) {
//       parameters = {
//         ProductName: name.trim(),
//         ProductDescrip: description.trim(),
//         ProductPrice: price.trim(),
//       };
//       sendTOCREATE("POST", parameters);
//     } 
//     else if (operation === 2) {
//       parameters = {
//         _id: id,
//         ProductName: name.trim(),
//         ProductDescrip: description.trim(),
//         ProductPrice: price.trim(),
//       };
//       sendTOPATCH("PATCH", id, parameters);
//     }
//   }
// };

// const sendTOCREATE = async (method, parameters) => {
//   const formData = new FormData();

//   // Agregar los datos del producto al FormData
//   Object.keys(parameters).forEach((key) => {
//     formData.append(key, parameters[key]);
//   });

//   // Agregar las imágenes al FormData
//   images.forEach((image) => {
//     formData.append("images", image);
//   });

//   try {
//     const response = await axios({
//       method: method,
//       url: URL,
//       data: formData,
//       headers: {
//         "Content-Type": "multipart/form-data", // Importante para enviar archivos
//       },
//     });

//     show_alert(response.data.message, response.data.success ? "success" : "error");

//     if (response.data.success) {
//       const btnCerrar = document.getElementById("btnCerrar");
//       if (btnCerrar) {
//         btnCerrar.click(); // Cerrar el modal si el botón existe
//       } else {
//         console.error("El botón 'btnCerrar' no existe en el DOM.");
//       }
//       getProducts(); // Recargar la lista de productos
//     }
//   } catch (error) {
//     show_alert("ERROR EN LA SOLICITUD", "error");
//     console.log(error);
//   }
// };

// const sendTOPATCH = async (method, productId, parameters) => {
//   const formData = new FormData();

//   // Agregar los datos del producto al FormData
//   Object.keys(parameters).forEach((key) => {
//     if (key !== "images") { // Evitar agregar imágenes directamente como un campo
//       formData.append(key, parameters[key]);
//     }
//   });

//   // Agregar las imágenes al FormData (si hay nuevas imágenes)
//   if (images.length > 0) {
//     images.forEach((image) => {
//       formData.append("images", image); // Agregar cada imagen individualmente
//     });
//   }

//   try {
//     const response = await axios({
//       method: method,
//       url: `${URL}/${productId}`,
//       data: formData,
//       headers: {
//         "Content-Type": "multipart/form-data", // Importante para enviar archivos
//       },
//     });

//     show_alert(response.data.message, response.data.success ? "success" : "error");

//     if (response.data.success) {
//       const btnCerrar = document.getElementById("btnCerrar");
//       if (btnCerrar) {
//         btnCerrar.click(); // Cerrar el modal si el botón existe
//       } else {
//         console.error("El botón 'btnCerrar' no existe en el DOM.");
//       }
//       getProducts(); // Recargar la lista de productos
//     }
//   } catch (error) {
//     show_alert("ERROR EN LA SOLICITUD", "error");
//     console.log(error);
//   }
// };

// const sendTODELETE = async (method, productId) => {
//   await axios({ method: method, url: `${URL}/delete/${productId}` })
//     .then(function (response) {
//       var type = response.data.success;
//       var mensaje = response.data.message;

//       show_alert(mensaje, type ? "success" : "error");

//       if (type) {
//         const btnCerrar = document.getElementById("btnCerrar");
//         if (btnCerrar) {
//           btnCerrar.click(); // Cerrar el modal si el botón existe
//         } else {
//           console.error("El botón 'btnCerrar' no existe en el DOM.");
//         }
//         getProducts(); // Recargar productos
//       }
//     })
//     .catch(function (error) {
//       show_alert("ERROR EN LA SOLICITUD", "error");
//       console.log(error);
//     });
// };
// const deleteProduct = (id, name) => {
//   MySwal.fire({
//     title: "¿Seguro de eliminar a " + name + "?",
//     icon: "question",
//     text: "No se podrá dar marcha atrás",
//     showCancelButton: true,
//     confirmButtonText: "Si, eliminar",
//     cancelButtonText: "Cancelar",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       setId(id);
//       sendTODELETE("DELETE", id);
//     }
//   });
// };


// const handleModalClose = () => {
//   const modal = document.getElementById('modalProducts');
//   modal.setAttribute('inert', '');
//   setTimeout(() => {
//     modal.removeAttribute('inert');
//   }, 500); // Tiempo para evitar errores al cerrar
// };

// const handleSearch = () => {
//   if (searchTerm.trim() === '') {
//     setFilteredData(data); // Si está vacío, muestra todos los productos
//   } else {
//     const filtered = data.filter((product) => {
//       // Verifica que el producto y sus propiedades existan
//       if (
//         product &&
//         product.ProductName &&
//         product._id &&
//         product.ProductDescrip
//       ) {
//         return (
//           product.ProductName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           product._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           product.ProductDescrip.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       }
//       // Si el producto no tiene las propiedades necesarias, no lo incluyas en los resultados
//       return false;
//     });
//     setFilteredData(filtered);
//   }
// };

// const handleDeleteImage = async (productId, imageId, index) => {
//   const isDeleted = await deleteImageFromAPI(productId, imageId);

//   if (isDeleted) {
//     // Si la imagen se eliminó correctamente del API, actualiza el estado local
//     const newImages = [...images];
//     newImages.splice(index, 1); // Elimina la imagen del estado local
//     setImages(newImages);
//   }
// };

// const deleteImageFromAPI = async (productId, imageId) => {
//   try {
//     const response = await axios.delete(
//       `http://localhost:5000/products/${productId}/images/${imageId}`
//     );

//     if (response.data.success) {
//       show_alert("Imagen eliminada correctamente", "success");
//       return true; // Indica que la eliminación fue exitosa
//     } else {
//       show_alert("Error al eliminar la imagen", "error");
//       return false; // Indica que hubo un error
//     }
//   } catch (error) {
//     console.error("Error al eliminar la imagen:", error);
//     show_alert("Error al eliminar la imagen", "error");
//     return false; // Indica que hubo un error
//   }
// };

//   return (  
//     <div>
//   {/* CONTAINER */}
//   {userDetails ? (
//     <>
//       <div className="container mt-4">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           {/* 🔹 Botones de Retroceso y Menú Principal */}
//           <div className="d-flex gap-2">
//             <button
//               className="btn btn-primary d-flex align-items-center justify-content-center"
//               style={{ width: "40px", height: "40px" }}
//               onClick={() => navigate("/")}
//             >
//               <i className="fa-solid fa-home"></i>
//             </button>
//           </div>

//           <h3 className="text-dark m-0">Hola {userDetails.name}</h3>

//           <div className="input-group w-50">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Buscar producto..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button className="btn btn-dark" onClick={handleSearch}>
//               <i className="fa-solid fa-search me-1"></i> Buscar
//             </button>
//           </div>

//           <button
//             onClick={() => openModal(1)}
//             className=".buton_A btn btn-dark d-flex align-items-center"
//             data-bs-toggle="modal"
//             data-bs-target="#modalProducts"
//           >
//             <i className="fa-solid fa-circle-plus me-2"></i> Añadir Producto
//           </button>

//           <AdminButton />
//         </div>

//         {/* TABLE RESPONSIVE */}
//         <div className="table-responsive">
//           <table className="table table-striped table-hover table-bordered">
//             <thead className="table-dark text-center">
//               <tr>
//                 <th>#</th>
//                 <th>Imagen</th>
//                 <th>Nombre</th>
//                 <th>Precio</th>
//                 <th>Descripción</th>
//                 <th>Status</th>
//                 <th>Acciones</th>
//               </tr>
//             </thead>
//             <tbody className="align-middle text-center">
//               {filteredData.length > 0 ? (
//                 filteredData.map((product, i) => (
//                   <tr key={product._id}>
//                     <td>{i + 1}</td>
//                     <td>
//                       <img
//                         src={product?.images?.[0] || "https://via.placeholder.com/80"}
//                         alt="Producto"
//                         className="img-fluid rounded"
//                         style={{ maxWidth: "80px", height: "auto" }}
//                       />
//                     </td>
//                     <td>{product?.ProductName}</td>
//                     <td>
//                       {new Intl.NumberFormat("es-MX", {
//                         style: "currency",
//                         currency: "MXN",
//                       }).format(product?.ProductPrice)}
//                     </td>
//                     <td className="text-truncate" style={{ maxWidth: "200px" }}>
//                       {product?.ProductDescrip}
//                     </td>
//                     <td>
//                       <span
//                         className={`badge ${
//                           product?.Status === "Disponible" ? "bg-success" : "bg-danger"
//                         }`}
//                       >
//                         {product?.Status}
//                       </span>
//                     </td>
//                     <td>
//                      <button
//                         onClick={() => openModal(2, product._id, product.ProductName, product.ProductDescrip, product.ProductPrice, product.images)}
//                         className="btn btn-sm btn-warning"
//                          data-bs-toggle="modal"
//                         data-bs-target="#modalProducts"
//                       >
//                         <i className="fa-solid fa-pencil"></i>
//                       </button>

//                       <button
//                         onClick={() => deleteProduct(product._id, product.ProductName)}
//                         className="btn btn-sm btn-danger"
//                       >
//                         <i className="fa-solid fa-trash"></i>
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="text-center text-muted">
//                     No hay productos disponibles
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* POP OUT WINDOWS */}
//         <div
//   id="modalProducts"
//   className="modal fade"
//   tabIndex="-1"
//   aria-hidden="true"
// >
//   <div className="modal-dialog modal-lg">
//     <div className="modal-content">
//       {/* Encabezado del modal */}
//       <div className="modal-header bg-light">
//         <h5 className="modal-title">{title}</h5>
//         <button
//           type="button"
//           className="btn-close"
//           data-bs-dismiss="modal"
//           aria-label="Close"
//           onClick={handleModalClose}
//         ></button>
//       </div>

//       {/* Cuerpo del modal */}
//       <div className="modal-body">
//         <div className="container-fluid">
//           {/* Fila para el nombre y el precio */}
//           <div className="row mb-4">
//             <div className="col-md-6 mb-3">
//               <div className="input-group">
//                 <span className="input-group-text bg-white border-end-0">
//                   <FaGift className="text-primary" />
//                 </span>
//                 <input
//                   type="text"
//                   id="ProductName"
//                   className="form-control border-start-0"
//                   placeholder="Nombre"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   style={{ borderRadius: "0 8px 8px 0" }}
//                 />
//               </div>
//             </div>
//             <div className="col-md-6 mb-3">
//               <div className="input-group">
//                 <span className="input-group-text bg-white border-end-0">
//                   <FaDollarSign className="text-primary" />
//                 </span>
//                 <input
//                   type="text"
//                   id="ProductPrice"
//                   className="form-control border-start-0"
//                   placeholder="Precio"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   style={{ borderRadius: "0 8px 8px 0" }}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Fila para la selección de imágenes */}
//           <div className="row mb-4 justify-content-center">
//             <div className="col-12 col-md-8">
//               <div className="input-group">
//                 <span className="input-group-text bg-white border-end-0">
//                   <FaImages className="text-primary" />
//                 </span>
//                 <input
//                   type="file"
//                   multiple
//                   onChange={handleImageChange}
//                   accept="image/*"
//                   className="form-control border-start-0"
//                   required
//                   style={{ borderRadius: "0 8px 8px 0" }}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Mostrar imágenes existentes si op === 2 (editar) */}
//           {operation === 2 && images.length > 0 && (
//   <div className="row mb-4 justify-content-center">
//     <div className="col-12 col-md-8">
//       <h6>Imágenes existentes:</h6>
//       <div className="d-flex flex-wrap gap-2">
//         {images.map((image, index) => {
//           // Generamos la URL dependiendo del tipo de imagen
//           let imageUrl;
          
//           if (typeof image === "string") {
//             // Si es string, puede ser el nombre del archivo o URL completa
//             if (image.startsWith('http') || image.startsWith('/')) {
//               imageUrl = image;
//             } else {
//               // Asumimos que es el nombre del archivo y construimos la URL
//               imageUrl = `${API_BASE_URL}/images/${image}`;
//             }
//           } else if (image instanceof File || image instanceof Blob) {
//             imageUrl = URL.createObjectURL(image);
//           } else {
//             imageUrl = "";
//           }

//           return (
//             <div key={index} className="position-relative">
//               <img
//                 src={imageUrl}
//                 alt={`Imagen ${index + 1}`}
//                 className="img-thumbnail"
//                 style={{ width: "100px", height: "100px", objectFit: "cover" }}
//               />
//               {/* Opcional: Botón para eliminar imagen */}
//               <button
//                 className="position-absolute top-0 end-0 btn btn-danger btn-sm"
//                 style={{ transform: 'translate(30%, -30%)' }}
//                 onClick={() => handleDeleteImage(index)}
//               >
//                 &times;
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   </div>
// )}

//           {/* Fila para la descripción */}
//           <div className="row mb-4 justify-content-center">
//             <div className="col-12 col-md-8">
//               <div className="input-group">
//                 <div>
//                   <ExpansiveTextarea
//                     value={description} // Valor actual de la descripción
//                     onChange={(e) => setDescription(e.target.value)} // Actualiza el estado
//                     placeholder="Ingresa la Descripción del Producto"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Pie del modal */}
//       <div className="modal-footer bg-light">
//         <button
//           type="button"
//           className="btn btn-outline-secondary"
//           data-bs-dismiss="modal"
//           onClick={handleModalClose}
//         >
//           Cerrar
//         </button>
//         <button
//           type="button"
//           className="btn btn-primary"
//           onClick={validar}
//         >
//           <FaSave className="me-2" /> Guardar
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
        
//       </div>
//     </>
//   ) : (
//     <p>Loading....</p>
//   )}
// </div>
//   )}

// export default Crudam;


import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import AdminButton from "../components/AdminButton";
import ExpansiveTextarea from '../components/ExpansiveTextarea.jsx';
import { FaGift, FaDollarSign, FaImages, FaSave } from "react-icons/fa";
import { show_alert } from '../functions';

const API_BASE_URL = 'http://localhost:5000';
const PRODUCTS_API_URL = `${API_BASE_URL}/product`;
const MySwal = withReactContent(Swal);

const Crudam = () => {
  // Estados organizados
  const [state, setState] = useState({
    // Datos del producto
    product: {
      id: '',
      name: '',
      description: '',
      price: '',
      images: []
    },
    // Estado de la UI
    ui: {
      operation: 1,
      title: '',
      searchTerm: '',
      userDetails: null,
      isLoading: true
    },
    // Datos de productos
    data: {
      products: [],
      filteredProducts: []
    }
  });

  const navigate = useNavigate();

  // Obtener datos del usuario
  const fetchUserData = useCallback(async () => {
    try {
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          show_alert('Usuario no está logeado', 'error');
          setState(prev => ({...prev, ui: {...prev.ui, isLoading: false}}));
          return;
        }
        
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setState(prev => ({
            ...prev,
            ui: {
              ...prev.ui,
              userDetails: docSnap.data(),
              isLoading: false
            }
          }));
        } else {
          show_alert('Datos de usuario no encontrados', 'error');
          setState(prev => ({...prev, ui: {...prev.ui, isLoading: false}}));
        }
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      setState(prev => ({...prev, ui: {...prev.ui, isLoading: false}}));
    }
  }, []);

  // Obtener productos
  const getProducts = useCallback(async () => {
    try {
      const response = await axios.get(PRODUCTS_API_URL);
      setState(prev => ({
        ...prev,
        data: {
          products: response.data.data,
          filteredProducts: response.data.data
        }
      }));
    } catch (error) {
      console.error("Error al obtener productos:", error);
      show_alert('Error al cargar productos', 'error');
    }
  }, []);

  // Cargar imágenes del producto
  const loadProductImages = async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/images/product/${productId}`);
      
      if (!response.ok) {
        setState(prev => ({
          ...prev,
          product: {
            ...prev.product,
            images: []
          }
        }));
        return;
      }
      
      const imageUrls = await response.json();
      setState(prev => ({
        ...prev,
        product: {
          ...prev.product,
          images: imageUrls
        }
      }));
    } catch (error) {
      console.error('Error cargando imágenes:', error);
      setState(prev => ({
        ...prev,
        product: {
          ...prev.product,
          images: []
        }
      }));
    }
  };

  // Manejadores de eventos
  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);
    setState(prev => ({
      ...prev,
      product: {
        ...prev.product,
        images: [...prev.product.images, ...newImages]
      }
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setState(prev => ({
      ...prev,
      product: {
        ...prev.product,
        [id]: value
      }
    }));
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setState(prev => ({
      ...prev,
      ui: {
        ...prev.ui,
        searchTerm
      },
      data: {
        ...prev.data,
        filteredProducts: prev.data.products.filter(product => 
          product.ProductName.toLowerCase().includes(searchTerm) ||
          product.ProductDescrip.toLowerCase().includes(searchTerm) ||
          product._id.toLowerCase().includes(searchTerm)
        )
      }
    }));
  };

  // Operaciones CRUD
  const handleProductOperation = async (method, productId, data) => {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'images') formData.append(key, value);
    });
    
    if (state.product.images.length > 0) {
      state.product.images.forEach(image => {
        if (image instanceof File || image instanceof Blob) {
          formData.append('images', image);
        }
      });
    }
    
    try {
      const url = method === 'POST' ? PRODUCTS_API_URL : `${PRODUCTS_API_URL}/${productId}`;
      const response = await axios({
        method,
        url,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
      });
      
      handleOperationResponse(response);
    } catch (error) {
      console.error('Error en la operación:', error);
      show_alert('Error al procesar la solicitud', 'error');
    }
  };

  const handleOperationResponse = (response) => {
    show_alert(response.data.message, response.data.success ? 'success' : 'error');
    
    if (response.data.success) {
      document.getElementById('btnCerrar')?.click();
      getProducts();
    }
  };

  // Modal y validación
  const openModal = (operation, product = null) => {
    setState(prev => ({
      ...prev,
      product: {
        id: product?._id || '',
        name: product?.ProductName || '',
        description: product?.ProductDescrip || '',
        price: product?.ProductPrice || '',
        images: product?.images ? [product.images] : []
      },
      ui: {
        ...prev.ui,
        operation,
        title: operation === 1 ? 'Registrar Producto' : 'Editar Producto'
      }
    }));
    
    if (operation === 2 && product?._id) {
      loadProductImages(product._id);
    }
  };

  const validateForm = () => {
    const { name, description, price, images } = state.product;
    const { operation } = state.ui;
    
    if (!name.trim()) return show_alert('Ingresa el nombre del producto', 'warning');
    if (!description.trim()) return show_alert('Ingresa la descripción del producto', 'warning');
    if (!price.trim()) return show_alert('Ingresa el precio del producto', 'warning');
    if (operation === 1 && images.length === 0) return show_alert('Agrega al menos una imagen', 'warning');
    
    const productData = {
      ProductName: name.trim(),
      ProductDescrip: description.trim(),
      ProductPrice: price.trim()
    };
    
    if (operation === 1) {
      handleProductOperation('POST', null, productData);
    } else {
      handleProductOperation('PATCH', state.product.id, {...productData, _id: state.product.id});
    }
  };

  // Eliminar producto
  const deleteProduct = (id, name) => {
    MySwal.fire({
      title: `¿Seguro de eliminar ${name}?`,
      icon: "question",
      text: "No se podrá dar marcha atrás",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${PRODUCTS_API_URL}/delete/${id}`)
          .then(response => {
            show_alert(response.data.message, response.data.success ? 'success' : 'error');
            if (response.data.success) getProducts();
          })
          .catch(error => {
            console.error("Error eliminando producto:", error);
            show_alert('Error al eliminar producto', 'error');
          });
      }
    });
  };

  //Eliminar imagen
  const handleDeleteImage = async (index) => {
    try {
      const imageToDelete = state.product.images[index];
      
      // Verificar si es una imagen existente (tiene URL del backend)
      if (typeof imageToDelete === 'string') {
        // Extraer el nombre del archivo de la URL
        const imageName = imageToDelete.split('/').pop();
        
        // Mostrar confirmación
        const result = await MySwal.fire({
          title: '¿Eliminar esta imagen?',
          text: "Esta acción no se puede deshacer",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        });
  
        if (result.isConfirmed) {
          // Enviar petición DELETE al endpoint correcto
          const response = await axios.delete(`${API_BASE_URL}/images/product/${imageName}`);
          
          if (response.data.success) {
            // Actualizar estado local
            const updatedImages = [...state.product.images];
            updatedImages.splice(index, 1);
            
            setState(prev => ({
              ...prev,
              product: {
                ...prev.product,
                images: updatedImages
              }
            }));
            
            show_alert('Imagen eliminada correctamente', 'success');
          } else {
            show_alert(response.data.message || 'Error al eliminar imagen', 'error');
          }
        }
      } else {
        // Si es una imagen nueva que no se ha subido aún
        const updatedImages = [...state.product.images];
        updatedImages.splice(index, 1);
        
        setState(prev => ({
          ...prev,
          product: {
            ...prev.product,
            images: updatedImages
          }
        }));
        
        show_alert('Imagen removida', 'success');
      }
    } catch (error) {
      console.error('Error al eliminar imagen:', error);
      
      let errorMessage = 'Error al eliminar la imagen';
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = 'La imagen no existe en el servidor';
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      show_alert(errorMessage, 'error');
    }
  };

  // Efectos
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (state.ui.userDetails) {
      getProducts();
    }
  }, [getProducts, state.ui.userDetails]);

  // Renderizado condicional
  if (state.ui.isLoading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!state.ui.userDetails) {
    return <div className="alert alert-danger mt-3">Acceso no autorizado</div>;
  }

  return (
    <div className="container mt-4">
      {/* Header y controles */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
            onClick={() => navigate("/")}
          >
            <i className="fa-solid fa-home"></i>
          </button>
        </div>

        <h3 className="text-dark m-0">Hola {state.ui.userDetails.name}</h3>

        <div className="input-group w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar producto..."
            value={state.ui.searchTerm}
            onChange={handleSearch}
          />
          <button className="btn btn-dark">
            <i className="fa-solid fa-search me-1"></i> Buscar
          </button>
        </div>

        <button
          onClick={() => openModal(1)}
          className=".buton_A btn btn-dark d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#modalProducts"
        >
          <i className="fa-solid fa-circle-plus me-2"></i> Añadir Producto
        </button>

        <AdminButton />
      </div>

      {/* Tabla de productos */}
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Status</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="align-middle text-center">
            {state.data.filteredProducts.length > 0 ? (
              state.data.filteredProducts.map((product, i) => (
                <tr key={product._id}>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={product?.images?.[0] || "https://via.placeholder.com/80"}
                      alt="Producto"
                      className="img-fluid rounded"
                      style={{ maxWidth: "80px", height: "auto" }}
                    />
                  </td>
                  <td>{product?.ProductName}</td>
                  <td>
                    {new Intl.NumberFormat("es-MX", {
                      style: "currency",
                      currency: "MXN",
                    }).format(product?.ProductPrice)}
                  </td>
                  <td className="text-truncate" style={{ maxWidth: "200px" }}>
                    {product?.ProductDescrip}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        product?.Status === "Disponible" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {product?.Status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => openModal(2, product)}
                      className="btn btn-sm btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#modalProducts"
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id, product.ProductName)}
                      className="btn btn-sm btn-danger ms-2"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No hay productos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de productos */}
      <div id="modalProducts" className="modal fade" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title">{state.ui.title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="btnCerrar"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row mb-4">
                  <div className="col-md-6 mb-3">
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <FaGift className="text-primary" />
                      </span>
                      <input
                        type="text"
                        id="name"
                        className="form-control border-start-0"
                        placeholder="Nombre"
                        value={state.product.name}
                        onChange={handleInputChange}
                        style={{ borderRadius: "0 8px 8px 0" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <FaDollarSign className="text-primary" />
                      </span>
                      <input
                        type="text"
                        id="price"
                        className="form-control border-start-0"
                        placeholder="Precio"
                        value={state.product.price}
                        onChange={handleInputChange}
                        style={{ borderRadius: "0 8px 8px 0" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-4 justify-content-center">
                  <div className="col-12 col-md-8">
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <FaImages className="text-primary" />
                      </span>
                      <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        accept="image/*"
                        className="form-control border-start-0"
                        required
                        style={{ borderRadius: "0 8px 8px 0" }}
                      />
                    </div>
                  </div>
                </div>

                {state.ui.operation === 2 && state.product.images.length > 0 && (
  <div className="row mb-4 justify-content-center">
    <div className="col-12 col-md-8">
      <h6>Imágenes existentes:</h6>
      <div className="d-flex flex-wrap gap-2">
        {state.product.images.map((image, index) => {
          const imageUrl = typeof image === "string" 
            ? (image.startsWith('http') || image.startsWith('/') 
              ? image 
              : `${API_BASE_URL}/images/${image}`
            ) : (image instanceof File || image instanceof Blob) 
              ? URL.createObjectURL(image) 
              : "";
          
          return (
            <div key={index} className="position-relative">
              <img
                src={imageUrl}
                alt={`Imagen ${index + 1}`}
                className="img-thumbnail"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              {/* Botón para eliminar imagen */}
              <button
                className="position-absolute top-0 end-0 btn btn-danger btn-sm p-0"
                style={{ 
                  width: "24px", 
                  height: "24px",
                  transform: 'translate(30%, -30%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteImage(index);
                }}
                title="Eliminar imagen"
              >
                                &times;
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                <div className="row mb-4 justify-content-center">
                  <div className="col-12 col-md-8">
                    <ExpansiveTextarea
                      value={state.product.description}
                      onChange={(e) => setState(prev => ({
                        ...prev,
                        product: {
                          ...prev.product,
                          description: e.target.value
                        }
                      }))}
                      placeholder="Ingresa la Descripción del Producto"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer bg-light">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={validateForm}
              >
                <FaSave className="me-2" /> Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crudam;
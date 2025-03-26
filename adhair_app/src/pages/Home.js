import Container from '../components/Conteiner';
import Card from '../components/Card';
import Header from "../components/Header";
import Footer from "../components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const URL = 'http://localhost:5000/product';

function Home() {
  const [data, setData] = useState([]); // Inicializamos como un array vacío
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [filteredData, setFilteredData] = useState([]); // Estado para los productos filtrados

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        console.log(response.data); // Para depuración
        setData(response.data.data); // Guardamos solo el array `data`
        setFilteredData(response.data.data); // Inicialmente, mostrar todos los productos
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe
    const filtered = data.filter((product) =>
      product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="App">
      <Header />
      {/* Barra de búsqueda */}
      <div className="search-bar">
        <form onSubmit={handleSearch} className="d-flex justify-content-center my-4">
          <input
            type="text"
            placeholder="Buscar por nombre del producto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control w-50"
          />
          <button type="submit" className="btn btn-dark ms-2">
          <i class="fa-solid fa-magnifying-glass"></i> Buscar
          </button>
        </form>
      </div>

      <Container>
        {filteredData.length === 0 ? (
          <p>No se encontraron productos.</p>
        ) : (
          filteredData.map((product, i) => (
            <Card
              key={product._id}
              productId={product._id}
              name={product.ProductName}
              images={product.images}
              description={product.ProductDescrip}
              price={product.ProductPrice}
            />
          ))
        )}
      </Container>
      <hr className="my-4 border-gray-400" />
      <Footer />
    </div>
  );
}

export default Home;
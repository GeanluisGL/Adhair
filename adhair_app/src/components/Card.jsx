import React from "react";
import { Link } from "react-router-dom";
import './Style/Card.css';

const Card = ({ productId, name, images, price }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex justify-content-center">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        <div className="card-image-container">
          <div id={`carousel-${productId}`} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {images.map((image, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <Link to={`/product/${productId}`}>
                    <img
                      src={image}
                      className="d-block w-100 card-img-top"
                      alt={`${name} ${index + 1}`}
                    />
                  </Link>
                </div>
              ))}
            </div>
            {/* Controles del carrusel */}
            {images.length > 1 && (
              <>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target={`#carousel-${productId}`}
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target={`#carousel-${productId}`}
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="card-body">
          <p className="text-muted">
            Price: <span className="fw-bold">${price}</span>
          </p>
          <Link to={`/product/${productId}`} className="btn btn-transparent fw-bold">
            <h5 className="fw-bold">{name}</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
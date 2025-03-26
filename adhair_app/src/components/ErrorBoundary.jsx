import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el siguiente renderizado muestre la interfaz de respaldo.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores.
    console.error("Error capturado por ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier interfaz de respaldo.
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>¡Algo salió mal!</h2>
          <p>Por favor, recarga la página o intenta nuevamente más tarde.</p>
          <details style={{ whiteSpace: "pre-wrap" }}>
            <summary>Detalles del error</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
        </div>
      );
    }

    // Si no hay error, renderiza los hijos normalmente.
    return this.props.children;
  }
}

export default ErrorBoundary;
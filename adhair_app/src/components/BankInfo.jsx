import React from 'react'

const BankInfo = () => {
  return (
       <div>
         {/* Nuevo div para "Cuenta de banco" */}
         <div className="form-group">
          <label>Cuenta de banco</label>
          <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
            <p style={{ margin: 0 }}>Banco: <strong>Nombre del Banco</strong></p>
            <p style={{ margin: 0 }}>Número de Cuenta: <strong>1234 5678 9012 3456</strong></p>
            <p style={{ margin: 0 }}>Titular: <strong>Nombre del Titular</strong></p>
          </div>
        </div>
        </div>
  )
}

export default BankInfo
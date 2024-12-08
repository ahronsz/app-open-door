import React, { useState } from 'react';
import './index.css';

const LAMBDA_API_URL = import.meta.env.VITE_LAMBDA_API_URL;

const App = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = e.target.elements.code.value;
        setMessage('Procesando...');

        try {
            const response = await fetch(LAMBDA_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();
            if (data.success) {
                setMessage('¡Puerta abierta con éxito!');
            } else {
                setMessage(data.error || 'Ocurrió un error.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error de comunicación con el servidor.');
        }
    };

    return (
        <div className="custom-bg d-flex flex-column justify-content-center align-items-center min-vh-100">
            <div className="container text-center mt-n3">
                <img
                    src="src/assets/airbnb-logo.png"
                    alt="Logo"
                    className="img-fluid mb-4"
                    style={{ maxWidth: '250px' }}
                />
                <div className="row justify-content-center">
                    <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group input-group-lg mb-3">
                                <span className="input-group-text">Código</span>
                                <input
                                    name="code"
                                    placeholder="Ingrese código"
                                    type="number"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn custom-bt w-100 fs-4 text-white fw-bolder">
                                Abrir Puerta
                            </button>
                        </form>
                        <p className="mt-3 text-white fs-4 font-monospace">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;

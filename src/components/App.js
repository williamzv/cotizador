import React, { Component } from 'react';
import './App';
import Header from './header/Header';
import Formulario from './formulario/Formulario';
import Resumen from './resumen/Resumen';
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from './helper';
import Footer from './footer/Footer';

class App extends Component {

    state = {
        resultado: '',
        datos: {}
    };

    cotizarSeguro = (datos) => {
        const {marca, plan, year} = datos;
        
        // Agrear una base de seguro de 2000;
        let resultado = 2000;
        // Obtener la diferencia de años y por cada año restar el 3% al valor del seguro.
        const difAnno = obtenerDiferenciaAnio(year);
        resultado -= ((difAnno * 3) * resultado) / 100;

        // Americano 15%, Asiatico 5%, Europeo 30% de incremento al valor actual.
        resultado = calcularMarca(marca) * resultado;

        // El plan básico incrementa el valor en 20% y el completo en 50%
        let incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

        // Crear objeto para el resumen
        const datosAuto = {marca, plan, year};

        this.setState({
            datos: datosAuto,
            resultado
        });
    }
    render() {
        return (
            <div className="contenedor">
                <Header titulo= 'Cotizador de Seguro de Automovil' />                    
                <div className="contenedor-formulario">
                    <Formulario cotizarSeguro={this.cotizarSeguro} />                    
                    <Resumen datos={this.state.datos} resultado={this.state.resultado} />
                    <Footer resultado={this.state.resultado}/>
                </div>
            </div>
        );
    }
}

export default App;
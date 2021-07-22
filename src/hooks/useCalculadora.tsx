import { useRef, useState } from "react";
import { Alert } from "react-native";

enum Operadores{
  sumar, restar, muultiplicar, dividir
}

export const useCalculadora = () => {
  const [numero, setNumero] = useState('0');
  const [numeroAnterior, setNumeroAnterior] = useState('0')
  const ultimaOperacion = useRef<Operadores>();

  const limpiar = () => {
    setNumero('0');
    setNumeroAnterior('0');
  }

  const armarNumero = (numeroTexto:string) => {
    //No aceptar doble punto
    if(numero.includes('.') && numeroTexto === '.') return;

    if(numero.startsWith('0') || numero.startsWith('-0')){

      //Punto Decimal
      if(numeroTexto==='.'){
        setNumero( numero + numeroTexto )

        //evluar si es otro ceo y hay un punto
      }else if(numeroTexto==='0' && numero.includes('.')){
        setNumero( numero + numeroTexto);

        //evaluar si es diferente de cero y no tiene un punto
      }else if(numeroTexto !== '0' && !numero.includes('.') ){
        setNumero(numeroTexto);

        //evitar 00000.0
      }else if( numeroTexto === '0' && !numero.includes('.') ){
        setNumero(numero)
      }else{
        setNumero(numero+numeroTexto)
      }

    }else{
      
      setNumero(numero+numeroTexto)
    }

  }

  const positivoNegativo = ( ) => {
    if(numero.includes('-')){
      setNumero( numero.replace('-','') )
    }else{
      setNumero('-' + numero)
    }
  }

  const btnDelete = () => {
    if( numero.length -1 === 0 || (numero.length === 2 && numero.includes('-')) ){
      setNumero('0')
    }else{
      const newNum = numero.substr(0, numero.length -1)
      setNumero(newNum);
    }
  }

  const cambiarNumPorAnt = () => {
    if(numero.endsWith('.')){
      setNumeroAnterior(numero.slice(0,-1))
    }else{
      setNumeroAnterior(numero)
    }
    setNumero('0')
  }

  const btnDividir = () => {
    cambiarNumPorAnt()
    ultimaOperacion.current = Operadores.dividir
  }

  const btnMultiplicar = () => {
    cambiarNumPorAnt()
    ultimaOperacion.current = Operadores.muultiplicar
  }
  
  const btnRestar = () => {
    cambiarNumPorAnt()
    ultimaOperacion.current = Operadores.restar
  }

  const btnSumar = () => {
    cambiarNumPorAnt()
    ultimaOperacion.current = Operadores.sumar
  }

  const calcular = () => {
    
    const num1 = Number(numero)
    const num2 = Number(numeroAnterior);

    if ( numeroAnterior === '0' ) return ;

    switch ( ultimaOperacion.current ) {
      case Operadores.sumar:
        setNumero(`${ num1 + num2 }`);
        break;
      case Operadores.restar:
        setNumero(`${ num2 - num1 }`);
        break;
      case Operadores.muultiplicar:
        setNumero(`${ num1 * num2 }`);
        break;
      case Operadores.dividir:
        const result = num2 / num1;
          if (!isFinite(result)) {
            Alert.alert('Error', 'No es posible dividir entre 0', [ {text: "OK"}])
          } else {
            setNumero(`${(result)}`);      
          }
        
        break;
    }
    setNumeroAnterior('0')
  }

  return { 
    numero,
    numeroAnterior,
    limpiar,
    armarNumero,
    positivoNegativo,
    btnDelete,
    btnDividir,
    btnMultiplicar,
    btnRestar,
    btnSumar,
    calcular,
  }
}

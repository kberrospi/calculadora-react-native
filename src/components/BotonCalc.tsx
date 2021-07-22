import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../theme/appTheme';

interface Props {
  texto: string,
  color?: string,
  ancho?: boolean,
  action: ( numeroTexto: string ) => void;
}

export const BotonCalc = ({ texto, color ='#2D2D2D', ancho, action }:Props) => {
  return (
    <TouchableOpacity
      onPress={ () =>  action(texto) }
    >
      <View style={{ 
        ...styles.boton, 
        backgroundColor: color,
        width: ( ancho ) ? 180 : 80
      }}>
        <Text style={{ 
          ...styles.botonTexto,
          color: (color === '#9B9B9B') ? 'black' : 'white'

        }}
          >
            { texto }
          </Text>
      </View>
    </TouchableOpacity>
  )
}
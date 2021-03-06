import React from 'react'

/*
SPECTRUM
#FF0000
#F90406
#F2080D
#EC0B13
#E60F19
#DF1320
#D91726
#D31A2C
#CC1E33
#C62239
#C0263F
#BA2A45
#B32D4C
#AD3152
#A73558
#A1395E
#9A3C65
#94406B
#94416B
#8E4471
#884777
#834B7C
#7D4E82
#775288
#72558E
#6C5893
#665C99
#605F9F
#5B63A4
#5566AA
#4F69B0
#4A6DB5
#4470BB
#3E74C1
#3977C7
#337ACC
#2D7ED2
#2781D8
#2285DD
#1C88E3
#198AE6
#168BE9
#148DEB
#118FEE
#0E91F1
#0B92F4
#0894F7
#0696F9
#0397FC
#0099FF
*/

let spectrum = [
  '#FF0000',
  '#F90406',
  '#F2080D',
  '#EC0B13',
  '#E60F19',
  '#DF1320',
  '#D91726',
  '#D31A2C',
  '#CC1E33',
  '#C62239',
  '#C0263F',
  '#BA2A45',
  '#B32D4C',
  '#AD3152',
  '#A73558',
  '#A1395E',
  '#9A3C65',
  '#94406B',
  '#94416B',
  '#8E4471',
  '#884777',
  '#834B7C',
  '#7D4E82',
  '#775288',
  '#72558E',
  '#6C5893',
  '#665C99',
  '#605F9F',
  '#5B63A4',
  '#5566AA',
  '#4F69B0',
  '#4A6DB5',
  '#4470BB',
  '#3E74C1',
  '#3977C7',
  '#337ACC',
  '#2D7ED2',
  '#2781D8',
  '#2285DD',
  '#1C88E3',
  '#198AE6',
  '#168BE9',
  '#148DEB',
  '#118FEE',
  '#0E91F1',
  '#0B92F4',
  '#0894F7',
  '#0696F9',
  '#0397FC',
  '#0099FF',
]

export const chartTitle = text => {
  const formattedGradient = spectrum.reduce((acc, element, index, array) => {
    if (index === array.length - 1) {
      return `${acc}, ${element})`
    } else if (index === 0) {
      return `${acc}${element}`
    } else {
      return `${acc}, ${element}`
    }
  }, `-webkit-linear-gradient(`)
  return (
    <p
      style={{
        background: formattedGradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {text}
    </p>
  )
}

export const assignColor = rank => {
  return <p style={{ color: spectrum[rank - 1] }}>{rank}</p>
}

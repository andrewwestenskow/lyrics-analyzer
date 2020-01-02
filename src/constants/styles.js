export const drawerBodyStyle = {
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  color: 'white',
}

export const outerDrawerStyle = {
  backgroundImage: `linear-gradient(
    to bottom,
    rgb(25, 25, 25) 25%,
    rgba(25, 25, 25, 0.8)
  )`,
}

export const smallTableHold = isDesktop => {
  return {
    padding: 0,
    minHeight: isDesktop ? '25vw' : '50vw',
    width: isDesktop && '25vw',
    margin: 0,
  }
}

export const smallChartHold = isDesktop => {
  return {
    height: isDesktop ? '25vw' : '50vh',
    width: isDesktop && '25vw',
  }
}

export const largeChartHold = isDesktop => {
  return {
    height: isDesktop ? '25vw' : '50vh',
    width: isDesktop && '50vw',
  }
}

export const halfChartHold = isDesktop => {
  return {
    height: isDesktop ? '25vw' : '50vh',
    width: isDesktop && '45vw',
  }
}

export const halfTableHold = isDesktop => {
  return {
    padding: 0,
    minHeight: isDesktop ? '25vw' : '50vw',
    width: isDesktop && '45vw',
    margin: 0,
  }
}

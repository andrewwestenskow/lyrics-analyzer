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
  console.log(isDesktop)
  return {
    padding: 0,
    minHeight: isDesktop ? '25vw' : '50vw',
    width: isDesktop && '25vw',
    margin: 0,
  }
}

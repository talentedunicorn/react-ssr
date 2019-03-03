import React from 'react'

const Header = ({type, title}) => {
  switch(type) {
    case "1":
      return <h1>{title}</h1>
    case "2":
      return <h2>{title}</h2>
    case "3":
      return <h3>{title}</h3>
    default:
      return null
  }
}

export default Header

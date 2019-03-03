import React from 'react'

const Layout = props => 
  <main className="wrapper">
    <header>{ props.header() }</header>
    <section>{ props.content() }</section>
  </main>

export default Layout

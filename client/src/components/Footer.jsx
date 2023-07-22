import React from 'react'
import { Container } from 'react-bootstrap'

function Footer() {
  return (
    <div>
        <Container fluid style={{background: "linear-gradient(to right, #EC7AB7, #EC7A7A)", bottom: 0, zIndex: 100 }} className="p-3 position-absolute">
        </Container>
    </div>
  )
}

export default Footer
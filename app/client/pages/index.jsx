import React, { Component } from 'react'
import { Container, Navbar, NavbarBrand } from 'reactstrap'

class Index extends Component {
  render () {
    const { children } = this.props
    console.log(process.env.TEST_CONFIG)
    return (
      <div className='body'>
        <Navbar dark color='primary' expand='lg'>
          <Container>
            <NavbarBrand href='#'>Ryzen Example</NavbarBrand>
          </Container>
        </Navbar>
        <Container className='mt-4 position-relative'> Haha hehe </Container>
        {children}
      </div>
    )
  }
}

export default Index

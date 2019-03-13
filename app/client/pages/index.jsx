import React, { Component } from 'react'
import { withIntl } from '../lib/helper'
import { Container, Navbar, NavbarBrand } from 'reactstrap'

class Index extends Component {
  render () {
    const { children, t } = this.props
    console.log(process.env.TEST_CONFIG)
    return (
      <div className='body'>
        <Navbar dark color='primary' expand='lg'>
          <Container>
            <NavbarBrand href='#'>Ryzen Example</NavbarBrand>
          </Container>
        </Navbar>
        <Container className='mt-4 position-relative'>{t('hello')}</Container>
        {children}
      </div>
    )
  }
}

export default withIntl(Index)

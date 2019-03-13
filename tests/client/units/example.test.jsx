import { shallow } from 'enzyme'
import React from 'react'
const { describe, it, expect } = global
class Example extends React.Component {
  render () {
    return <p>Hello World!</p>
  }
}

describe('With Enzyme', () => {
  it('App shows "Hello world!"', () => {
    const app = shallow(<Example />)
    expect(app.find('p').text()).toEqual('Hello World!')
  })
})

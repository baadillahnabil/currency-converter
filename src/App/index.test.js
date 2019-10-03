/* eslint-disable no-undef */

import React from 'react'
import { shallow } from 'enzyme'
import App from './index'

describe('App Component', () => {
  it('should render correctly', () => {
    const component = shallow(<App />)
    expect(component).toMatchSnapshot()
  })
})

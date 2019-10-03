/* eslint-disable no-undef */

import React from 'react'
import { shallow } from 'enzyme'

import Currency from './index'

describe('Currency Component', () => {
  it('should render correctly with all required props', () => {
    const component = shallow(
      <Currency
        rates={{}}
        inputAmount={0}
        selectedRates={{}}
        setSelectedRates={() => {}}
      />
    )
    expect(component).toMatchSnapshot()
  })
})

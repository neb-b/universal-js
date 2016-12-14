import { shallow } from 'enzyme'
import { expect } from 'chai'
import Login from '../../../../common/components/login'

describe('<Login />', () => {
  it('renders', () => {
    const wrapper = shallow(<Login />)
    expect(wrapper).to.have.length(1)
  })
})

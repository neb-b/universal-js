import { shallow } from 'enzyme'
import { expect } from 'chai'
import NotFound from '../../../../common/components/not-found'

describe('<NotFound />', () => {
  it('renders', () => {
    const wrapper = shallow(<NotFound />)
    expect(wrapper).to.have.length(1)
  })
})

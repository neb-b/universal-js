import { shallow } from 'enzyme'
import { expect } from 'chai'
import Home from '../../../../common/components/home'

describe('<Home />', () => {
  it('renders', () => {
    const wrapper = shallow(<Home />)
    expect(wrapper).to.have.length(1)
  })
});

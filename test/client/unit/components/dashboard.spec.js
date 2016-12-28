import { shallow } from 'enzyme'
import { expect } from 'chai'
import Dasboard from '../../../../common/components/dashboard'

const dashboard = {
  user: {
    club: {},
    events: []
  }
}

describe('<Dasboard />', () => {
  it('renders', () => {
    const wrapper = shallow(<Dasboard dashboard={dashboard} />)
    expect(wrapper).to.have.length(1)
  })
});

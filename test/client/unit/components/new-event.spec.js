import { shallow } from 'enzyme'
import { expect } from 'chai'
import NewEvent from '../../../../common/components/new-event.connected'

const account = {
  name: "",
  club: {}
}

describe('<NewEvent />', () => {
  it('renders', () => {
    const wrapper = shallow(<NewEvent account={account} />)
    expect(wrapper).to.have.length(1)
  })
});

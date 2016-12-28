import { shallow } from 'enzyme'
import { expect } from 'chai'
import Account from '../../../../common/components/account'

const account = {
  name: "",
  club: {}
}

describe('<Account />', () => {
  it('renders', () => {
    const wrapper = shallow(<Account account={account} />)
    expect(wrapper).to.have.length(1)
  })
});

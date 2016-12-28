import { shallow } from 'enzyme'
import { expect } from 'chai'
import Event from '../../../../common/components/event'

describe('<Event />', () => {
  it('renders', () => {
    const wrapper = shallow(<Event />)
    expect(wrapper).to.have.length(1)
  })
});

import React from 'react';
import InfoPanel from '../components/InfoPanel';
import * as AppContext from '../components/AppContext';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });
let contextValues;
let wrapper;

describe('<InfoPanel />', () => {
  beforeAll(() => {
    contextValues = {
      state: {
        currencySelected: 'USD',
        runningInstancesCost: 1,
        stoppedInstancesCost: 1,
      },
      dispatch: jest.fn(),
    };
    jest
      .spyOn(AppContext, 'useAppContext')
      .mockImplementation(() => contextValues);
    wrapper = mount(<InfoPanel />);
  });
  test('it renders with correct costs of running and stopped instances', () => {
    const runningInstancesCost = wrapper.find('.runningInstancesCost');
    const stoppedInstancesCost = wrapper.find('.stoppedInstancesCost');
    expect(runningInstancesCost).toHaveLength(1);
    expect(runningInstancesCost.first().text()).toBe('$ 1.00 / hr');
    expect(stoppedInstancesCost).toHaveLength(1);
    expect(stoppedInstancesCost.first().text()).toBe('$ 1.00 / hr');
  });
  test('currency toggler works as expected', () => {
    const currencyToggler = wrapper.find('Radio');
    expect(currencyToggler).toHaveLength(1);
    console.log(currencyToggler);
    currencyToggler.simulate('change', { target: { checked: false } });
    const runningInstancesCost = wrapper.find('.runningInstancesCost');
    // expect(runningInstancesCost.first().text()).toBe('$$ 1.00 / hr');
    // expect(currencyToggler.first().text()).toBe('USD');
  });
});

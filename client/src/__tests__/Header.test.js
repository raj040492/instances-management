import React from 'react';
import * as AppContext from '../components/AppContext';
import Header from '../components/Header';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
let contextValues;
let wrapper;

describe('<Header />', () => {
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
    wrapper = mount(<Header />);
  });
  test('it renders with correct costs of running and stopped instances', () => {
    const dashboard = wrapper.find('.dashboard');
    expect(dashboard.at(0).text()).toBe('Dashboard');
    wrapper.find('.logoutBtn').at(0).simulate('click');
  });
});

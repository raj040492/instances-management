import React from 'react';
import Instances from '../components/Instances';
import * as AppContext from '../components/AppContext';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });
let contextValues;
let wrapper;

describe('<Instances />', () => {
  beforeAll(() => {
    contextValues = {
      state: {
        allInstances: [
          {
            id: 1,
            name: 't2.micro',
            provider: 'aws',
            status: 'stopped',
            costPerHour: 0.0116,
          },
          {
            id: 2,
            name: 't2.large',
            provider: 'aws',
            status: 'running',
            costPerHour: 0.1856,
          },
          {
            id: 3,
            name: 'm5.large',
            provider: 'aws',
            status: 'stopped',
            costPerHour: 0.096,
          },
        ],
        currencySelected: 'USD',
        currencyToggled: false,
      },
      dispatch: jest.fn(),
    };
    jest
      .spyOn(AppContext, 'useAppContext')
      .mockImplementation(() => contextValues);
    wrapper = mount(<Instances />);
  });
  test('it renders Instances table', () => {
    const tableRow = wrapper.find('.instance__row');
    const actionButtonInFirstRow = tableRow.at(0).find('.instanceAction').at(0);
    actionButtonInFirstRow.simulate('click');
    wrapper.find('.stopInstance').at(2).simulate('click');
  });
  test('currency toggler works as expected', () => {});
});

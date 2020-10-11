import React from 'react';
import App from '../components/App';
import * as AppContext from '../components/AppContext';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });
let contextValues;
let wrapper;

describe('renders <App/>', () => {
  beforeAll(() => {
    contextValues = {
      state: {
        currencySelected: 'USD',
        currencyToggled: false,
      },
      dispatch: jest.fn(),
    };
    jest
      .spyOn(AppContext, 'useAppContext')
      .mockImplementation(() => contextValues);
    wrapper = mount(<App />);
  });
  test('it renders App', () => {});
});

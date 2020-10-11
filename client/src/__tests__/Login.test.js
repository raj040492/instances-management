import React from 'react';
import Login from '../components/Login';
import * as AppContext from '../components/AppContext';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });
let contextValues;
let wrapper;

describe('renders <Login/>', () => {
  beforeAll(() => {
    contextValues = {
      state: {
        showSignIn: true,
        showSignUp: true,
        inValidCredentials: true,
        email: 'user1@gmail.com',
        password: 'StrongPassword123',
        userAuthMessage: 'User not in database',
      },
      dispatch: jest.fn(),
    };
    jest
      .spyOn(AppContext, 'useAppContext')
      .mockImplementation(() => contextValues);
    wrapper = mount(<Login />);
  });
  test('it renders App', () => {
    const errorMessageSignUp = wrapper.find('.invalidCredentials__signUp');
    const errorMessageSignIn = wrapper.find('.invalidCredentials__signIn');
    expect(errorMessageSignUp.text()).toBe('User not in database');
    expect(errorMessageSignIn.text()).toBe('User not in database');
  });
  test('set userName and password', () => {
    const userInputEmail = wrapper.find('.email');
    const userInputPassword = wrapper.find('.password');
    userInputEmail
      .at(0)
      .props()
      .onChange({ target: { value: 'Hello' } });
    userInputPassword
      .at(0)
      .props()
      .onChange({ target: { value: 'World' } });
    userInputEmail
      .at(2)
      .props()
      .onChange({ target: { value: 'Hello' } });
    userInputPassword
      .at(2)
      .props()
      .onChange({ target: { value: 'World' } });
    userInputEmail.at(0).simulate('change');
    userInputPassword.at(0).simulate('change');
    userInputEmail.at(1).simulate('change');
    userInputPassword.at(1).simulate('change');
  });
  test('handle submission of login/sign', () => {
    wrapper.find('.signInSubmit').at(0).simulate('click');
    wrapper.find('.createAccountBtn').at(0).simulate('click');
    wrapper.find('.createAnAccount').at(0).simulate('click');
    wrapper.find('.signUpSubmit').at(0).simulate('click');
  });
});

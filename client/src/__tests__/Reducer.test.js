import { appReducer } from '../components/AppReducer';

describe('Testing the reducer of the whole App', () => {
  test('SHOW_SIGN_IN', () => {
    const initialState = {
      showSignIn: false,
    };
    const updateAction = { type: 'SHOW_SIGN_IN', value: true };
    const updatedState = appReducer(initialState, updateAction);
    expect(updatedState).toEqual({
      showSignIn: true,
    });
  });
  test('SET_INSTANCES', () => {
    const initialState = {
      allInstances: [1, 2, 3],
    };
    const updateAction = { type: 'SET_INSTANCES', value: [1, 2, 3, 4] };
    const updatedState = appReducer(initialState, updateAction);
    expect(updatedState).toEqual({
      allInstances: [1, 2, 3, 4],
    });
  });
  test('SET_USERNAME', () => {
    const initialState = {
      email: 'foo@bar.com',
    };
    const updateAction = { type: 'SET_USERNAME', value: 'foo@foo.com' };
    const updatedState = appReducer(initialState, updateAction);
    expect(updatedState).toEqual({
      email: 'foo@foo.com',
    });
  });
  test('SET_PASSWORD', () => {
    const initialState = {
      password: 'securePassword',
    };
    const updateAction = { type: 'SET_PASSWORD', value: 'unsecurePassword' };
    const updatedState = appReducer(initialState, updateAction);
    expect(updatedState).toEqual({
      password: 'unsecurePassword',
    });
  });
  test('SHOW_SIGN_UP', () => {
    const initialState = {
      showSignUp: false,
    };
    const updateAction = { type: 'SHOW_SIGN_UP', value: true };
    const updatedState = appReducer(initialState, updateAction);
    expect(updatedState).toEqual({
      showSignUp: true,
    });
  });
  test('CURRENCY_TOGGLED', () => {
    const initialState = {
      showSignUp: true,
      currencyToggled: 'USD',
    };
    const updateAction = { type: 'CURRENCY_TOGGLED', value: 'INR' };
    const updatedState = appReducer(initialState, updateAction);
    expect(updatedState).toEqual({
      showSignUp: true,
      currencyToggled: 'INR',
    });
  });
  test('TOGGLE_INSTANCE_STATUS', () => {
    const initialState = {
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
    };
    const updateAction = {
      type: 'TOGGLE_INSTANCE_STATUS',
      index: 1,
      newStatus: 'stopped',
    };
    const updatedState = appReducer(initialState, updateAction);
    expect(updatedState).toEqual({
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
          status: 'stopped',
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
    });
  });
  test('TOGGLE_CURRENCY', () => {
    const initialState = {
      currencySelected: 'USD',
    };
    const updateAction = { type: 'TOGGLE_CURRENCY', value: 'INR' };
    const updatedState = appReducer(initialState, updateAction);
    expect(updatedState).toEqual({
      currencySelected: 'INR',
    });
  });
  test('SHOW_INVALID_CREDENTIALS', () => {
    const initialState = {
      inValidCredentials: false,
      userAuthMessage: '',
    };
    const updateAction = {
      type: 'SHOW_INVALID_CREDENTIALS',
      value: true,
      userAuthMessage: 'User not registered',
    };
    const updatedState = appReducer(initialState, updateAction);
    expect(updatedState).toEqual({
      inValidCredentials: true,
      userAuthMessage: 'User not registered',
    });
  });
  test('SET_RUNNING_INSTANCES_COST', () => {
    const initialState = {
      runningInstancesCost: '0 USD',
    };
    const updateAction = {
      type: 'SET_RUNNING_INSTANCES_COST',
      value: '10 USD',
    };
    const updatedState = appReducer(initialState, updateAction);
    expect(updatedState).toEqual({
      runningInstancesCost: '10 USD',
    });
  });
  test('SET_STOPPED_INSTANCES_COST', () => {
    const initialState = {
      stoppedInstancesCost: '0 USD',
    };
    const updateAction = {
      type: 'SET_STOPPED_INSTANCES_COST',
      value: '10 USD',
    };
    const updatedState = appReducer(initialState, updateAction);
    expect(updatedState).toEqual({
      stoppedInstancesCost: '10 USD',
    });
  });
  test('USER_SIGNIN', () => {
    const initialState = {
      hasSignedIn: false,
    };
    const updateAction = {
      type: 'USER_SIGNIN',
      value: true,
    };
    const updatedState = appReducer(initialState, updateAction);
    expect(updatedState).toEqual({
      hasSignedIn: true,
    });
  });
  test('Invalid action type should throw error', () => {
    const initialState = {
      hasSignedIn: false,
    };
    const updateAction = {
      type: 'USER_SIGNINx',
      value: true,
    };
    try {
      const updatedState = appReducer(initialState, updateAction);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  });
});

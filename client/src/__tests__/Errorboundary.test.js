import React from 'react';
import Errorboundary from '../components/Errorboundary';
import Login from '../components/Login';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from 'enzyme';
import ErrorBoundary from '../components/Errorboundary';
configure({ adapter: new Adapter() });

describe('renders <Login/> inside Errorboundary', () => {
  it('renders Error Boundary', () => {
    const wrapper = shallow(
      <Errorboundary>
        <Login />
      </Errorboundary>
    );
    wrapper.setState({ errorMessage: true });
    expect(
      ErrorBoundary.getDerivedStateFromError('Something Went wrong')
    ).toEqual({
      errorMessage: 'Something Went wrong',
    });
  });
});

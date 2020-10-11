import React, { useReducer } from 'react';
import Instances from './Instances';
import Login from './Login';
import Header from './Header';
import InfoPanel from './InfoPanel';
import 'semantic-ui-css/semantic.min.css';
import { Row, Col } from 'react-flexbox-grid';
import ErrorBoundary from './ErrorBoundary';
import './App.css';
import AppContext from './AppContext';
import { appReducer } from './AppReducer';

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    allInstances: [],
    password: '',
    email: '',
    hasSignedIn: false,
    showSignUp: true,
    currencyToggled: false,
    runningInstancesCost: 0,
    stoppedInstancesCost: 0,
    showSignIn: false,
    currencySelected: 'USD',
    inValidCredentials: false,
    error: null,
  });

  return (
    <div className="App">
      <ErrorBoundary>
        <AppContext.Provider value={{ state, dispatch }}>
          {state.hasSignedIn && (
            <>
              <Header />
              <Row>
                <Col md={1} xs={0}></Col>
                <Col md={10} xs={12}>
                  <InfoPanel />
                </Col>
                <Col md={1}></Col>
              </Row>
              <Row>
                <Col md={1} xs={0}></Col>
                <Col md={10} xs={12}>
                  <Instances />
                </Col>
                <Col md={1}></Col>
              </Row>
            </>
          )}
          {!state.hasSignedIn && (
            <>
              <Row style={{ height: 100 }}></Row>
              <Login />
            </>
          )}
          {state.error && <p>Something went wrong ... ${state.error}</p>}
        </AppContext.Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;

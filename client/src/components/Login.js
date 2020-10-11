import React, { useContext } from 'react';
import axios from 'axios';
// import { AppContext } from './App';
import { useAppContext } from './AppContext';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Button, Card, Form, Input } from 'semantic-ui-react';

function Signin() {
  const { state, dispatch } = useAppContext();
  const createAccountHandler = () => {
    dispatch({
      type: 'SHOW_SIGN_IN',
      value: false,
    });
    dispatch({
      type: 'SHOW_SIGN_UP',
      value: true,
    });
    dispatch({ type: 'SHOW_INVALID_CREDENTIALS', value: false });
  };
  const handleSignIn = () => {
    const { email, password } = state;
    const data = { email, password };
    const url = `http://localhost:8080/api/login`;
    axios
      .post(url, data, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      })
      .then((response) => {
        console.log(`****`);
        console.log(response);
        if (!response.data.success) {
          dispatch({
            type: 'SHOW_INVALID_CREDENTIALS',
            value: true,
            userAuthMessage: response.data.message,
          });
        } else if (response.data.success) {
          dispatch({
            type: 'SHOW_INVALID_CREDENTIALS',
            value: false,
          });
          dispatch({ type: 'USER_SIGNIN', value: true });
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <Grid>
      <Row>
        <Col md={3}></Col>
        <Col md={5}>
          <Card className="signInCard">
            <Card.Content className="cardContent">
              <Card.Header className="loginHeader">Sign in</Card.Header>
              <Card.Description>
                <Form>
                  <Form.Field>
                    <label className="float__left loginLabel">EMAIL</label>
                    <Input
                      name="email"
                      className="email"
                      type="text"
                      onChange={(e) =>
                        dispatch({
                          type: 'SET_USERNAME',
                          value: e.target.value,
                        })
                      }
                      value={state.email}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label className="float__left loginLabel">PASSWORD</label>
                    <Input
                      name="password"
                      className="password"
                      type="password"
                      onChange={(e) =>
                        dispatch({
                          type: 'SET_PASSWORD',
                          value: e.target.value,
                        })
                      }
                      value={state.password}
                    />
                  </Form.Field>

                  <Button
                    onClick={handleSignIn}
                    className="button__primary signInSubmit width_100"
                  >
                    Login
                  </Button>

                  <Button
                    className="button__secondary createAccountBtn width_100"
                    onClick={createAccountHandler}
                  >
                    Create an account
                  </Button>
                  {state.inValidCredentials && (
                    <div className="invalidCredentials__signIn">
                      {state.userAuthMessage}
                    </div>
                  )}
                </Form>
              </Card.Description>
            </Card.Content>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
}

function SignUp() {
  const { state, dispatch } = useAppContext();
  const signUpHandler = () => {
    dispatch({
      type: 'SHOW_SIGN_IN',
      value: true,
    });
    dispatch({
      type: 'SHOW_SIGN_UP',
      value: false,
    });
    dispatch({ type: 'SHOW_INVALID_CREDENTIALS', value: false });
  };
  const handleCreateUser = () => {
    const { email, password } = state;
    const data = { email, password };
    const url = `http://localhost:8080/api/register`;
    axios
      .post(url, data)
      .then((response) => {
        if (!response.data.success) {
          dispatch({
            type: 'SHOW_INVALID_CREDENTIALS',
            value: true,
            userAuthMessage: response.data.message,
          });
        } else if (response.data.success) {
          dispatch({ type: 'SHOW_INVALID_CREDENTIALS', value: false });
          dispatch({ type: 'USER_SIGNIN', value: true });
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <Grid>
      <Row>
        <Col md={3}></Col>
        <Col md={5}>
          <Card className="signUpCard">
            <Card.Content className="cardContent">
              <Card.Header className="loginHeader">Sign up</Card.Header>
              <Card.Description>
                <Form>
                  <Form.Field>
                    <label className="float__left loginLabel">EMAIL</label>
                    <Input
                      type="text"
                      className="email"
                      name="email"
                      onChange={(e) =>
                        dispatch({
                          type: 'SET_USERNAME',
                          value: e.target.value,
                        })
                      }
                      value={state.email}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label className="float__left loginLabel">PASSWORD</label>
                    <Input
                      type="password"
                      className="password"
                      name="password"
                      onChange={(e) =>
                        dispatch({
                          type: 'SET_PASSWORD',
                          value: e.target.value,
                        })
                      }
                      value={state.password}
                    />
                  </Form.Field>
                  <Button
                    onClick={handleCreateUser}
                    className="button__primary createAnAccount width_100"
                  >
                    Create an account
                  </Button>
                  <Button
                    className="button__secondary signUpSubmit width_100"
                    onClick={signUpHandler}
                  >
                    Have an account already ? Login here
                  </Button>
                  {state.inValidCredentials && (
                    <div className="invalidCredentials__signUp">
                      {state.userAuthMessage}
                    </div>
                  )}
                </Form>
              </Card.Description>
            </Card.Content>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
}

export default function Login() {
  const { state } = useAppContext();
  return (
    <div>
      {state.showSignIn && <Signin />}
      {state.showSignUp && <SignUp />}
    </div>
  );
}

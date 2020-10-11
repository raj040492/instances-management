import React, { useContext } from 'react';
import { Row, Col } from 'react-flexbox-grid';
// import { AppContext } from './App';
import { useAppContext } from './AppContext';
import { Button } from 'semantic-ui-react';

export default function Header() {
  const { state, dispatch } = useAppContext();
  return (
    <div className="header__background">
      <Row className="headerPanel">
        <Col md={1} xs={0}></Col>
        <Col md={1} xs={4} className="dashboard">
          <Button className="button__primary">Dashboard</Button>
        </Col>
        <Col md={8} xs={4}></Col>
        <Col md={1} xs={4}>
          <Button
            onClick={() =>
              dispatch({
                type: 'USER_SIGNIN',
                value: false,
              })
            }
            className="button__primary logoutBtn"
          >
            logout
          </Button>
        </Col>
      </Row>
    </div>
  );
}

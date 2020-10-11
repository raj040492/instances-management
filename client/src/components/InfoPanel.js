import React, { useContext } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Radio } from 'semantic-ui-react';
import { useAppContext } from './AppContext';
import { usd_inr_conversion } from '../config/constants';

export default function InfoPanel() {
  const { state, dispatch } = useAppContext();
  return (
    <div className="infoPanel__background infoPanel">
      <Row>
        <Col md={1} xs={0}></Col>
        <Col md={2} xs={4} className="runningInstances__container">
          <h4 className="runningInstancesCost">
            {state.currencySelected === 'USD'
              ? state.currencyToggled
                ? `$ ${(
                    state.runningInstancesCost / usd_inr_conversion
                  ).toFixed(2)} / hr`
                : `$ ${state.runningInstancesCost.toFixed(2)} / hr`
              : state.currencyToggled
              ? `₹ ${(state.runningInstancesCost * usd_inr_conversion).toFixed(
                  2
                )} / hr`
              : `₹ ${state.runningInstancesCost.toFixed(2)} / hr`}
          </h4>
          <p className="runningInstances">Running instances</p>
        </Col>
        <Col md={2} xs={5} className="stoppedInstances__container">
          <h4 className="stoppedInstancesCost">
            {state.currencySelected === 'USD'
              ? state.currencyToggled
                ? `$ ${(
                    state.stoppedInstancesCost / usd_inr_conversion
                  ).toFixed(2)} / hr`
                : `$ ${state.stoppedInstancesCost.toFixed(2)} / hr`
              : state.currencyToggled
              ? `₹ ${(state.stoppedInstancesCost * usd_inr_conversion).toFixed(
                  2
                )} / hr`
              : `₹ ${state.stoppedInstancesCost.toFixed(2)} / hr`}
          </h4>
          <p className="stoppedInstances">Stopped instances</p>
        </Col>
        <Col xs={3} mdOffset={10} md={2} className="currencyToggle__container">
          <div>
            <span className="inrLabel">INR</span>
            <Radio
              className="currencyToggler"
              onChange={() => {
                dispatch({
                  type: 'CURRENCY_TOGGLED',
                  value: state.currencySelected === 'USD',
                });
                dispatch({ type: 'TOGGLE_CURRENCY' });
              }}
              toggle
              checked={state.currencySelected === 'USD'}
            />
            <span className="usdLabel">USD</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}

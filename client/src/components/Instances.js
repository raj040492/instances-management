import React, { useContext, useEffect } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import axios from 'axios';
import { Table, Button } from 'semantic-ui-react';
// import { AppContext } from './App';
import { useAppContext } from './AppContext';
import { usd_inr_conversion } from '../config/constants';

export default function Instances() {
  const { state, dispatch } = useAppContext();
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
  headers.append('Origin', 'http://localhost:3000');

  const toggleInstanceStatusHandler = (index, status) => {
    dispatch({
      type: 'TOGGLE_INSTANCE_STATUS',
      index,
      newStatus: status === 'stopped' ? 'running' : 'stopped',
    });
  };

  const calculateInstancesCost = (instances) => {
    const runningInstancesCost = instances
      .filter((instance) => instance.status === 'running')
      .reduce(
        (accumulator, instance) => (accumulator += instance.costPerHour),
        0
      );
    const stoppedInstancesCost = instances
      .filter((instance) => instance.status === 'stopped')
      .reduce(
        (accumulator, instance) => (accumulator += instance.costPerHour),
        0
      );
    dispatch({
      type: 'SET_RUNNING_INSTANCES_COST',
      value: runningInstancesCost,
    });
    dispatch({
      type: 'SET_STOPPED_INSTANCES_COST',
      value: stoppedInstancesCost,
    });
  };

  useEffect(() => {
    calculateInstancesCost(state.allInstances);
  }, [state.allInstances]);

  useEffect(() => {
    const url = `http://localhost:8080/api/instances`;
    axios
      .get(url, {
        headers,
      })
      .then((response) => {
        const instances =
          response &&
          response.data &&
          response.data.instances &&
          Array.isArray(response.data.instances);
        if (instances) {
          calculateInstancesCost(response.data.instances);
          dispatch({
            type: 'SET_INSTANCES',
            value: response.data.instances,
          });
        }
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className="instances__background instancesPanel">
      <h3 className="instancesHeader">Instances</h3>
      <table className="instancesTable" unstackable style={{ marginTop: 10 }}>
        <thead>
          <tr className="headerRow">
            <th>ID</th>
            <th>Instance name</th>
            <th className="textAlign__right">Cost per Hour</th>
            <th textAlign="center">Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state &&
            state.allInstances &&
            state.allInstances.length > 0 &&
            state.allInstances.map(
              ({ id, name, status, costPerHour }, index) => (
                <tr
                  key={id}
                  className={`instance__row ${
                    index % 2 === 0 ? 'evenRowBackground' : 'oddRowBackground'
                  }`}
                >
                  <td>{id}</td>
                  <td>{name}</td>
                  <td className="textAlign__right">
                    {state.currencySelected === 'USD'
                      ? state.currencyToggled
                        ? `$ ${(costPerHour / usd_inr_conversion).toFixed(2)}`
                        : `$ ${costPerHour.toFixed(2)}`
                      : state.currencyToggled
                      ? `₹ ${(costPerHour * usd_inr_conversion).toFixed(2)}`
                      : `₹ ${costPerHour.toFixed(2)}`}
                  </td>
                  {status === 'stopped' ? (
                    <>
                      <td>
                        <Button
                          className="stopInstance instanceStartStop instanceStatus"
                          content={status}
                        />
                      </td>
                      <td>
                        <Button
                          content="start"
                          onClick={() => {
                            toggleInstanceStatusHandler(index, status);
                          }}
                          className="textDecor__underline instanceStartStop startInstance instanceAction"
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td textAlign="center">
                        <Button className="startInstance instanceStartStop">
                          {status}
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={() => {
                            toggleInstanceStatusHandler(index, status);
                          }}
                          className="textDecor__underline instanceStartStop stopInstance"
                        >
                          stop
                        </Button>
                      </td>
                    </>
                  )}
                </tr>
              )
            )}
        </tbody>
      </table>
      {/* </Col>
      </Row> */}
    </div>
  );
}

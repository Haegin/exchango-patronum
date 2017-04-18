import React from 'react';
import './App.css';
import {Container, Row} from './layout';
import Inputs from './Inputs';
import Graph from './Graph';
import {withState, compose} from 'recompose';
import {parse} from 'date-fns';

const App = (props) => {
  return (
    <Container>
      <Row>
        <Inputs
          setFromCurrency={props.setFromCurrency}
          setToCurrency={props.setToCurrency}
          setFromDate={props.setFromDate}
          setToDate={props.setToDate}
          fromCurrency={props.fromCurrency}
          toCurrency={props.toCurrency}
          fromDate={props.fromDate}
          toDate={props.toDate}
        />
        <Graph
          fromCurrency={props.fromCurrency}
          toCurrency={props.toCurrency}
          fromDate={props.fromDate}
          toDate={props.toDate}
        />
      </Row>
    </Container>
  );
}

const enhance = compose(
  withState('fromCurrency', 'setFromCurrency', 'GBP'),
  withState('toCurrency', 'setToCurrency', 'CAD'),
  withState('fromDate', 'setFromDate', parse('2017/01/01')),
  withState('toDate', 'setToDate', new Date())
)

export default enhance(App);

import React from 'react';
import './App.css';
import {Container, Row} from './layout';
import Inputs from './Inputs';
import Graph from './Graph';
import {withState, compose} from 'recompose';
import {parse} from 'date-fns';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(reduxThunk, logger)
))

const App = (props) => {
  return (
    <Provider store={store}>
      <Container>
        <Row>
          <Inputs />
          <Graph
            fromCurrency={props.fromCurrency}
            toCurrency={props.toCurrency}
            fromDate={props.fromDate}
            toDate={props.toDate}
          />
        </Row>
      </Container>
    </Provider>
  );
}

const enhance = compose(
  withState('fromCurrency', 'setFromCurrency', 'GBP'),
  withState('toCurrency', 'setToCurrency', 'CAD'),
  withState('fromDate', 'setFromDate', parse('2017/01/01')),
  withState('toDate', 'setToDate', new Date())
)

export default enhance(App);
